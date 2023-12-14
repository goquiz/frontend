<template>
  <Widget>
    <div>
      <h2 class="text-center fontMitr text-2xl md:text-4xl">{{$t('Home')}}</h2>
    </div>
    <ButtonGreenish class="mt-3" to="/join">{{$t('Join a Quiz')}}</ButtonGreenish>
    <ButtonPinkle to="/dashboard" class="mt-2">{{$t('Dashboard')}}</ButtonPinkle>
  </Widget>
</template>
<script setup lang="ts">
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import Widget from "@/components/Widget.vue";
</script>