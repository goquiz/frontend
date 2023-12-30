<template>
  <nav class="transition-all duration-150 w-full fixed top-0 left-0 py-1 z-[999]">
    <div class="flex flex-wrap items-center justify-between mx-auto p-3 max-w-screen-lg">
      <router-link to="/">
        <img src="../../assets/images/logo.png" alt="Logo" class="w-[100px]" />
      </router-link>
      <router-link to="/login" v-if="!authStore.isLoggedIn">
        <ButtonPinkle class="w-auto !px-5 md:!px-10 !py-2">{{$t('Login')}}</ButtonPinkle>
      </router-link>
      <router-link to="/home" v-else>
        <ButtonPinkle class="w-auto !px-5 md:!px-10 !py-2">{{$t('Admin')}}</ButtonPinkle>
      </router-link>
    </div>
  </nav>
</template>
<script setup lang="ts">
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore()
</script>