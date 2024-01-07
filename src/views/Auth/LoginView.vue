<template>
  <GuestLayout>
    <h1 class="text-4xl fontMitr">{{$t('Login')}}</h1>
    <hr class="my-5 border-none h-2 bg-gradient-to-r from-pink-400 via-magenta-400 to-violet-500 rounded" />
    <form v-on:submit.prevent>
      <div class="my-2">
        <AuthInputComponent :disabled="processing" v-model="username" :placeholder="$t('Username')" class="my-1" />
        <InputError v-if="errors.username" :error="errors.username" />
        <AuthInputComponent :disabled="processing" v-model="password" :placeholder="$t('Password')" type="password" class="my-1" />
        <InputError v-if="errors.password" :error="errors.password" />
      </div>
      <ButtonPinkle :isLoading="processing" @click="captcha = true">
        {{$t('Login')}}
      </ButtonPinkle>
    </form>
    <div class="mt-3 text-left">
      <Link to="/register">{{ $t('Register') }}</Link>
      |
      <Link to="/forgot-password">{{$t('I forgot my password')}}</Link>
    </div>
  </GuestLayout>
  <BottomLinks/>
  <CaptchaModal v-if="captcha" :show="captcha" @verified="submit" />
</template>

<script lang='ts'>
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import AuthInputComponent from "@/components/inputs/AuthInputComponent.vue";
import Link from "@/components/Link.vue";
import {defineComponent} from "vue";
import {useAuthStore} from "@/stores/auth";
import type {AxiosResponse} from "axios";
import type {User} from "@/types/user";
import {AxiosError} from "axios";
import InputError from "@/components/inputs/InputError.vue";
import translator from "@/scripts/errorTranslator";
import type {TInputError} from "@/scripts/errorTranslator";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import BottomLinks from "@/components/about/BottomLinks.vue";
import CaptchaModal from "@/components/modal/CaptchaModal.vue";

export default defineComponent({
  setup() {
    const authStore = useAuthStore()
    return {authStore}
  },
  name: 'LoginView',
  data() {
      return {
        username: '',
        password: '',
        processing: false,
        errors: {} as TInputError,
        captcha: false,
      }
  },
  components: {
    CaptchaModal,
    BottomLinks,
    InputError,
    GuestLayout,
    ButtonPinkle,
    AuthInputComponent,
    // eslint-disable-next-line vue/no-reserved-component-names
    Link,
  },
  methods: {
    async submit(hcaptcha_token: string) {
      this.errors = {}
      this.captcha = false
      this.processing = true
      let res: AxiosResponse
      try {
        res = await this.$http.post(this.api_route('auth.login'), {
          username: this.username,
          password: this.password,
          hcaptcha_token
        })
      } catch(e: unknown) {
        if(e instanceof AxiosError && e.response) {
          simpleMessageHelper(e)
          if(Object.keys(e.response.data).includes('errors')) {
            this.errors = translator(e.response.data['errors'])
          }
        } else {
          this.$toast.error(this.$t('error.unknown'))
        }
        this.processing = false
        return
      }
      if(res && res.status == 200 && Object.keys(res.data).includes('authUser')) {
        this.authStore.user = res.data['authUser'] as User
        if(Object.keys(res.data).includes('session')) window.localStorage.setItem('session', res.data['session'])
      }
      this.processing = false
      if(this.$route.query?.to) {
        this.$router.push(this.$route.query.to as string)
      } else this.$router.push('/home')
    }
  }
})
</script>
