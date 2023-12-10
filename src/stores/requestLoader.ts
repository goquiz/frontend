import { defineStore } from "pinia";
import {computed, ref} from "vue";

export const useRequestLoaderStore = defineStore('requestLoader', () => {
    const percent = ref(0)

    const isFinished = computed(() => percent.value == 0)

    function update(p: number) {
        percent.value = p
    }

    return {percent, isFinished, update}
})