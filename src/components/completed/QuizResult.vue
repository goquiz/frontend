<template>
  <Widget>
    <HostProfile :user="result.user" title="Completed by" />
    <h3 class="text-xl fontFredoka">{{$t('Stats')}}</h3>
    <p>
      {{$t('Correct answers')}}: {{ result.answers.length }}/{{ correctAnswersCount }}
    </p>
    <template v-if="showFull">
      <Separator/>
      <ColorHelper/>
      <div class="my-3" v-for="wrap in result.answers" :key="wrap.question.question">
        <AnswerCheck
            :user_answer="wrap.answer"
            :question="wrap.question.question"
            :answers="wrap.question.answers"
            :correct_answer="wrap.question.answer || ''"
        />
      </div>
      <ButtonBluish @click="showFull = false" class="mt-2">{{$t('Close')}}</ButtonBluish>
    </template>
    <ButtonPinkle @click="showFull = true" class="mt-2" v-else>{{$t('Show questions and answers')}}</ButtonPinkle>
  </Widget>
</template>
<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import ColorHelper from "@/components/completed/ColorHelper.vue";
import HostProfile from "@/components/completed/HostProfile.vue";
import type {UserAnswer} from "@/types/quizResults";
import {computed, ref} from "vue";
import Separator from "@/components/Separator.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import AnswerCheck from "@/components/completed/AnswerCheck.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";

const props = defineProps<{
  result: UserAnswer;
}>()

const showFull = ref(false)

const correctAnswersCount = computed((): number => {
  return props.result.answers.filter((a) => {
    return a.question.answer == a.answer
  }).length
})
</script>