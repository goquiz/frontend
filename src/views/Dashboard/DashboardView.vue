<template>
  <AuthLayout>
   <Widget class="!text-left">
     <h3 class="fontMitr text-3xl">{{$t('My Quizzes')}}</h3>
     <ButtonBluish to="/dashboard/quizzes" class="mt-3">{{$t('All')}}</ButtonBluish>
     <ButtonBluish @click="showModal = true" class="mt-3">{{$t('Create new')}}</ButtonBluish>
   </Widget>
    <Widget class="!text-left">
      <h3 class="fontMitr text-3xl">{{$t('Completed Quizzes')}}</h3>
      <ButtonPinkle class="mt-3">{{$t('All')}}</ButtonPinkle>
    </Widget>
  </AuthLayout>
  <NewQuizModal :show="showModal" @close="showModal = false" />
</template>
<script setup lang="ts">
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import Widget from "@/components/Widget.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import {ref} from "vue";
import NewQuizModal from "@/components/dash/NewQuizModal.vue";

const showModal = ref(false)
</script>