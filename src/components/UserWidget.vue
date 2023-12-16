<template>
   <nav class="top-0 z-30 w-full px-2">
     <div class="w-full px-3 py-3 fontPoppins bg-widget max-w-md mx-auto my-2 rounded-xl flex items-center">
       <img v-if="profileImage !== false"
           :src="profileImage"
           alt="Profile Image"
           class="w-12 h-12 rounded-xl"
       />
       <div v-else class="no-select w-12 h-12 rounded-xl flex items-center justify-center text-2xl fontMitr bg-gradient-to-r from-indigo-400 to-blue-400">
         {{username.substring(0,1).toUpperCase()}}
       </div>
       <div class="ml-2">
         <h3 class="text-sm ">
           <span class="text-gray-300 fontFredoka">{{ $t('Hi') }}</span>,<br/>
           {{ username.capitalize() }}
         </h3>
       </div>
       <div class="ml-auto mr-2">
         <button class="transition duration-150 p-3 bg-main-from hover:bg-main-to rounded-xl">
           <Settings/>
         </button>
         <button class="ml-2 transition duration-150 p-3 bg-main-from hover:bg-main-to rounded-xl">
           <Menu/>
         </button>
       </div>
     </div>
   </nav>
</template>
<script setup lang="ts">
import Settings from "@/components/icons/Settings.vue";
import {useAuthStore} from "@/stores/auth";
import {computed} from "vue";
import Menu from "@/components/icons/Menu.vue";

const auth = useAuthStore()
const username = computed(() => auth.user?.username || 'Unknown')
const profileImage = computed(() => auth.user?.profile_image_url || false)
</script>