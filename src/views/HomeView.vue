<template>
  <AuthLayout>
    <PremiumWidget/>
    <JoinQuiz />
  </AuthLayout>
</template>
<script setup lang="ts">
import JoinQuiz from "@/components/home/JoinQuiz.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import PremiumWidget from "@/components/premium/PremiumWidget.vue";
</script>