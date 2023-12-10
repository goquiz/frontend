import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const lang = ref("en")

  function update(l: string) {
    lang.value = l
  }

  return {lang, update}
})