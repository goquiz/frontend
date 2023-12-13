<template>
  <RouterLink v-if="!to.startsWith('http')" :to="to" class="text-yellow-200">
    <slot/>
  </RouterLink>
  <a v-else :href="to" class="text-yellow-200">
    <slot/>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>