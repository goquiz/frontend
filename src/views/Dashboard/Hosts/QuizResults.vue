<template>
  <AuthFullLayout>
    <Loader v-if="!isLoaded" />
    <template v-else-if="results">
      <DisplayQuizInfo :id="results.id" :name="results.name">
        <ButtonPinkle :to="`/dashboard/quizzes/${route.params.id}/hosts`" class="mt-3">{{$t('Back')}}</ButtonPinkle>
      </DisplayQuizInfo>
      <Separator/>
      <template v-if="results.user_answer">
        <template v-for="result in results.user_answer" :key="result.id">
          <QuizResult :result="result" />
        </template>
      </template>
      <Widget v-if="isLoaded && endReached && !results?.user_answer">
        <p>{{$t('No submissions yet.')}}</p>
      </Widget>

      <Widget v-if="results?.user_answer && endReached">
        <p>{{$t('No more results.')}}</p>
      </Widget>
    </template>
    <ButtonBluish :isLoading="!isLoaded && results?.user_answer" @click="loadMore" v-if="results?.user_answer && !endReached" class="my-2">{{$t('Load more')}}</ButtonBluish>
  </AuthFullLayout>
</template>

<script setup lang="ts">
import AuthFullLayout from "@/components/layouts/AuthFullLayout.vue";
import Loader from "@/components/Loader.vue";
import {useRoute, useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";
import type {Ref} from 'vue'
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import DisplayQuizInfo from "@/components/dash/DisplayQuizInfo.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import type {QuizResult as QuizResultType} from "@/types/quizResults";
import Separator from "@/components/Separator.vue";
import QuizResult from "@/components/completed/QuizResult.vue";
import Widget from "@/components/Widget.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";

const router = useRouter()
const route = useRoute()
const toast = useToast()
const i18n = useI18n()

const isLoaded = ref(false)
const results = ref(null) as Ref<QuizResultType|null>
const endReached = ref(false)

let page = 0

const loadMore = async () => {
  page++
  let res: AxiosResponse
  try {
    res = await axios.get(routePath('host.completions', [route.params.hostId as string]) + `?page=${page}`)
    console.log(res)
    isLoaded.value = true
  } catch(e: unknown) {
    console.log(e)
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    await router.push('/dashboard/quizzes/' + route.params.id as string + '/hosts')
    return
  }
  if(res.status == 200 && res.data) {
    if(!results.value) results.value = res.data
    else if(results.value?.user_answer) {
      if(res.data?.user_answer) results.value = {
        ...results.value,
        user_answer: [...results.value.user_answer, ...res.data.user_answer]
      }
    }
    if(!('user_answer' in res.data) || res.data.user_answer && res.data?.user_answer.length < 5) endReached.value = true
  } else endReached.value = true
}

onMounted(loadMore)
</script>