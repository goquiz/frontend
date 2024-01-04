<template>
  <AuthFullLayout>
    <Loader v-if="!isLoaded" />
    <template v-else-if="finishedQuizzes.length > 0">
      <CompletedQuiz v-for="finished in finishedQuizzes" :key="finished.quiz.id" :completed="finished" />
    </template>
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

const router = useRouter()
const toast = useToast()
const i18n = useI18n()

const isLoaded = ref(false)
const finishedQuizzes = ref([]) as Ref<Array<CompletedQuizType>>

const loadMore = async () => {
  let res: AxiosResponse
  try {
    res = await axios.get(routePath('completed'))
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    await router.push('/dashboard')
    return
  }
  if(res.status == 200 && res.data) {
    finishedQuizzes.value.push(...res.data)
    isLoaded.value = true
  }
}

onMounted(loadMore)
</script>