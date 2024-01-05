<template>
  <div class="bg-login-input px-3 py-2 rounded-xl flex space-x-2 my-2">
    <UserProfileImage :profile-image="user.profile_image_url" :username="user.username" />
    <p class="text-sm my-auto">
      <span class="fontFredoka text-gray-300">{{$t(title)}}</span><br/>
      {{user.username.capitalize()}}
    </p>
  </div>
</template>
<script setup lang="ts">
import UserProfileImage from "@/components/UserProfileImage.vue";
import type {User} from "@/types/user";

defineProps<{
  user: User;
  title: string;
}>()
</script>