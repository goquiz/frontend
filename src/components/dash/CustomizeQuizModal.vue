<template>
  <Modal :show="show" @close="close">
    <h2 class="text-2xl fontMitr mb-3">{{ $t('Your Quiz\'s name') }}</h2>
    <form v-on:submit.prevent>
      <SimpleInput :disabled="updateProcessing" :placeholder="$t('Quiz\'s name')" v-model.lazy="quizName" :value="quizName" />
      <InputError v-if="errors?.name" :error="errors.name" />
      <ButtonBluish :isLoading="updateProcessing" class="mt-2" @click="update">{{$t('Save')}}</ButtonBluish>
    </form>
    <p class="mt-2 mb-1 text-red-400 text-left">{{$t('Danger Zone')}}</p>
    <DeleteButton @destroy="destroy" :processing="deleteProcessing" />
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import type {Quiz} from "@/types/quiz";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import {onMounted, ref} from "vue";
import type {Ref} from "vue"
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import type {TInputError} from "@/scripts/errorTranslator";
import InputError from "@/components/inputs/InputError.vue";
import translator from "@/scripts/errorTranslator";
import DeleteButton from "@/components/DeleteButton.vue";

const props = defineProps<{
  show: boolean;
  quiz: Quiz;
}>()
const toast = useToast()

const emit = defineEmits(['close', 'updated'])
const deleteProcessing = ref(false)
const updateProcessing = ref(false)
const i18n = useI18n()
const router = useRouter()

const errors: Ref<TInputError> = ref({})
const quizName = ref('');

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
  errors.value = {}
  updateProcessing.value = true
  try {
    await axios.put(routePath('quiz.id', [props.quiz.id]), {
      name: quizName.value
    })
    updateProcessing.value = false
  } catch(e: unknown) {
    if(e instanceof AxiosError && e.response) {
      simpleMessageHelper(e)
      if(e.response.data?.errors) {
        errors.value = translator(e.response.data.errors)
      }
    }
    updateProcessing.value = false
    return
  }
  toast.success(i18n.t("Successfully updated!"))
  emit('updated', quizName)
  emit('close')
}

onMounted(() => {
  quizName.value = props.quiz.name
})
</script>