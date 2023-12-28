<template>
  <AuthLayout>
    <Loader v-if="isLoading" />
    <Widget v-else>
      <h2 class="text-2xl fontMitr text-center">{{$t('{name} invited you to play', {name: username.capitalize()})}}:</h2>
      <p class="text-center px-2 py-3 bg-main-from rounded-xl mt-3 fontFredoka text-xl">
        {{ quizName }}
      </p>
      <ButtonGreenish :to="`/play/${route.params.id as string}`" class="mt-2">{{$t('Join')}}</ButtonGreenish>
    </Widget>
  </AuthLayout>
</template>

<script setup lang="ts">

import AuthLayout from "@/components/layouts/AuthLayout.vue";
import Widget from "@/components/Widget.vue";
import {onMounted, ref} from "vue";
import Loader from "@/components/Loader.vue";
import type {AxiosResponse} from "axios";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {useRoute, useRouter} from "vue-router";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import {useToast} from "vue-toastification";
import {useI18n} from "vue-i18n";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";

const route = useRoute()
const router = useRouter()
const toast = useToast()
const i18n = useI18n()

const isLoading = ref(true)
const quizName = ref('')
const username = ref('')


const getInfo = async () => {
    let res: AxiosResponse
    try {
      res = await axios.get(routePath('play.info', [route.params.id as string]))
    } catch(e: unknown) {
      if(e instanceof AxiosError && e.response) {
        simpleMessageHelper(e)
      } else toast.error(i18n.t('error.unknown'))
      router.back()
      return
    }
    if(res.status == 200 && res.data?.username && res.data?.quiz_name) {
      quizName.value = res.data.quiz_name
      username.value = res.data.username
      isLoading.value = false
    } else {
      router.back()
      return
    }
}

onMounted(getInfo)
</script>