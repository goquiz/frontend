<template>
  <section class="w-full my-2 fixed top-0 z-50 px-2">
    <div class="max-w-sm w-full mx-auto flex items-center space-x-1">
      <template v-for="(answer, inx) in data" :key="inx">
        <div class="transition-colors duration-150 w-full h-1 rounded"
             :class="{
                'bg-emerald-400 ': answer !== null,
                'bg-login-input opacity-60': answer == null && inx >= completed,
                'bg-yellow-200': answer == null && inx+1 <= completed
             }"
        ></div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  data: Array<string|null>;
  completed: number;
}>();
</script>