<template>
  <GuestFullLayout :disable-animations="true">
    <div class="m-auto z-10 sm:px-0 max-w-sm w-[95%] md:w-full">
      <div v-if="!isLoading">
        <template v-for="sect in terms" :key="sect">
          <Widget v-if="sect[0] == 'heading'" class="my-3">
            <h2 class="text-2xl fontMitr">{{ sect[1] }}</h2>
          </Widget>
          <p class="my-3" v-if="sect[0] == 'paragraph'">{{ sect[1] }}</p>
          <Widget v-if="sect[0] == 'secondary_heading'" class="my-2">
            <h2 class="text-xl fontMitr">{{ sect[1] }}</h2>
          </Widget>
          <div v-if="sect[0] == 'list'" class="px-5">
            <ol class="list-decimal">
              <li class="pb-3 md:text-lg" v-for="item in sect[1]" :key="item">{{ item }}</li>
            </ol>
          </div>
        </template>
        <ButtonPinkle to="/" class="my-5">{{$t('Back to home')}}</ButtonPinkle>
      </div>
      <Loader v-else />
    </div>
  </GuestFullLayout>
</template>
<script setup lang="ts">
import GuestFullLayout from "@/components/layouts/GuestFullLayout.vue";
import {onMounted, ref} from "vue";
import type {Ref} from 'vue'
import Loader from "@/components/Loader.vue";
import {useI18n} from "vue-i18n";
import Widget from "@/components/Widget.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import type {ServiceTerms} from "@/types/serviceTerms";

const props = defineProps<{
  jsonPath: string;
}>()

const i18n = useI18n()

const isLoading = ref(true)
const terms = ref({}) as Ref<ServiceTerms>

onMounted(async () => {
  isLoading.value = true
  const raw = await fetch(props.jsonPath)
  let data: Record<string, any>
  try {
    data = JSON.parse(await raw.text())
  } catch(e: unknown) {
    return
  }
  const locale = i18n.locale.value
  let key: string
  if(Object.keys(data).includes(locale)) {
    key = locale
  } else key = 'en'
  if(data??[key]) {
    terms.value = data[key]
  }
  isLoading.value = false
})
</script>
