<template>
  <button
      class="fontFredoka transition-all hover:opacity-80 focus:opacity-70 bg-gradient-to-r duration-150 w-full bg-purple-400 px-2 py-2.5 md:px-5 md:py-3 rounded-xl disabled:cursor-not-allowed"
      :class="{'flex items-center space-x-2 text-center content-center justify-center': isLoading}"
      :disabled="isLoading"
  >
    <span>
      <slot/>
    </span>
    <Loader v-if="isLoading" />
  </button>
</template>

<script lang="ts">
import Loader from "@/components/icons/Loader.vue";
import {defineComponent} from "vue";

export default defineComponent({
  components: {Loader},
    props: {
      isLoading: Boolean,
    }
})
</script>