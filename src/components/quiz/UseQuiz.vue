<template>
  <QuestionsCounter :count="questions?.length" :completed="dataAnswers.length" />
  <GuestLayout>
    <Widget>
      <img alt="Question Image" class="rounded-xl mb-2"
           v-if="currentQuestion.image" :src="currentQuestion.image"
      />
      <h2 class="text-lg md:text-2xl fontFredoka">
        {{ currentQuestion?.question }}
      </h2>
    </Widget>
    <section class="grid grid-cols-2 gap-2">
      <AnswerButton @click="addAnswer(answer)" :class="{'border-blue-300': currentAnswer == answer}" v-for="answer in currentQuestion.answers" :key="answer">
        {{answer}}
      </AnswerButton>
    </section>
    <section class="flex items-center space-x-2 mt-10">
      <ButtonBluish @click="state--" :disabled="state == 0">{{$t('Back')}}</ButtonBluish>
      <ButtonPinkle class="inline-block" @click="$toast.warning($t('Please select an answer before continue'))" v-if="currentAnswer == false">{{$t('Next')}}</ButtonPinkle>
      <ButtonPinkle v-else-if="state+1 !== questions?.length" @click="state++" :disabled="!canStartNext">{{$t('Next')}}</ButtonPinkle>
      <ButtonGreenish @click="showSubmitModal = true" v-else>{{$t('Submit')}}</ButtonGreenish>
    </section>
  </GuestLayout>
  <AreYouSureModal
      :show="showSubmitModal"
      @close="showSubmitModal = false"
      @submit="submit"
  />
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import QuestionsCounter from "@/components/quiz/QuestionsCounter.vue";
import Widget from "@/components/Widget.vue";
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import AnswerButton from "@/components/quiz/AnswerButton.vue";
import type {Question} from "@/types/question";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import AreYouSureModal from "@/components/quiz/AreYouSureModal.vue";

export default defineComponent({
  data() {
    return {
      state: 0,
      dataAnswers: [],
      showSubmitModal: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.state]
    },
    currentAnswer() {
      if(this.dataAnswers.length < this.state + 1) return false
      return this.dataAnswers[this.state]
    },
    canStartNext() {
      return this.state <= this.questions?.length
    }
  },
  components: {AreYouSureModal, ButtonGreenish, AnswerButton, GuestLayout, Widget, QuestionsCounter, ButtonPinkle, ButtonBluish},
  props: {
    questions: Array as PropType<Array<Question>>,
  },
  methods: {
    addAnswer(answer: string) {
      if(this.dataAnswers.length < this.state + 1) this.dataAnswers.push(answer)
      else if(this.dataAnswers[this.state] != answer) {
        this.dataAnswers[this.state] = answer
      } else {
        this.dataAnswers.splice(this.state, 1)
      }
    },
    submit() {
      console.log(this.dataAnswers)
    }
  }
})
</script>