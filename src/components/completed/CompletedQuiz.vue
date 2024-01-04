<template>
  <Widget>
    <h2 class="text-xl fontFredoka">{{ completed.quiz.name }}</h2>
    <div class="bg-login-input px-3 py-2 rounded-xl flex space-x-2 my-2">
      <UserProfileImage :profile-image="completed.quiz.user.profile_image_url" :username="completed.quiz.user.username" />
      <p class="text-sm my-auto">
        <span class="fontFredoka text-gray-300">{{$t('by')}}</span><br/>
        {{completed.quiz.user.username.capitalize()}}
      </p>
    </div>
    <div>
      <h3 class="text-xl fontFredoka">{{$t('Stats')}}</h3>
      <p>
        {{$t('Correct answers')}}: {{ completed.answers.length }}/{{ correctAnswersCount }}
      </p>
     <template v-if="showFull">
       <Separator/>
       <div class="mb-1 bg-login-input rounded-lg px-3 py-2 text-sm">
         <p class="flex items-center space-x-2">
           <span class="block w-4 h-4 bg-green-300 rounded-full"></span> <span>{{$t('Correct answer')}}</span>
         </p>
         <p class="flex items-center space-x-2">
           <span class="block w-4 h-4 bg-red-400 rounded-full"></span> <span>{{$t('Wrong answer that is selected')}}</span>
         </p>
         <p class="flex items-center space-x-2">
           <span class="block w-4 h-4 bg-blue-300 rounded-full"></span> <span>{{$t('Correct answer if a wrong selected')}}</span>
         </p>
       </div>
       <div class="my-3" v-for="wrap in completed.answers" :key="wrap.question">
         <h3>{{ wrap.question }}</h3>
         <div class="grid grid-cols-2 gap-2 my-2">
           <template v-for="answer in wrap.answers" :key="answer">
             <AnswerButton :class="{'!border-green-300': answer == wrap.user_answer && answer == wrap.answer, '!border-blue-300': answer == wrap.answer && answer != wrap.user_answer, '!border-red-400': answer == wrap.user_answer && answer != wrap.answer}">{{answer}}</AnswerButton>
           </template>
         </div>
       </div>
       <ButtonBluish @click="showFull = false" class="mt-2">{{$t('Close')}}</ButtonBluish>
     </template>
      <ButtonPinkle @click="showFull = true" class="mt-2" v-else>{{$t('Show questions and answers')}}</ButtonPinkle>
    </div>
  </Widget>
</template>
<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import type {CompletedQuiz} from "@/types/completedQuiz";
import UserProfileImage from "@/components/UserProfileImage.vue";
import {computed, ref} from "vue";
import AnswerButton from "@/components/quiz/AnswerButton.vue";
import Separator from "@/components/Separator.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";

const props = defineProps<{
  completed: CompletedQuiz
}>()

const showFull = ref(false)

const correctAnswersCount = computed((): number => {
  return props.completed.answers.filter((a) => {
    return a.answer == a.user_answer
  }).length
})
</script>