<template>
 <GuestLayout>
   <Widget>
     <h1 class="text-center fontMitr text-4xl">This page couldn't be found</h1>
     <ButtonBluish to="/" linkClass="mt-3">Back to Home</ButtonBluish>
   </Widget>
 </GuestLayout>
</template>
<script setup lang="ts">
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import Widget from "@/components/Widget.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
</script>