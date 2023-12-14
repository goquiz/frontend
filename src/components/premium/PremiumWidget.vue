<template>
  <Widget>
    <div class="flex items-center space-x-2">
      <PremiumGold/>
      <h2 class="fontFredoka">{{ $t('Support us via') }} <span class="premium-text-gradient">{{$t('premium')}}</span> {{$t('subscription')}}</h2>
      <button @click="show = true" class="p-3 transition duration-150 bg-main-from hover:bg-main-to rounded-xl flex items-center justify-center">
        <InfoIcon/>
      </button>
    </div>
  </Widget>
  <PremiumModal :show="show" @close="show = false" />
</template>
<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import PremiumGold from "@/components/icons/PremiumGold.vue";
import InfoIcon from "@/components/icons/InfoIcon.vue";
import PremiumModal from "@/components/premium/PremiumModal.vue";
import {ref} from "vue";

const show = ref(false)
</script>