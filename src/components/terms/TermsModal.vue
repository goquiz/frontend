<template>
  <Modal :show="true" :disable-close="true">
    <h2 class="text-2xl fontMitr">{{$t('Terms and conditions')}}</h2>
    <div class="mt-2 text-left">
      <p class="text-gray-400">{{$t('Accept our terms and conditions before using our product.')}}</p>
      <p class="mt-2">
        {{$t('Direct links')}}:<br/>
        <router-link class="text-blue-400" to="/terms">{{$t('Terms and conditions')}}</router-link><br/>
        <router-link class="text-blue-400" to="/privacy">{{$t('Privacy Policy')}}</router-link>
      </p>
      <ButtonBluish class="mt-2" @click="$emit('accept')">{{$t('I understood and I accept')}}</ButtonBluish>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
</script>