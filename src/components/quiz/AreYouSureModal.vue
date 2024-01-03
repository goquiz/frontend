<template>
  <Modal :show="true" @close="close">
    <h2 class="text-2xl fontMitr">{{$t('Are you sure you want to submit?')}}</h2>
    <div class="mt-3 flex items-center space-x-3">
      <ButtonGreenish v-if="!ready" @click="ready = true">{{$t('YEAH!')}}</ButtonGreenish>
      <HCaptcha @verified="submit" v-else-if="!processing" />
      <div class="text-center w-full" v-else>
        <h3 class="text-lg fontFredoka flex items-center space-x-3 text-center justify-center">{{$t('Just a moment')}}... <Spinner/></h3>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import {ref} from "vue";
import HCaptcha from "@/components/HCaptcha.vue";
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import Spinner from "@/components/icons/Spinner.vue";

const props = defineProps<{
  answers: Array<string>;
  answerReference: Array<number>;
}>()

const toast = useToast()
const i18n = useI18n()
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['close', 'submit'])

const ready = ref(false)

const processing = ref(false)

const close = () => {
  emit('close')
}

const sortAnswers = (): Array<string> => {
  const indexes = new Array(props.answers.length)
  for (let i = 0; i < props.answerReference.length; i++) {
    indexes[i] = i;
  }
  indexes.sort((a, b) => props.answerReference[a] - props.answerReference[b])

  return indexes.map((i: number) => props.answers[i])
}

const submit = async (t: unknown) => {
  processing.value = true

  const generatedAnswers = sortAnswers()
  let res: AxiosResponse

  const data = {
    answers: generatedAnswers,
    hcaptcha_token: t,
  }

  try {
    res = await axios.post(routePath('play', [route.params.id as string]), data)
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    return
  }

  if(res.status == 200) {
    await router.push('/dashboard/finished')
  } else {
    toast.error(i18n.t('error.unknown'))
    await router.push('/dashboard')
  }
}
</script>