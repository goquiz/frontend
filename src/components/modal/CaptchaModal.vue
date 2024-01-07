<template>
  <Modal :show="show" :disable-close="true">
    <h2 class="text-2xl fontMitr">{{$t('Verify that you are not a robot')}} 🤖</h2>
    <div class="mt-3">
      <HCaptcha @verified="verify" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import HCaptcha from "@/components/HCaptcha.vue";

defineProps<{
  show: boolean;
}>()

const emit = defineEmits(['verified'])

const verify = (token: string) => {
  emit('verified', token)
}
</script>