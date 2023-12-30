<template>
 <GuestLayout>
   <Widget>
     <h1 class="text-center fontMitr text-2xl md:text-4xl">{{$t('This page couldn\'t be found')}}</h1>
     <ButtonBluish to="/home" linkClass="mt-3">{{$t('Back to home')}}</ButtonBluish>
   </Widget>
 </GuestLayout>
</template>
<script setup lang="ts">
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import Widget from "@/components/Widget.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
</script>