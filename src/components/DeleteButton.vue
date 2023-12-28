<template>
  <ButtonDanger v-if="!showDelete" @click="showDelete = true">{{$t('Delete')}}</ButtonDanger>
  <div v-else class="grid grid-cols-2 gap-2">
    <ButtonDanger v-tippy="{content:$t('You will lose all data connected to this')}" :isLoading="processing" @click="destroy">{{$t('Delete')}}</ButtonDanger>
    <ButtonGreenish @click="showDelete = false">{{$t('Retain')}}</ButtonGreenish>
  </div>
</template>
<script setup lang="ts">
import ButtonDanger from "@/components/buttons/ButtonDanger.vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import {ref} from "vue";

defineProps<{
  processing: boolean;
}>()

const showDelete = ref(false)

const emit = defineEmits(['destroy'])

const destroy = () => {
  emit('destroy')
}
</script>