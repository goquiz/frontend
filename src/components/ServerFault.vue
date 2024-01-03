<template>
  <Modal :show="true" :disable-close="true">
    <Server class="!w-16 !h-16 mx-auto text-red-400" />
    <div class="my-3 text-left">
      <h2 class="text-2xl fontMitr text-center">*{{$t(randomMessage[0]).capitalize()}}*</h2>
      <p class="text-sm text-gray-300 mt-2 mx-1">
        {{ $t(randomMessage[1]) }}
      </p>
    </div>
    <ButtonPinkle @click="$emit('retry')">Retry</ButtonPinkle>
  </Modal>
</template>

<script setup lang="ts">
import Modal from "@/components/modal/Modal.vue";
import Server from "@/components/icons/Server.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import {computed} from "vue";

const randomMessage = computed(() => {
  const errors = [
    'burnt scent',
    'gears grinding',
    'cloud confusion',
    'binary BBQ',
    'coffee break for code'
  ]
  const messages = [
      'Burnt scent detected? Servers may have overheated. Fear not – our virtual firefighters are on the case. Your data will be back shortly, fresher than ever!',
      'Hear gears grinding? No need to fret. Our server mechanics are on the job, smoothing out the virtual dance of gears. Relax, and soon your data will flow seamlessly once again!',
      'Lost in cloud confusion? Our servers are navigating a temporary digital fog. Fear not – virtual guides are steering them back. Your data will emerge from the clouds, clearer than ever, in a moment!',
      'Binary BBQ detected? Servers got a little too fired up. No worries – our virtual chefs are on the case. Your data will be back, perfectly grilled, in a moment!',
      'Code on a coffee break? Servers sipping Go-lang brews. No worries—your data is getting a taste of Go\'s efficiency. Back in action shortly!'
  ]

  const inx = Math.floor(Math.random() * errors.length)
  return [errors[inx], messages[inx]]
})
</script>