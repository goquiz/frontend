<template>
  <ButtonRootLink target="_blank" to="https://discord.gg/2BtaJker6S" class="from-[#5865F2] to-[#5865F2] mt-2 md:mt-0">
            <span class="flex items-center justify-center space-x-3">
              <Discord/>
              <span>{{$t(title)}}</span>
            </span>
  </ButtonRootLink>
</template>

<script setup lang="ts">
import Discord from "@/components/icons/Discord.vue";
import ButtonRootLink from "@/components/buttons/ButtonRootLink.vue";

defineProps<{
  title: string;
}>()
</script>