<template>
  <GuestFullLayout>
    <UserWidget />
    <div class="mx-auto sm:px-0 max-w-sm w-[95%] md:w-full">
      <slot/>
    </div>
  </GuestFullLayout>
</template>
<script setup lang="ts">
import UserWidget from "@/components/UserWidget.vue";
import GuestFullLayout from "@/components/layouts/GuestFullLayout.vue";
</script>