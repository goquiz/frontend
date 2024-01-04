<template>
  <img v-if="profileImage"
       :src="profileImage"
       alt="Profile Image"
       class="w-12 h-12 rounded-xl"
  />
  <div v-else class="no-select w-12 h-12 rounded-xl flex items-center justify-center text-2xl fontMitr bg-gradient-to-r from-indigo-400 to-blue-400">
    {{username.substring(0,1).toUpperCase()}}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  username: string;
  profileImage: string|null|undefined|false;
}>()
</script>