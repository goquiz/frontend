<template>
  <GuestLayout>
    <Widget>
     <div class="text-center">
       <LoaderIcon class="!w-8 !h-8 mx-auto mt-3" />
        <h2 class="text-2xl fontMitr my-3">
          {{$t('Just a moment')}}...
        </h2>
     </div>
    </Widget>
  </GuestLayout>
</template>
<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import GuestLayout from "@/components/layouts/GuestLayout.vue";
import LoaderIcon from '@/components/icons/Loader.vue'
</script>