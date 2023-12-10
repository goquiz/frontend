<template>
  <Widget>
    <h2 class="text-center text-2xl md:text-4xl fontMitr">{{$t('Join a Quiz')}}</h2>
    <SimpleInput class="mt-3" type="number" min="0" max="999999" :placeholder="$t('Enter Code')" />
    <ButtonGreenish class="mt-3">{{$t('Join')}}</ButtonGreenish>
  </Widget>
</template>

<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import Separator from "@/components/Separator.vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import Link from "@/components/Link.vue";
</script>