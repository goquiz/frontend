<template>
  <transition name="main-fade" mode="out-in" appear>
    <div class="w-full p-1 fontFredoka bg-gradient-to-br from-indigo-400 via-violet-500 to-blue-400 max-w-md mx-auto my-2 rounded-2xl">
      <div class="w-full px-3 py-2.5 fontFredoka bg-widget max-w-md mx-auto rounded-xl">
        <router-link v-for="link in links" :key="link" class="my-2 transition duration-150 w-full bg-main-from hover:bg-main-to block text-center py-2 rounded-xl" :to="{name: link}">{{$t(link).capitalize()}}</router-link>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {ref} from "vue";

const links = ref([
    'home',
    'dashboard',
    'about'
])
</script>