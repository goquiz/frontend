<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import type {RouteLocationNormalized} from 'vue-router'
import {useLoadingStore} from "@/stores/loading";
import Loader from "@/components/Loader.vue";
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import TermsModal from "@/components/terms/TermsModal.vue";
import {ref, watch} from "vue";

const route = useRoute()
const loadingStore = useLoadingStore()

const isTermsAccepted = ref(window.localStorage.getItem('terms') == 'accepted')
const acceptTerms = () => {
  window.localStorage.setItem('terms', 'accepted')
  isTermsAccepted.value = true
}

watch(route, (r: RouteLocationNormalized) => {
  isTermsPage.value = ['terms', 'privacy'].includes(r.name as string);
})

const isTermsPage = ref(false)
</script>

<template>
  <RouterView v-if="!loadingStore.isLoading" v-slot="{ Component, route }">
    <transition name="main-fade" mode="out-in" appear>
      <div :key="route.name || '__unknown__'">
        <component :is="Component" />
      </div>
    </transition>
  </RouterView>
  <GuestLayout v-else>
    <Loader/>
  </GuestLayout>
  <TermsModal v-if="!isTermsAccepted && !isTermsPage" @accept="acceptTerms" />
</template>

<style>
.main-fade-enter-active {
  transition: all 0.3s ease-out;
}
.main-fade-enter-from,
.main-fade-leave-to {
  opacity: 0;
}
</style>