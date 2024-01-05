<template>
  <AuthFullLayout>
    <Loader v-if="!isLoaded" />
    <CompletedQuiz v-else-if="completed != null" :completed="completed" />
    <ButtonPinkle class="my-3" to="/dashboard/completed">{{$t('Show all')}}</ButtonPinkle>
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
import {useRoute, useRouter} from "vue-router";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import CompletedQuiz from "@/components/completed/CompletedQuiz.vue";
import type {CompletedQuiz as CompletedQuizType} from "@/types/completedQuiz";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";

const router = useRouter()
const route = useRoute()
const toast = useToast()
const i18n = useI18n()

const isLoaded = ref(false)
const completed = ref(null) as Ref<CompletedQuizType|null>

const loadMore = async () => {
  let res: AxiosResponse
  try {
    res = await axios.get(routePath('completed.specific', [route.params.id as string]))
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    await router.push('/dashboard')
    return
  }
  if(res.status == 200 && res.data) {
    completed.value = res.data
    isLoaded.value = true
  }
}

onMounted(loadMore)
</script>