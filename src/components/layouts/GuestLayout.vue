<template>
  <GuestFullLayout>
    <div class="m-auto z-10 sm:px-0 max-w-sm w-[95%] md:w-full">
      <div class="py-8 px-3 rounded-lg">
        <slot/>
      </div>
    </div>
  </GuestFullLayout>
</template>
<script setup lang="ts">
import GuestFullLayout from "@/components/layouts/GuestFullLayout.vue";
</script>