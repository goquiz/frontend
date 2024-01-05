<template>
  <AuthFullLayout>
    <Loader v-if="!isLoaded && finishedQuizzes.length == 0" />
    <template v-else-if="finishedQuizzes.length > 0">
      <CompletedQuiz v-for="finished in finishedQuizzes" :key="finished.quiz.id" :completed="finished" />
    </template>
    <Widget v-if="finishedQuizzes.length > 0 && endReached">
      <p>{{$t('No more results.')}}</p>
    </Widget>
    <Widget v-if="isLoaded && endReached && finishedQuizzes.length == 0">
      <p>{{$t('No submissions yet.')}}</p>
    </Widget>
    <ButtonBluish :isLoading="!isLoaded && finishedQuizzes.length > 0" @click="loadMore" v-if="finishedQuizzes.length > 0 && !endReached" class="my-2">{{$t('Load more')}}</ButtonBluish>
  </AuthFullLayout>
</template>

<script setup lang="ts">
import AuthFullLayout from "@/components/layouts/AuthFullLayout.vue";
import Loader from "@/components/Loader.vue";
import {onMounted, ref} from "vue";
import type {Ref} from 'vue'
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import CompletedQuiz from "@/components/completed/CompletedQuiz.vue";
import type {CompletedQuiz as CompletedQuizType} from "@/types/completedQuiz";
import Widget from "@/components/Widget.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";

const router = useRouter()
const toast = useToast()
const i18n = useI18n()

const isLoaded = ref(false)
const finishedQuizzes = ref([]) as Ref<Array<CompletedQuizType>>
const endReached = ref(false)

let page = 0

const loadMore = async () => {
  isLoaded.value = false
  page++
  let res: AxiosResponse
  try {
    res = await axios.get(routePath('completed') + `?page=${page}`)
    isLoaded.value = true
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    await router.push('/dashboard')
    return
  }
  if(res.status == 200 && res.data) {
    finishedQuizzes.value.push(...res.data)
    if(res.data.length < 5) endReached.value = true
  } else endReached.value = true
}

onMounted(loadMore)
</script>