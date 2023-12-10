<template>
  <UserWidget/>
  <GuestLayout>
    <slot/>
  </GuestLayout>
</template>
<script setup lang="ts">
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import UserWidget from "@/components/UserWidget.vue";
</script>