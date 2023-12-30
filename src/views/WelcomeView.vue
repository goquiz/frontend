<template>
  <GuestFullLayout>
    <NavBar/>
    <WelcomeScreen/>
  </GuestFullLayout>
</template>

<script setup lang="ts">
import GuestFullLayout from "@/components/layouts/GuestFullLayout.vue";
import NavBar from "@/components/guest/NavBar.vue";
import WelcomeScreen from "@/components/guest/WelcomeScreen.vue";
</script>
