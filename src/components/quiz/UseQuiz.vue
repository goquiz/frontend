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
        <AnswerButton @click="addAnswer(answer)" :class="{'!border-blue-300': currentAnswer == answer}">
          {{answer}}
        </AnswerButton>
      </template>
    </section>
    <section class="flex items-center space-x-2 mt-10">
      <ButtonBluish @click="state--" :disabled="state == 0">{{$t('Back')}}</ButtonBluish>
      <ButtonPinkle class="inline-block" @click="$toast.warning($t('Please select an answer before continue'))" v-if="!canStartNext">{{$t('Next')}}</ButtonPinkle>
      <ButtonPinkle v-else-if="state+1 !== questions?.length" @click="state++" :disabled="!canStartNext">{{$t('Next')}}</ButtonPinkle>
      <ButtonGreenish @click="showSubmitModal = true" v-else-if="completedCount == answers.length">{{$t('Submit')}}</ButtonGreenish>
      <ButtonGreenish v-else @click="$toast.warning($t('Please select an answer before continue'))">{{$t('Submit')}}</ButtonGreenish>
    </section>
  </GuestLayout>
  <AreYouSureModal
      :show="showSubmitModal"
      @close="showSubmitModal = false"
      @submit="submit"
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

const props = defineProps<{
  questions: Array<Question>
}>()

// refs
const answers = ref([]) as Ref<Array<string|null>>
const state = ref(0)
const showSubmitModal = ref(false)

// getters
const currentQuestion = computed(() => props.questions[state.value])
const currentAnswer = computed(() => answers.value[state.value] !== null ? answers.value[state.value] : false)
const canStartNext = computed(() => answers.value[state.value] != null)
const completedCount = computed(() => answers.value.filter((v) => v != null).length)

// setters
const addAnswer = (answer: string) => {
  if(answers.value[state.value] == answer) {
    answers.value[state.value] = null
  } else {
    answers.value[state.value] = answer
  }
  console.log(answers.value, answer, state.value, answers.value.keys())
}

// actions
const submit = () => {
  console.log(answers.value)
}

onBeforeMount(() => {
  for(let i = 0; i < props.questions.length; i++) {
    answers.value[i] = null
  }
})
</script>
