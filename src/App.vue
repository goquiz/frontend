<script setup lang="ts">
import { RouterView } from 'vue-router'
import {useLoadingStore} from "@/stores/loading";
import Loader from "@/components/Loader.vue";
import GuestLayout from "@/components/layouts/GuestLayout.vue";

const loadingStore = useLoadingStore()
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