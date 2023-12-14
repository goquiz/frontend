<template>
  <AuthFullLayout>
    <Loader class="mt-5" v-if="!loaded" />
    <div class="mt-5" v-else>
      <Widget v-for="quiz in quizzes" :key="quiz.id">
        <div class="flex items-center space-x-2 justify-between">
          <h2 class="text-xl fontFredoka">{{quiz.name}}</h2>
          <span v-tippy="{content: $t('The identifier of this quiz')}" class="fontMitr text-gray-400 cursor-pointer no-select">ID: {{quiz.id}}</span>
        </div>
        <div class="grid grid-cols-2 gap-2 mt-3">
          <ButtonGreenish v-tippy="{content: $t('Rename or delete this quiz')}" @click="manage(quiz)">{{ $t('Customize') }}</ButtonGreenish>
          <ButtonBluish v-tippy="{content: $t('Create a new session for this quiz')}">{{ $t('Host panel') }}</ButtonBluish>
        </div>
        <ButtonPinkle v-tippy="{content: $t('Create, edit or delete questions and answers')}" class="mt-2">{{ $t('Manage questions') }}</ButtonPinkle>
      </Widget>
    </div>
  </AuthFullLayout>
  <ManageQuizModal v-if="showModal" @close="showModal = false" :quiz="modalQuiz" :show="showModal" />
</template>

<script lang="ts">
import AuthFullLayout from "@/components/layouts/AuthFullLayout.vue";
import {defineComponent} from "vue";
import {useLoadingStore} from "@/stores/loading";
import type {Quiz} from "@/types/quiz";
import type {AxiosResponse} from "axios";
import {AxiosError} from "axios";
import simpleMessageHelper from "@/scripts/errorTranslator/simpleMessageHelper";
import Widget from "@/components/Widget.vue";
import Loader from "@/components/Loader.vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import ButtonGreenish from "@/components/buttons/ButtonGreenish.vue";
import ManageQuizModal from "@/components/dash/CustomizeQuizModal.vue";
import ButtonPinkle from "@/components/buttons/ButtonPinkle.vue";

export default defineComponent({
  setup() {
    const loadingStore = useLoadingStore()
    return {loadingStore}
  },
  components: {ButtonPinkle, ManageQuizModal, ButtonGreenish, ButtonBluish, Loader, Widget, AuthFullLayout},
  data() {
    return {
      quizzes: [] as Array<Quiz>,
      loaded: false,
      showModal: false,
      modalQuiz: {} as Quiz,
    };
  },
  methods: {
    async load() {
      let res: AxiosResponse
      try {
        res = await this.$http.get(this.api_route('quiz.all'))
      } catch(e: unknown) {
        if(e instanceof AxiosError) {
          simpleMessageHelper(e)
        } else {
          this.$toast.error(this.$t('Something went wrong'))
        }
        this.$router.push('/dashboard')
        return
      }
      console.log(res.data)
      if(res.data.quizzes) {
        this.quizzes = res.data.quizzes
        this.loaded = true
      } else this.$router.push('/dashboard')
    },
    manage(quiz: Quiz) {
      this.modalQuiz = quiz
      this.showModal = true
    }
  },
  async beforeMount() {
    await this.load()
  },
  unmounted() {
    this.loadingStore.isLoading = false
  },
})
</script>