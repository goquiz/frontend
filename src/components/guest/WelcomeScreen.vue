<template>
  <section class="flex h-screen overflow-hidden blurred-bg">
    <div class="m-auto z-10 w-full px-2 sm:px-0 sm:w-auto text-center">
      <div class="max-w-screen-sm md:mx-auto">
        <h1 class="fontMitr text-3xl md:text-5xl titleGradient">
          {{$t('Empower educators with')}}
          <span class="seamless">{{$t('seamless')}}</span>
          {{$t('quiz sharing.')}}
        </h1>
        <p class="mt-3 text-gray-400 text-lg">
          {{$t('Teachers share, students thrive.')}}
        </p>
        <div class="md:grid md:grid-cols-2 md:gap-2 mt-3 md:px-5">
          <ButtonRootLink target="_blank" to="https://github.com/goquiz" class="from-black to-black">
            <span class="flex items-center justify-center space-x-3">
              <Github/>
              <span>{{$t('Open-source repository')}}</span>
            </span>
          </ButtonRootLink>
          <DiscordButton title="Join our community" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Github from "@/components/icons/Github.vue";
import ButtonRootLink from "@/components/buttons/ButtonRootLink.vue";
import DiscordButton from "@/components/buttons/DiscordButton.vue";
</script>

<style scoped>
.titleGradient {
  --bg-size: 400%;
  --color-one: white;
  --color-two: rgb(215, 213, 252);
  background: linear-gradient(90deg,var(--color-one),var(--color-two),var(--color-one)) 0 0 /var(--bg-size) 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: textGradientAnimation 18s linear infinite;
}

.seamless {
  background: linear-gradient(to bottom right, rgba(252, 211, 77, 0.57), rgba(250, 204, 21, 0.74), rgba(253, 186, 116, 0.69));
  background-clip: border-box;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
