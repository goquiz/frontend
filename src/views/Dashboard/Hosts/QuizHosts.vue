<template>
  <AuthFullLayout>
    <Loader class="mt-5" v-if="isLoading" />
    <div v-else>
      <DisplayQuizInfo :id="quiz.id" :name="quiz.name">
        <ButtonBluish @click="newModal = true" v-if="hosts.length < 5">
          {{$t('Create a new host')}}
        </ButtonBluish>
      </DisplayQuizInfo>
      <h3 class="text-xl fontFredoka">{{$t('Hosts')}} (5/{{ hosts.length }})</h3>
      <Widget v-for="host in hosts" :key="host.public_key">
        <div class="flex items-center space-x-2 justify-between">
          <h2 class="text-xl fontFredoka">{{host.name}}</h2>
          <span v-tippy="{content: $t('The identifier of this quiz')}" class="fontMitr text-gray-400 cursor-pointer no-select">ID: {{host.id}}</span>
        </div>
        <div class="mt-3">
          <div class="mb-2">
            <ButtonBluish v-if="host.public_key != ''" @click="joinQuiz = host; showCodeModal = true">
              {{$t('Show code')}}
            </ButtonBluish>
            <Tippy v-else :content="$t('Activate before showing code')">
              <ButtonBluish :disabled="true">
                {{$t('Show code')}}
              </ButtonBluish>
            </Tippy>
          </div>
          <ButtonDanger :isLoading="isActivityProcessing" @click="changeActivity(host)" v-if="host.is_active">
            {{$t('Change to inactive')}}
          </ButtonDanger>
          <ButtonGreenish :isLoading="isActivityProcessing" @click="changeActivity(host)" v-else>
            {{$t('Change to active')}}
          </ButtonGreenish>
          <ButtonBluish :to="`/dashboard/quizzes/${route.params.id as string}/hosts/${host.id}/results`" class="mt-2">
            {{$t('View completions')}}
          </ButtonBluish>
        </div>
        <div class="mt-3">
          <p class="mt-2 mb-1 text-red-400 text-left">{{$t('Danger Zone')}}</p>
          <DeleteButton @destroy="destroy(host)" :processing="deletings.includes(host.id)" />
        </div>
      </Widget>
    </div>
  </AuthFullLayout>
  <Modal :show="showCodeModal" @close="showCodeModal = false">
    <h2 class="text-2xl fontMitr mb-2">{{$t('Join with this code')}}</h2>
    <div class="mt-2">
      <div class="p-3 fontRubik text-4xl bg-main-to rounded-xl">
          <span class="textGradient">
            {{ formatNumber(joinQuiz.public_key) }}
          </span>
      </div>
    </div>
  </Modal>
  <NewHostModal @submit="newHost" :show="newModal" @close="newModal = false" />
</template>

<script setup lang="ts">
import AuthFullLayout from "@/components/layouts/AuthFullLayout.vue";
import {onMounted, ref} from "vue";
import type {Ref} from "vue"
import Loader from "@/components/Loader.vue";
import type {HostedQuiz, HostedQuizzes} from "@/types/hostedQuiz";
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {useRoute, useRouter} from "vue-router";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import Widget from "@/components/Widget.vue";
import Modal from "@/components/modal/Modal.vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import ButtonDanger from "@/components/buttons/ButtonDanger.vue";
import DisplayQuizInfo from "@/components/dash/DisplayQuizInfo.vue";
import type {Quiz} from "@/types/quiz";
import DeleteButton from "@/components/DeleteButton.vue";
import NewHostModal from "@/components/host/NewHostModal.vue";

const route = useRoute()
const router = useRouter()
const toast = useToast()
const i18n = useI18n()

const isLoading = ref(true)
const isActivityProcessing = ref(false)

const hosts: Ref<HostedQuizzes> = ref([])
const quiz: Ref<Quiz> = ref({}) as Ref<Quiz>
const showCodeModal = ref(false)
const joinQuiz: Ref<HostedQuiz> = ref({}) as Ref<HostedQuiz>
const deletings: Ref<Array<number>> = ref([])
const newModal = ref(false)

const loadHosts = async () => {
  let res: AxiosResponse
  try {
    res = await axios.get(routePath('quiz.hosts', [route.params.id as string]))
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
      await router.push('/dashboard')
    } else toast.error(i18n.t('error.unknown'))
    return
  }
  if(res.status == 200 && res.data?.quiz && res.data?.hosts) {
    hosts.value = res.data.hosts
    quiz.value = res.data.quiz
  } else toast.error(i18n.t('error.unknown'))
  isLoading.value = false
}

const formatNumber = (num: string|number): string => {
  if(typeof(num) == "string") num = Number(num)
  return new Intl.NumberFormat('hu-HU').format(
      num,
  )
}

const changeActivity = async (host: HostedQuiz) => {
  let res: AxiosResponse
  isActivityProcessing.value = true
  try {
    res = await axios.put(routePath('quiz.host.activity', [route.params.id as string, host.id]), {
      is_active: !host.is_active
    })
    isActivityProcessing.value = false
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    isActivityProcessing.value = false
    return
  }
  if(res.status == 200) {
    toast.success(res.data.message)
    hosts.value.forEach((h) => {
      if(h.id == host.id) {
        h.is_active = res.data.is_active
        h.public_key = res.data.public_key
      }
    })
  } else toast.error(i18n.t('error.unknown'))
}

const destroy = async (host: HostedQuiz) => {
  deletings.value.push(host.id)
  try {
    await axios.delete(routePath('quiz.host', [route.params.id as string, host.id]))
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    deletings.value.splice(deletings.value.indexOf(host.id), 1)
    return
  }
  deletings.value.splice(deletings.value.indexOf(host.id), 1)
  hosts.value = hosts.value.filter(h => {
    return h.id !== host.id
  })
  toast.success('Successfully deleted')
}

const newHost = (host: HostedQuiz) => {
  hosts.value = [host, ...hosts.value]
}

onMounted(loadHosts)
</script>

<style scoped>
.textGradient {
  --bg-size: 400%;
  --color-one: white;
  --color-two: #bd67d7;
  background: linear-gradient(90deg,var(--color-one),var(--color-two),var(--color-one)) 0 0 /var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: textGradientAnimation 18s linear infinite;
}
</style>