<template>
  <GuestLayout>
    <h1 class="text-4xl fontMitr">{{$t('Register')}}</h1>
    <hr class="my-5 border-none h-2 bg-gradient-to-r from-pink-400 via-magenta-400 to-violet-500 rounded" />
   <form ref="form" v-on:submit.prevent>
     <div class="my-2">
       <AuthInputComponent :disabled="processing" v-model.lazy="username" type="text" :placeholder="$t('Username')" class="my-1" />
       <InputError v-if="errors.username" :error="errors.username" />
       <AuthInputComponent :disabled="processing" v-model.lazy="email" type="email" :placeholder="$t('Email')" class="my-1" />
       <InputError v-if="errors.email" :error="errors.email" />
       <AuthInputComponent :disabled="processing" v-model.lazy="password" type="password" :placeholder="$t('Pasword')" class="my-1" />
       <InputError v-if="errors.password" :error="errors.password" />
     </div>
     <ButtonPinkle @click="submitFake" :isLoading="processing">
       {{$t('Register')}}
     </ButtonPinkle>
   </form>
    <div class="mt-3 text-left">
      <span>{{ $t('Already registered?') }}&nbsp;</span>
      <Link to="/login">{{ $t('Login') }}</Link>
    </div>
  </GuestLayout>
  <Modal :show="registeredModal" @click="registeredModal = false" :disable-close="true">
    <h2 class="text-2xl fontMitr mb-2">{{$t('Successfully registered')}}</h2>
    <p class="text-left">
      {{ $t('Just a few more steps, we have sent a verification email, follow the instructions, and we\'ll meet.') }}<br/>
      {{$t('Don\'t forget to check the spam folder as well.')}}
    </p>
    <ButtonBluish @click="registeredModal = false" class="mt-2">Cool ;)</ButtonBluish>
  </Modal>
  <BottomLinks/>
</template>

<script lang='ts'>
import GuestLayout from '@/components/layouts/GuestLayout.vue';
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";
import AuthInputComponent from "@/components/inputs/AuthInputComponent.vue";
import Link from "@/components/Link.vue";
import {defineComponent} from "vue";
import {AxiosError} from "axios";
import translator from "@/scripts/errorTranslator";
import type {TInputError} from "@/scripts/errorTranslator";
import InputError from "@/components/inputs/InputError.vue";
import Modal from "@/components/modal/Modal.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import BottomLinks from "@/components/about/BottomLinks.vue";

export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  components: {BottomLinks, ButtonBluish, Modal, InputError, GuestLayout, ButtonPinkle, AuthInputComponent, Link},
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errors: {} as TInputError,
      processing: false,
      registeredModal: false,
    };
  },
  methods: {
    async submit() {
      this.processing = true
      try {
        await this.$http.post(this.api_route('auth.register'), {
          username: this.username,
          email: this.email,
          password: this.password
        })
      } catch(e: unknown) {
        console.log(e)
        if(e instanceof AxiosError && e.response) {
          simpleMessageHelper(e)
          if(Object.keys(e.response.data).includes('errors')) {
            console.log(translator(e.response.data['errors']))
            this.errors = translator(e.response.data['errors'])
          }
        } else {
          this.$toast.error(this.$t('error.unknown'))
        }
        this.processing = false
        return
      }
      this.username = ''
      this.password = ''
      this.email = ''
      this.registeredModal = true
      this.processing = false;
    },
    submitFake() {
      (this.$refs.form as HTMLFormElement).reset()
    }
  }
})
</script>
