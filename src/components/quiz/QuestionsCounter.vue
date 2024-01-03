<template>
  <section class="w-full my-2 fixed top-0 z-50 px-2">
    <div class="max-w-sm w-full mx-auto flex items-center space-x-1">
      <template v-for="(answer, inx) in data" :key="inx">
        <div class="transition-colors duration-150 w-full h-1 rounded bg-yellow-200"
             :class="{
                '!bg-emerald-400 ': answer !== null,
                '!bg-login-input opacity-60': answer == null && inx >= lastCompleted,
             }"
        ></div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  data: Array<string|null>;
  completed: number;
}>();

const lastCompleted = computed(() => {
  const reversedArray = []
  // manual reverse cuz the reference changes the data prop too, and that's bad ://
  for(let i = props.data.length - 1; i >= 0; i--) {
    const valueAtIndex = props.data[i]
    reversedArray.push(valueAtIndex)
  }
  const inx = reversedArray.findIndex((i) => i != null)
  return inx < 0 ? 0 : props.data.length - inx
})
</script>