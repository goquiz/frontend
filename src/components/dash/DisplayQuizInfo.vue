<template>
  <Widget>
    <div class="flex items-center space-x-2 justify-between">
      <h2 class="text-xl fontFredoka">{{name}}</h2>
      <span v-tippy="{content: $t('The identifier of this quiz')}" class="fontMitr text-gray-400 cursor-pointer no-select">ID: {{id}}</span>
    </div>
    <div class="mt-2">
      <slot/>
    </div>
  </Widget>
</template>
<script setup lang="ts">
import Widget from "@/components/Widget.vue";

defineProps<{
  name: string;
  id: number;
}>()
</script>