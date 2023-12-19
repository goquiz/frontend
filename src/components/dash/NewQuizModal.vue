<template>
  <Modal :show="show" @close="close">
    <h2 class="text-2xl fontMitr mb-2">{{$t('New Quiz')}}</h2>
    <form v-on:submit.prevent class="text-left">
      <SimpleInput :disabled="processing" v-model.lazy="name" :placeholder="$t('Your Quiz\'s name')" />
      <InputError v-if="errors?.name" :error="errors?.name" />
      <ButtonBluish :isLoading="processing" @click="submit" class="mt-2">{{$t('Create')}}</ButtonBluish>
    </form>
  </Modal>
</template>
<script lang="ts">
import Modal from "@/components/modal/Modal.vue";
import {defineComponent} from "vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import type {AxiosResponse} from "axios";
import {AxiosError} from "axios";
import InputError from "@/components/inputs/InputError.vue";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import translator from "@/scripts/errorTranslator";
import type {TInputError} from "@/scripts/errorTranslator";

export default defineComponent({
  data() {
    return {
      name: '',
      processing: false,
      errors: {} as TInputError
    };
  },
  components: {
    InputError,
    ButtonBluish,
    SimpleInput,
    Modal,
  },
  props: {
    show: Boolean,
  },
  methods: {
    close() {
      this.name = ''
      this.processing = false
      this.$emit('close')
    },
    async submit() {
      this.errors = {}
      this.processing = true
      let res: AxiosResponse
      try {
        res = await this.$http.post(this.api_route('quiz.create'), {
          name: this.name
        })
      } catch(e: unknown) {
        if(e instanceof AxiosError && e.response) {
          simpleMessageHelper(e)
          if(Object.keys(e.response.data).includes('errors')) {
            this.errors = translator(e.response.data['errors'])
          }
        } else this.$toast.error(this.$t('error.unknown'))
        this.processing = false
        return
      }
      if(res.status == 200 && Object.keys(res.data).includes('quiz_id') && res.data['quiz_id'] !== 0) {
        this.processing = false
        this.$router.push('/Dashboard/quizzes/' + res.data['quiz_id'] + '/questions')
        this.close()
        return
      }
      this.$toast.error(this.$t('error.unknown'))
      this.processing = false
    }
  }
})
</script>