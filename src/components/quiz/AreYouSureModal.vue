<template>
  <Modal :show="show" @close="close">
    <h2 class="text-2xl fontFredoka">{{$t('Are you sure you want to submit?')}}</h2>
    <div class="mt-3 flex items-center space-x-3">
        <ButtonGreenish @click="submit">{{$t('YEAH!')}}</ButtonGreenish>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
defineProps<{
  show: boolean;
}>()

const emit = defineEmits(['close', 'submit'])

const close = () => {
  emit('close')
}

const submit = () => {
  emit('submit')
}
</script>