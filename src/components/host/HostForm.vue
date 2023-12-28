<template>
  <form @submit.prevent>
    <SimpleInput :placeholder="$t('Host\'s name')" v-model.lazy="values.name" />
    <InputError v-if="errors?.name" :error="errors?.name" />
    <ButtonBluish :isLoading="processing" @click="submit" class="mt-2">{{$t('Create')}}</ButtonBluish>
  </form>
</template>
<script setup lang="ts">
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import {reactive, ref} from "vue";
import type {Ref} from 'vue'
import InputError from "@/components/inputs/InputError.vue";
import type {TInputError} from "@/scripts/errorTranslator";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import translator from "@/scripts/errorTranslator";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import {useRoute} from "vue-router";

const values = reactive({
  name: ''
})
const processing = ref(false)

const toast = useToast()
const i18n = useI18n()
const route = useRoute()

const emit = defineEmits(['submit'])

const submit = async () => {
  processing.value = true
  let res: AxiosResponse
  try {
    res = await axios.post(routePath('quiz.hosts', [route.params.id as string]), {
      name: values.name
    })
    processing.value = false
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
      if(e.response.data?.errors) {
        errors.value = translator(e.response.data.errors)
      }
    } else toast.error(i18n.t('error.unknown'))
    processing.value = false
    return
  }
  if(res.status == 200 && res.data?.host && res.data?.message) {
    toast.success(i18n.t(res.data.message))
    emit('submit', res.data.host)
  } else toast.error(i18n.t('error.unknown'))
}

const errors = ref({}) as Ref<TInputError>
</script>