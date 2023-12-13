<template>
  <input
      @input="onInput"
      class="transition-all border-2 border-login-input hover:opacity-80 focus:opacity-70 focus:border-emerald-400 duration-150 w-full bg-login-input drop-shadow-2xl px-5 py-3 rounded-xl disabled:cursor-not-allowed" />
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  methods: {
    onInput(e: Event) {
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
  },
})
</script>

<style scoped>
input:focus {
  outline: none;
}
</style>