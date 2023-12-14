<template>
  <UseQuiz
  :questions="questions"
  />
</template>

<script setup lang="ts">
import UseQuiz from "@/components/quiz/UseQuiz.vue";
import type {Question} from "@/types/question";

const questions = [
  {
    id: 1,
    question: 'What is the most popular javascript framework?',
    image: 'https://novateus.com/blog/wp-content/uploads/2022/05/0_8y_ecBDxaRlpP1tS.jpg',
    answers: [
        'React', 'Vue.js', 'Angular', 'Svelte'
    ]
  } as Question,
  {
    id: 2,
    question: 'What is the fastest backend framework?',
    answers: [
        'GoFiber', 'SpringBoot', 'Laravel', 'Django'
    ]
  } as Question,
  {
    id: 3,
    question: 'Select the NoSQL database',
    image: 'https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1282569/0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png',
    answers: [
      'MySQL', 'Firebase', 'PostgreSQL', 'MsSQL'
    ]
  } as Question
]
</script>