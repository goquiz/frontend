<template>
  <Modal :show="show" @close="close">
    <h2 class="text-2xl fontMitr mb-3">{{ $t('Customize quiz') }}</h2>
    <form v-on:submit.prevent>
      <SimpleInput :value="quiz.name" />
      <ButtonBluish class="mt-2">Save</ButtonBluish>
    </form>
    <p class="mt-2 mb-1 text-red-400 text-left">Danger Zone</p>
    <ButtonDanger>Delete</ButtonDanger>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import type {PropType} from "vue";
import type {Quiz} from "@/types/quiz";
import ButtonDanger from "@/components/buttons/ButtonDanger.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";

defineProps<{
  show: PropType<boolean>;
  quiz: Quiz;
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>