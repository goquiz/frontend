<template>
  <AuthLayout>
    <PremiumWidget/>
    <JoinQuiz />
  </AuthLayout>
  <BottomLinks/>
</template>
<script setup lang="ts">
import JoinQuiz from "@/components/home/JoinQuiz.vue";
import AuthLayout from "@/components/layouts/AuthLayout.vue";
import PremiumWidget from "@/components/premium/PremiumWidget.vue";
import BottomLinks from "@/components/about/BottomLinks.vue";
</script>