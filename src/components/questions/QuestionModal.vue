<template>
  <Modal :show="show" @close="$emit('close')">
    <h3 class="text-2xl fontMitr mb-2">{{ $t('Add a new question') }}</h3>
    <div class="text-left">
      <QuestionForm :errors="errors" :question="question" @submit="submit" :processing="processing" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import QuestionForm from "@/components/questions/QuestionForm.vue";
import Modal from "@/components/modal/Modal.vue";
import {ref} from "vue";
import type {Ref} from 'vue'
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import type {Question} from "@/types/question";
import type {AxiosResponse} from "axios";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import type {TInputError} from "@/scripts/errorTranslator";
import translator from "@/scripts/errorTranslator";
import {useToast} from "vue-toastification";

const props = defineProps<{
  show: boolean;
  quizId: number;
  question?: Question;
}>()

const errors = ref({}) as Ref<TInputError>
const processing = ref(false)
const toast = useToast()

const emit = defineEmits(['modify', 'push', 'close'])

const submit = async (data: object) => {
  errors.value = {}
  processing.value = true
  const args: [string, object] = [routePath('quiz.questions', [props.quizId]) + (props.question ? `/${props.question.id}` : ''), data]
  let res: AxiosResponse
  try {
    if(props.question) res = await axios.put(...args)
    else res = await axios.post(...args)
  } catch (e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
      if(e.response.data?.errors) errors.value = translator(e.response.data.errors)
      console.log(errors.value)
    } else toast.error("error.unknown")
    processing.value = false
    return
  }
  if(res.status == 200) {
    toast.success(props.question ? "Edited successfully" : "Created successfully")
    if(props.question) {
      emit('modify', props.question.id, {id: props.question.id, ...data})
    } else if(res.data?.question) {
      emit('push', res.data.question)
    } else window.location.reload()
  } else {
    toast.error('error.unknown')
  }
  processing.value = false
  return
}
</script>