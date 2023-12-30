<template>
 <ButtonRoot :isLoading="isLoading" :class="classList" v-if="!to">
   <slot/>
 </ButtonRoot>
  <router-link v-else-if="!to.startsWith('http')" :class="'block ' + linkClass" :to="to">
    <ButtonRoot :class="classList" :isLoading="isLoading">
      <slot/>
    </ButtonRoot>
  </router-link>
  <a v-else :class="'block ' + linkClass" :href="to">
    <ButtonRoot :class="classList" :isLoading="isLoading">
      <slot/>
    </ButtonRoot>
  </a>
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