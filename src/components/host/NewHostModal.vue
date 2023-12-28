<template>
  <Modal @close="emit('close')" :show="show">
    <h3 class="text-2xl fontMitr mb-2">
      {{ host ? $t('Edit host') : $t('Create a new host') }}
    </h3>
    <div class="text-left mt-3">
      <HostForm @submit="submit" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import type {HostedQuiz} from "@/types/hostedQuiz";
import HostForm from "@/components/host/HostForm.vue";

defineProps<{
  show: boolean;
  host?: HostedQuiz;
}>()

const emit = defineEmits(['close', 'submit'])

const submit = (data: object) => {
    emit('submit', data)
    emit('close')
}
</script>