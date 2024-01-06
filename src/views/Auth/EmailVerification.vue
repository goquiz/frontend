<template>
  <GuestLayout>
    <Loader v-if="!isLoaded" />
    <Widget v-else>
      <template v-if="success">
        <h2 class="text-2xl fontMitr">{{$t('Email address successfully verified')}}</h2>
        <p class="text-gray-300 my-2">{{$t('Now you can login.')}}</p>
        <ButtonPinkle class="my-2" to="/login">{{$t('Login')}}</ButtonPinkle>
      </template>
      <template v-else>
        <h2 class="text-2xl fontMitr">{{$t('Something went wrong')}}</h2>
        <p class="text-gray-300 my-2">{{$t('Contact us via discord')}}</p>
        <DiscordButton title="Contact us" />
      </template>
    </Widget>
  </GuestLayout>
</template>
<script setup lang="ts">
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import Widget from "@/components/Widget.vue";
import Loader from "@/components/Loader.vue";
import {onMounted, ref} from "vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import DiscordButton from "@/components/buttons/DiscordButton.vue";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {useRoute} from "vue-router";

const isLoaded = ref(true)
const success = ref(false)
const route = useRoute()

const load = async () => {
  isLoaded.value = false
  try {
    await axios.get(routePath("email-verification", [route.params.token as string]))
  } catch(e: unknown) {
    success.value = false
    isLoaded.value = true
    return
  }
  success.value = true
  isLoaded.value = true
}

onMounted(load)
</script>