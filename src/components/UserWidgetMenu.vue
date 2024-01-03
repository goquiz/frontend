<template>
  <transition name="main-fade" mode="out-in" appear>
    <div class="w-full p-1 fontFredoka bg-gradient-to-br from-indigo-400 via-violet-500 to-blue-400 max-w-md mx-auto my-2 rounded-2xl">
      <div class="w-full px-3 py-2.5 fontFredoka bg-widget max-w-md mx-auto rounded-xl">
        <router-link v-for="link in links" :key="link" class="my-2 transition duration-150 w-full bg-main-from hover:bg-main-to block text-center py-2 rounded-xl" :to="{name: link}">{{$t(link.capitalize())}}</router-link>
        <button @click="logout" class="my-2 flex items-center justify-center space-x-2 transition duration-150 w-full bg-main-from hover:bg-main-to text-center py-2 rounded-xl">
          {{$t('Logout')}} <Spinner v-if="processingLogout" />
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {ref} from "vue";
import Spinner from "@/components/icons/Spinner.vue";
import axios from "@/scripts/axios";
import {routePath} from "@/scripts/axios/routes";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/stores/auth";

const links = ref([
    'home',
    'dashboard',
    'about'
])

const router = useRouter()
const authStore = useAuthStore()
const processingLogout = ref(false)

const logout = async () => {
  processingLogout.value = true
  try {
    await axios.get(routePath('auth.logout'))
  } catch(e: unknown) {
    if(e instanceof Error) console.error('failed to log out:', e.message)
    else console.log('unknown error during logout')
  }
  window.localStorage.removeItem('session')
  processingLogout.value = false
  authStore.logout()
  await router.push({path: '/login'})
}
</script>