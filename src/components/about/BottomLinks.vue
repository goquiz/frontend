<template>
  <footer class="fixed bottom-0 right-0 p-5 flex items-center space-x-3">
     <router-link to="/about" v-tippy="{content: $t('About us')}" class="p-3 rounded-xl bg-widget hover:opacity-75">
       <InfoIcon class="text-white !w-6 !h-6"/>
     </router-link>
     <router-link to="/how-to" v-tippy="{content: $t('How to')}" class="p-3 rounded-xl bg-widget hover:opacity-75">
       <QuestionMark class="text-white !w-6 !h-6"/>
     </router-link>
  </footer>
</template>
<script setup lang="ts">
import QuestionMark from "@/components/icons/QuestionMark.vue";
import InfoIcon from "@/components/icons/InfoIcon.vue";
</script>