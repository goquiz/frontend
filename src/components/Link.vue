<template>
  <RouterLink :to="to" class="text-yellow-200">
    <slot/>
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string;
}>();
</script>