<template>
  <Modal :show="show" @close="close">
    <h2 class="text-2xl fontFredoka mb-2">{{$t('New Quiz')}}</h2>
    <form v-on:submit.prevent>
      <SimpleInput :disabled="processing" v-model.lazy="name" placeholder="Your Quiz's name" />
      <ButtonBluish :isLoading="processing" @click="submit" class="mt-2">Create</ButtonBluish>
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

export default defineComponent({
  data() {
    return {
      name: '',
      processing: false,
      errors: {}
    };
  },
  components: {
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
        if(e instanceof AxiosError) {
          if(e.response.data?.error?.message) {
            this.$toast.error(e.response.data.error.message)
            this.processing = false
            return
          } else if(Object.keys(e.response.data).includes('errors')) {
            this.processing = false
            return
          }
        } else console.error(e)
        this.$toast.error(this.$t('An unknown error occurred'))
        this.processing = false
        return
      }
      if(res.status == 200 && Object.keys(res.data).includes('quiz_id') && res.data['quiz_id'] !== 0) {
        this.processing = false
        this.$router.push('/dashboard/quizzes/' + res.data['quiz_id'] + '/questions')
        this.close()
        return
      }
      this.$toast.error(this.$t('An unknown error occurred'))
      this.processing = false
    }
  }
})
</script>