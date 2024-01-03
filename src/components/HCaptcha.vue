<template>
 <div class="w-full flex items-center justify-center">
   <VueHcaptcha
       class="mx-auto"
       :sitekey="hCaptchaKey"
       theme="dark"
       @error="error"
       @verify="(...args: string[]) => emit('verified', ...args)"
   />
 </div>
</template>

<script setup lang="ts">
import VueHcaptcha from "@hcaptcha/vue3-hcaptcha";
import {computed} from "vue";
import {useToast} from "vue-toastification";

const emit = defineEmits(['verified'])
const toast = useToast()

const hCaptchaKey = computed(() => window.config.FETCHED.hcaptcha_key)

const error = (error: Error) => {
  toast.error(error.message)
}
</script>