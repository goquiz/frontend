<template>
  <Modal :show="show" @close="close">
    <h2 class="text-2xl fontMitr mb-3">{{ $t('Your Quiz\'s name') }}</h2>
    <form v-on:submit.prevent>
      <SimpleInput :placeholder="$t('Quiz\'s name')" :value="quiz.name" />
      <ButtonBluish class="mt-2">{{$t('Save')}}</ButtonBluish>
    </form>
    <p class="mt-2 mb-1 text-red-400 text-left">{{$t('Danger Zone')}}</p>
    <ButtonDanger>{{$t('Delete')}}</ButtonDanger>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import type {Quiz} from "@/types/quiz";
import ButtonDanger from "@/components/buttons/ButtonDanger.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";

defineProps<{
  show: boolean;
  quiz: Quiz;
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>