<template>
  <GuestLayout v-if="!isLoaded">
    <Loader />
  </GuestLayout>
  <UseQuiz v-else
  :questions="questions"
  />
</template>

<script setup lang="ts">
import UseQuiz from "@/components/quiz/UseQuiz.vue";
import {onMounted, ref} from "vue";
import type {Ref} from 'vue'
import GuestLayout from "@/App.vue";
import Loader from "@/App.vue";
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {useRoute, useRouter} from "vue-router";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import type {Question} from "@/types/question";

const route = useRoute()
const router = useRouter()
const toast = useToast()
const i18n = useI18n()

const isLoaded = ref(false)
const questions = ref([]) as Ref<Array<Question>>;

const load = async () => {
  let res: AxiosResponse
  try {
    res = await axios.get(routePath('play', [route.params.id as string]))
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    router.back()
    return
  }
  if(res.status == 200 && res.data) {
    questions.value = res.data
    isLoaded.value = true
    return
  }
  toast.error(i18n.t('error.unknown'))
  router.back()
  return
}

onMounted(load)
/*const questions = ([
  {
    id: 1,
    question: 'What is the most popular javascript framework?',
    image: 'https://novateus.com/blog/wp-content/uploads/2022/05/0_8y_ecBDxaRlpP1tS.jpg',
    answers: [
        'React', 'Vue.js', 'Angular', 'Svelte'
    ]
  } as Question,
  {
    id: 2,
    question: 'What is the fastest backend framework?',
    answers: [
        'GoFiber', 'SpringBoot', 'Laravel', 'Django'
    ]
  } as Question,
  {
    id: 3,
    question: 'Select the NoSQL database',
    image: 'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1282569/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png',
    answers: [
      'MySQL', 'Firebase', 'PostgreSQL', 'MsSQL'
    ]
  } as Question
])*/
</script>