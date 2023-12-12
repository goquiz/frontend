import { defineStore } from "pinia";
import {ref} from "vue";

export const useLoadingStore = defineStore('loadingStore', () => {
    const isLoading = ref(true)
    return {isLoading}
})