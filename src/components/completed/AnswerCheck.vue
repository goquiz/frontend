<template>
  <h3>{{ question }}</h3>
  <div class="grid grid-cols-2 gap-2 my-2">
    <template v-for="answer in answers" :key="answer">
      <AnswerButton :class="{'!border-green-300': answer == user_answer && answer == correct_answer, '!border-blue-300': answer == correct_answer && answer != user_answer, '!border-red-400': answer == user_answer && answer != correct_answer}">{{answer}}</AnswerButton>
    </template>
  </div>
</template>
<script setup lang="ts">
import AnswerButton from "@/components/quiz/AnswerButton.vue";

defineProps<{
  question: string;
  answers: object;
  user_answer: string;
  correct_answer: string;
}>()
</script>