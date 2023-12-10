<template>
   <nav class="fixed top-0 z-30 w-full">
     <div class="w-full px-3 py-3 fontPoppins bg-widget max-w-md mx-auto md:my-2 md:rounded-xl flex items-center">
       <img
           src="https://mrtn.vip/resources/img/nav.c852416e.jpg"
           alt="Profile Image"
           class="w-12 h-12 rounded-xl"
       />
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
       </div>
     </div>
   </nav>
</template>
<script setup lang="ts">
import Settings from "@/components/icons/Settings.vue";
import {useAuthStore} from "@/stores/auth";
import {computed} from "vue";

const auth = useAuthStore()
const username = computed(() => auth.user?.username || 'Unknown')
</script>