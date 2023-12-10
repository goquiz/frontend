<template>
  <GuestLayout>
    <h1 class="text-4xl fontMitr">{{$t('Login')}}</h1>
    <hr class="my-5 border-none h-2 bg-gradient-to-r from-pink-400 via-magenta-400 to-violet-500 rounded" />
    <form v-on:submit.prevent>
      <div class="my-2">
        <AuthInputComponent :disabled="processing" v-model="username" :placeholder="$t('Username')" class="my-1" />
        <AuthInputComponent :disabled="processing" v-model="password" :placeholder="$t('Password')" type="password" class="my-1" />
      </div>
      <ButtonPinkle :isLoading="processing" @click="submit">
        {{$t('Login')}}
      </ButtonPinkle>
    </form>
    <div class="mt-3 text-left">
      <Link to="/register">{{ $t('Register') }}</Link>
      |
      <Link to="/forgot-password">{{$t('I forgot my password')}}</Link>
    </div>
  </GuestLayout>
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
      }
  },
  components: {
    GuestLayout,
    ButtonPinkle,
    AuthInputComponent,
    // eslint-disable-next-line vue/no-reserved-component-names
    Link,
  },
  methods: {
    async submit() {
      this.processing = true
      let res: AxiosResponse
      try {
        res = await this.$http.post(this.api_route('auth.login'), {
          username: this.username,
          password: this.password
        })
      } catch(e: unknown) {
        if(e instanceof AxiosError) {
          if(e.response?.data && Object.keys(e.response.data).includes('error')) {
            if(Object.keys(e.response.data['error']).includes('message')) this.$toast.error(e.response.data['error']['message'])
          }
        } else {
          console.log(e)
        }
        this.processing = false
        return
      }
      console.log(res && res.status == 200 && Object.keys(res.data).includes('authUser'))
      if(res && res.status == 200 && Object.keys(res.data).includes('authUser')) {
        this.authStore.user = res.data['authUser'] as User
      }
      this.processing = false
      this.$router.push('/')
    }
  }
})
</script>
