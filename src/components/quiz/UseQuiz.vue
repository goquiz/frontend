<template>
  <QuestionsCounter :data="answers" :completed="completedCount" />
  <GuestLayout>
    <Widget>
      <img alt="Question Image" class="rounded-xl mb-2"
           v-if="currentQuestion.image" :src="currentQuestion.image"
      />
      <h2 class="text-lg md:text-2xl fontFredoka">
        {{ currentQuestion.question }}
      </h2>
    </Widget>
    <section class="grid grid-cols-2 gap-2">
      <template v-for="answer in currentQuestion.answers" :key="answer">
        <AnswerButton @click="addAnswer(answer, currentQuestion.id)" :class="{'!border-blue-300': currentAnswer == answer}">
          {{answer}}
        </AnswerButton>
      </template>
    </section>
    <section class="flex items-center space-x-2 mt-10">
      <ButtonBluish @click="state--" v-if="state !== 0 && completedCount !== answers.length">{{$t('Back')}}</ButtonBluish>
      <ButtonPinkle class="inline-block" @click="$toast.warning($t('Please select an answer before continue'))" v-if="!canStartNext && !onlyBack">{{$t('Next')}}</ButtonPinkle>
      <ButtonPinkle v-else-if="state+1 !== questions?.length" @click="state++" :disabled="!canStartNext">{{$t('Next')}}</ButtonPinkle>
      <ButtonGreenish @click="showSubmitModal = true" v-else-if="completedCount == answers.length">{{$t('Submit')}}</ButtonGreenish>
    </section>
  </GuestLayout>
  <AreYouSureModal
      v-if="showSubmitModal"
      @close="showSubmitModal = false"
      :answers="answers as string[]"
      :answerReference="answerQuestionReference"
  />
</template>

<script setup lang="ts">
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import QuestionsCounter from "@/components/quiz/QuestionsCounter.vue";
import Widget from "@/components/Widget.vue";
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import AnswerButton from "@/components/quiz/AnswerButton.vue";
import type {Question} from "@/types/question";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import AreYouSureModal from "@/components/quiz/AreYouSureModal.vue";
import {computed, onBeforeMount, ref} from "vue";
import type {Ref} from "vue";
import {shuffleArray} from "@/scripts/helpers/shuffle";

const props = defineProps<{
  questions: Array<Question>
}>()

// refs
const shuffledQuestions = ref([]) as Ref<Array<Question>>
const answers = ref([]) as Ref<Array<string|null>>
const state = ref(0)
const showSubmitModal = ref(false)
const answerQuestionReference = ref([]) as Ref<Array<number>>

// getters
const currentQuestion = computed(() => shuffledQuestions.value[state.value])
const currentAnswer = computed(() => answers.value[state.value] !== null ? answers.value[state.value] : false)
const canStartNext = computed(() => answers.value[state.value] != null)
const completedCount = computed(() => answers.value.filter((v) => v != null).length)
const onlyBack = computed(() => state.value+1 == shuffledQuestions.value.length)

// setters
const addAnswer = (answer: string, qRef: number) => {
  if(answers.value[state.value] == answer) {
    answerQuestionReference.value[state.value] = -1 // set an invalid id
    answers.value[state.value] = null
  } else {
    answerQuestionReference.value[state.value] = qRef
    answers.value[state.value] = answer
  }
}

// actions
onBeforeMount(() => {
  shuffledQuestions.value = shuffleArray(props.questions)
  for(let i = 0; i < props.questions.length; i++) {
    answers.value[i] = null
  }
})
</script>
