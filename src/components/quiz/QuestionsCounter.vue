<template>
  <section class="w-full my-2 fixed top-0 z-50 px-2">
    <div class="max-w-sm w-full mx-auto flex items-center space-x-1">
      <template v-for="i in count" :key="i">
        <div class="transition-colors duration-150 w-full h-1 rounded" :class="{'bg-emerald-400 ': i <= completed, 'bg-login-input opacity-60': i > completed}"></div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  count: number;
  completed: number;
}>();
</script>