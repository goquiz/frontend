<template>
   <nav class="top-0 z-30 w-full px-2">
     <div class="w-full px-3 py-3 fontPoppins bg-widget max-w-md mx-auto my-2 rounded-xl flex items-center">
       <UserProfileImage :profile-image="profileImage" :username="username"/>
       <div class="ml-2">
         <h3 class="text-sm ">
           <span class="text-gray-300 fontFredoka">{{ $t('Hi') }}</span>,<br/>
           {{ username.capitalize() }}
         </h3>
       </div>
       <div class="ml-auto mr-2">
         <button @click="$toast.info($t('Soon...'))" class="transition duration-150 p-3 bg-main-from hover:bg-main-to rounded-xl">
           <Settings/>
         </button>
         <button @click="menuOpen = !menuOpen" class="ml-2 transition duration-150 p-3 bg-main-from hover:bg-main-to rounded-xl">
           <Menu/>
         </button>
       </div>
     </div>
     <UserWidgetMenu class="mt-3" v-show="menuOpen" />
   </nav>
</template>
<script setup lang="ts">
import Settings from "@/components/icons/Settings.vue";
import {useAuthStore} from "@/stores/auth";
import {computed, ref} from "vue";
import Menu from "@/components/icons/Menu.vue";
import UserWidgetMenu from "@/components/UserWidgetMenu.vue";
import UserProfileImage from "@/components/UserProfileImage.vue";

const auth = useAuthStore()
const username = computed(() => auth.user?.username || 'Unknown')
const profileImage = computed(() => auth.user?.profile_image_url || false)

const menuOpen = ref(false)
</script>