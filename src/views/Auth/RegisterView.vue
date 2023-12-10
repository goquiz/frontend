<template>
  <GuestLayout>
    <h1 class="text-4xl fontMitr">{{$t('Register')}}</h1>
    <hr class="my-5 border-none h-2 bg-gradient-to-r from-pink-400 via-magenta-400 to-violet-500 rounded" />
    <div class="my-2">
      <AuthInputComponent type="text" :placeholder="$t('Username')" class="my-1" />
      <AuthInputComponent type="email" :placeholder="$t('Email')" class="my-1" />
      <AuthInputComponent type="password" :placeholder="$t('Pasword')" class="my-1" />
    </div>
    <ButtonPinkle>
      {{$t('Register')}}
    </ButtonPinkle>
    <div class="mt-3 text-left">
      <span>{{ $t('Already registered?') }}&nbsp;</span>
      <Link to="/login">{{ $t('Login') }}</Link>
    </div>
  </GuestLayout>
</template>

<script setup lang='ts'>
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import AuthInputComponent from "@/components/inputs/AuthInputComponent.vue";
import Link from "@/components/Link.vue";
</script>
