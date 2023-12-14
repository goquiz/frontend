<template>
  <Modal :show="show" @close="close">
    <div class="flex items-center space-x-2 justify-center mb-2">
      <h2 class="fontMitr text-2xl">
        <span class="premium-text-gradient">{{$t('Premium')}}</span>
        {{$t('Subscription')}}
      </h2>
      <PremiumGold />
    </div>

    <p class="text-center mb-2 text-2xl my-2 fontFredoka">
     {{$t('Soon')}}... ;D
    </p>

    <ButtonPinkle>{{$t('Subscribe')}} {{ $t('NOW') }}</ButtonPinkle>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import PremiumGold from "@/components/icons/PremiumGold.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
defineProps<{
  show: boolean;
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>