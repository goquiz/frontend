<template>
  <Modal :show="show" @close="close">
    <h2 class="text-2xl fontMitr mb-3">{{ $t('Your Quiz\'s name') }}</h2>
    <form v-on:submit.prevent>
      <SimpleInput :disabled="updateProcessing" :placeholder="$t('Quiz\'s name')" :value="quiz.name" />
      <ButtonBluish :isLoading="updateProcessing" class="mt-2" @click="update">{{$t('Save')}}</ButtonBluish>
    </form>
    <p class="mt-2 mb-1 text-red-400 text-left">{{$t('Danger Zone')}}</p>
    <ButtonDanger v-if="!deleteForm" @click="deleteForm = true">{{$t('Delete')}}</ButtonDanger>
    <div v-else class="grid grid-cols-2 gap-2">
      <ButtonDanger :isLoading="deleteProcessing" @click="destroy">{{$t('Delete')}}</ButtonDanger>
      <ButtonGreenish @click="deleteForm = false">{{$t('Retain')}}</ButtonGreenish>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import type {Quiz} from "@/types/quiz";
import ButtonDanger from "@/components/buttons/ButtonDanger.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import {ref} from "vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const props = defineProps<{
  show: boolean;
  quiz: Quiz;
}>()
const toast = useToast()

const emit = defineEmits(['close'])
const deleteForm = ref(false)
const deleteProcessing = ref(false)
const updateProcessing = ref(false)
const i18n = useI18n()
const router = useRouter()

const close = () => {
  emit('close')
}

const destroy = async () => {
  try  {
    await axios.delete(routePath('quiz.id', [props.quiz.id]))
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
    } else toast.error(i18n.t('error.unknown'))
    deleteProcessing.value = false
  }
  await router.push('/dashboard')
  close()
}

const update = async () => {
  console.info("not implemented")
}
</script>