<template>
 <AuthFullLayout>
   <Loader v-if="isLoading" />
   <template v-else-if="quizData">
     <DisplayQuizInfo :id="quizData.id" :name="quizData.name">
       <ButtonBluish v-if="questionsLength < 15" @click="showQuestionModal(undefined)">{{$t('Add new question')}}</ButtonBluish>
     </DisplayQuizInfo>
     <h3 class="text-xl fontFredoka">{{$t('Questions')}} (15/{{ questionsLength }})</h3>
     <Widget v-for="question in quizData.questions" :key="question.id">
       <img v-if="question.image" class="rounded-lg" alt="Question's image" :src="question.image" />
       <h4 class="text-lg">{{ question.question }}</h4>
       <div class="grid grid-cols-2 gap-2 my-2">
          <template v-for="answer in question.answers" :key="answer">
            <AnswerButton :class="{'!border-blue-300': question.answer == answer}">{{answer}}</AnswerButton>
          </template>
       </div>
       <div class="grid grid-cols-5 gap-2 mt-1">
         <ButtonPinkle @click="showQuestionModal(question)" class="col-span-4">{{$t('Edit')}}</ButtonPinkle>
         <ButtonDanger :disabled="deleteProcessing.includes(question.id)" @click="destroy(question.id)">
           <Trash class="mx-auto" v-if="!deleteProcessing.includes(question.id)" />
           <Spinner v-else />
         </ButtonDanger>
       </div>
     </Widget>
     <Widget v-if="!quizData?.questions || quizData.questions.length == 0">
        <h3>
         {{$t('Add your first question')}}.
        </h3>
     </Widget>
   </template>
   <Widget v-else>
     <h2 class="text-xl fontMitr">{{$t('error.unknown')}}</h2>
   </Widget>
 </AuthFullLayout>
  <!-- Modals -->
  <QuestionModal
      :show="showNewModal"
      :question="currentQuestion"
      :quiz-id="quizData?.id || 0"
      @close="showNewModal = false"
      @modify="modifyQuestion"
      @push="pushNewQuestion"
      v-if="showNewModal"
  />
</template>

<script setup lang="ts">
import AuthFullLayout from "@/components/layouts/AuthFullLayout.vue";
import Loader from "@/components/Loader.vue";
import {computed, onMounted, ref} from "vue";
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
import {useI18n} from "vue-i18n";
import AnswerButton from "@/components/quiz/AnswerButton.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import ButtonDanger from "@/components/buttons/ButtonDanger.vue";
import Trash from "@/components/icons/Trash.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import type {Question} from "@/types/question";
import QuestionModal from "@/components/questions/QuestionModal.vue";
import Spinner from "@/components/icons/Spinner.vue";
import DisplayQuizInfo from "@/components/dash/DisplayQuizInfo.vue";

const route = useRoute()
const toast = useToast()
const i18n = useI18n()

const showNewModal = ref(false)
const currentQuestion: Ref<Question|undefined> = ref(undefined)
const deleteProcessing: Ref<Array<number>> = ref([])

const isLoading = ref(true)
const quizData: Ref<FullQuiz|undefined> = ref(undefined)

const questionsLength = computed(() => quizData.value?.questions ? quizData.value.questions.length : 0)

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
      useToast().error(i18n.t('error.unknown'))
    }
    await router.push('/')
    return;
  }
  quizData.value = res.data as FullQuiz;
  if(!quizData.value?.questions) quizData.value = {...quizData.value, questions: []}
  isLoading.value = false
}

const showQuestionModal = (question: Question|undefined) => {
  currentQuestion.value = question
  showNewModal.value = true
}

const modifyQuestion = (id: number, data: Question) => {
  if(quizData.value && quizData.value?.questions) {
    for(let i = 0; i < quizData.value.questions.length; i++) {
      if(quizData.value.questions[i].id == id) {
        quizData.value.questions[i] = data
      }
    }
  }
  showNewModal.value = false
}

const pushNewQuestion = (data: Question) => {
  if(quizData.value && quizData.value?.questions) quizData.value.questions.push(data)
  showNewModal.value = false
}

const destroy = async (id: number) => {
  let res: AxiosResponse
  deleteProcessing.value.push(id)
  try {
    res = await axios.delete(routePath('quiz.question', [quizData.value?.id || 0 ,id]))
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    deleteProcessing.value.splice(deleteProcessing.value.indexOf(id), 1)
    return
  }
  if(res.status == 200 && res.data?.message) {
    toast.success(i18n.t(res.data.message))
    if(quizData.value?.questions) {
      quizData.value.questions = quizData.value.questions.filter(q => {
        return q.id !== id
      })
    }
  }
  deleteProcessing.value.splice(deleteProcessing.value.indexOf(id), 1)
}

onMounted(loadQuestion)
</script>