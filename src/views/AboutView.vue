<template>
  <GuestLayout>
    <div class="w-full m-4 max-w-sm mx-auto">
      <h2 class="text-center fontFredoka text-2xl md:text-4xl mb-5">About</h2>
      <Widget>
        <p>
          <span class="text-xl fontFredoka">Hi</span>, thanks for using my project. It's an open-source quiz application
          developed with <Link target="_blank" to="https://gofiber.io">GoFiber</Link> and <Link target="_blank" to="https://vuejs.org">Vue.js</Link>.
          Feel free to click the link below if you're interested in the source code.
          <a target="_blank" class="mt-2 w-min px-5 py-2 flex items-center space-x-2 bg-black text-white rounded-md justify-between hover:opacity-75" href="https://github.com/goquiz">
            <Github/>
            <span>Github</span>
          </a>
        </p>
      </Widget>
      <Widget>
        <h3 class="text-2xl fontFredoka">Support us</h3>
        <p class="my-1">
          Even with the smallest donation, you can contribute significantly to future operations and enhancements.
        </p>
        <a class="w-min" href="https://ko-fi.com/bndrmrtn" target="_blank">
          <img class="w-32" src="https://assets-global.website-files.com/5c14e387dab576fe667689cf/64f1a9ddd0246590df69ea06_kofi_short_button_white%402x.png" alt="Ko-Fi donation">
        </a>
      </Widget>
      <p class="-mt-2">
        Developed by <Link target="_blank" to="https://mrtn.vip">Martin Binder</Link>.
      </p>
    </div>
  </GuestLayout>
</template>
<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import Github from "@/components/icons/Github.vue";
import Link from "@/components/Link.vue";
import GuestLayout from "@/components/layouts/GuestLayout.vue";
</script>