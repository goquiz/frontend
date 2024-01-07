<template>
  <GuestLayout>
    <h1 class="text-4xl fontMitr">{{$t('Forgot password?')}}</h1>
    <hr class="my-5 border-none h-2 bg-gradient-to-r from-pink-400 via-magenta-400 to-violet-500 rounded" />
    <form @submit.prevent>
      <div class="my-2">
        <AuthInputComponent :disabled="processing" v-model.lazy="username" :placeholder="$t('Username')" class="my-1" />
        <InputError v-if="errors.username" :error="errors.username" />
      </div>
      <ButtonPinkle :isLoading="processing" @click="submit">
        {{$t('Reset')}}
      </ButtonPinkle>
    </form>
    <div class="mt-3 text-left">
      <span>{{$t('Do you remember it?')}}&nbsp;</span>
      <Link to="/login">{{$t('Login')}}</Link>
    </div>
  </GuestLayout>
  <BottomLinks/>
</template>

<script setup lang='ts'>
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import AuthInputComponent from "@/components/inputs/AuthInputComponent.vue";
import Link from "@/components/Link.vue";
import BottomLinks from "@/components/about/BottomLinks.vue";
import {ref} from "vue";
import type {Ref} from "vue"
import InputError from "@/components/inputs/InputError.vue";
import type {TInputError} from "@/scripts/errorTranslator";
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import translator from "@/scripts/errorTranslator";

const username = ref('')
const errors = ref({}) as Ref<TInputError>
const processing = ref(false)

const i18n = useI18n()
const toast = useToast()

const submit = async () => {
  errors.value = {}
  processing.value = true
  let res: AxiosResponse
  try {
    res = await axios.post(routePath('forgot-password'), {
      username: username.value
    })
    processing.value = false
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
      if(Object.keys(e.response.data).includes('errors')) {
        errors.value = translator(e.response.data['errors'])
      }
    } else toast.error(i18n.t('error.unknown'))
    processing.value = false
    return
  }
  if(res.status == 200 && res.data?.message) {
    toast.success(i18n.t(res.data.message))
  } else toast.error(i18n.t('error.unknown'))
}
</script>
