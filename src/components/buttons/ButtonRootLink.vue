<template>
 <ButtonRoot :isLoading="isLoading" :class="classList" v-if="!to">
   <slot/>
 </ButtonRoot>
  <router-link v-else :class="'block ' + linkClass" :to="to">
    <ButtonRoot :class="classList" :isLoading="isLoading">
      <slot/>
    </ButtonRoot>
  </router-link>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ButtonRoot from "@/components/buttons/ButtonRoot.vue";

export default defineComponent({
  components: {ButtonRoot},
  props: {
    to: String||null,
    classList: String,
    isLoading: Boolean,
    linkClass: String,
  }
})
</script>