<template>
 <AuthFullLayout>
   <Loader v-if="isLoading" />
   <template v-else-if="quizData">
     <Widget>
       <div class="flex items-center space-x-2 justify-between">
         <h2 class="text-xl fontFredoka">{{quizData.name}}</h2>
         <span v-tippy="{content: $t('The identifier of this quiz')}" class="fontMitr text-gray-400 cursor-pointer no-select">ID: {{quizData.id}}</span>
       </div>
     </Widget>
     <h3 class="text-xl fontFredoka">{{$t('Questions')}}</h3>
     <EditQuestion v-for="question in quizData.questions" :key="question.id" :question="question" />
   </template>
   <Widget v-else>
     <h2 class="text-xl fontMitr">{{$t('error.unknown')}}</h2>
   </Widget>
 </AuthFullLayout>
</template>

<script setup lang="ts">
import AuthFullLayout from "@/components/layouts/AuthFullLayout.vue";
import Loader from "@/components/Loader.vue";
import {onMounted, ref} from "vue";
import type {Ref} from 'vue'
import {useRoute} from "vue-router";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import type {FullQuiz} from "@/types/quiz";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {AxiosError} from "axios";
import type {AxiosResponse} from "axios";
import {useToast} from "vue-toastification";
import router from "@/router";
import Widget from "@/components/Widget.vue";
import EditQuestion from "@/components/quiz/EditQuestion.vue";
import {useI18n} from "vue-i18n";

const route = useRoute()

const isLoading = ref(true)
const quizData: Ref<FullQuiz|null> = ref(null)

const loadQuestion = async () => {
  const id: string = route.params.id as string
  const path = routePath('quiz.id', [id])
  let res: AxiosResponse
  try {
    res = await axios.get(path)
  } catch(e) {
    if(e instanceof AxiosError) {
      simpleMessageHelper(e)
    } else {
      useToast().error(useI18n().t('error.unknown'))
    }
    await router.push('/')
    return;
  }
  quizData.value = res.data as FullQuiz;
  isLoading.value = false
}

onMounted(loadQuestion)
</script>