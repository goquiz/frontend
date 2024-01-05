<template>
  <Widget>
    <h2 class="text-xl fontFredoka">{{ completed.quiz.name }}</h2>
    <HostProfile title="Quiz by"  :user="completed.quiz.user" />
    <div>
      <h3 class="text-xl fontFredoka">{{$t('Stats')}}</h3>
      <p>
        {{$t('Correct answers')}}: {{ completed.answers.length }}/{{ correctAnswersCount }}
      </p>
     <template v-if="showFull">
       <Separator/>
       <ColorHelper/>
       <div class="my-3" v-for="wrap in completed.answers" :key="wrap.question">
         <AnswerCheck
             :user_answer="wrap.user_answer"
             :question="wrap.question"
             :answers="wrap.answers"
             :correct_answer="wrap.answer"
         />
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
import {computed, ref} from "vue";
import Separator from "@/components/Separator.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import ColorHelper from "@/components/completed/ColorHelper.vue";
import HostProfile from "@/components/completed/HostProfile.vue";
import AnswerCheck from "@/components/completed/AnswerCheck.vue";

const props = defineProps<{
  completed: CompletedQuiz;
}>()

const showFull = ref(false)

const correctAnswersCount = computed((): number => {
  return props.completed.answers.filter((a) => {
    return a.answer == a.user_answer
  }).length
})
</script>