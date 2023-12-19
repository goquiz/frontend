<template>
  <label v-if="error" class="my-1 text-red-400">
    <template v-if="error[1] != null">
      {{ $t(error[0], [error[1]]) }}
    </template>
    <template v-else>
      {{ $t(error[0]) }}
    </template>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  error?: [string, string|null];
}>()
</script>