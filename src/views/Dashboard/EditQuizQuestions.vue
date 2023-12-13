<template>
  <QuestionsCounter :count="5" :completed="3" />
  <GuestLayout>
    <Widget>
      <img alt="Question Image" class="rounded-xl mb-2" src="https://novateus.com/blog/wp-content/uploads/2022/05/0_8y_ecBDxaRlpP1tS.jpg">
      <h2 class="text-lg md:text-2xl fontFredoka">What is the most popular javascript framework?</h2>
    </Widget>
    <section class="grid grid-cols-2 gap-2">
      <AnswerButton>Reactjs</AnswerButton>
      <AnswerButton>Vue.js</AnswerButton>
      <AnswerButton>Angular</AnswerButton>
      <AnswerButton>Svelte</AnswerButton>
    </section>
    <section class="flex items-center space-x-2 mt-10">
      <ButtonBluish>Back</ButtonBluish>
      <ButtonPinkle>Next</ButtonPinkle>
    </section>
  </GuestLayout>
</template>
<script setup lang="ts">
import QuestionsCounter from "@/components/quiz/QuestionsCounter.vue";
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import Widget from "@/components/Widget.vue";
import AnswerButton from "@/components/quiz/AnswerButton.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
</script>