<template>
  <Widget>
    <h2 class="text-center text-2xl md:text-4xl fontMitr">{{$t('Join a Quiz')}}</h2>
    <form v-on:submit.prevent>
      <SimpleInput v-model.lazy="code" class="mt-3" type="number" min="0" max="999999" :placeholder="$t('Enter Code')" />
      <ButtonGreenish @click="join" class="mt-3">{{$t('Join')}}</ButtonGreenish>
    </form>
  </Widget>
</template>

<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import {ref} from "vue";
import router from "@/router";

const code = ref('')

const join = () => {
  router.push('/join/' + code.value)
}
</script>