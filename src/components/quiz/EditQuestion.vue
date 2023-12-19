<template>
  <Widget>
    <form v-on:submit.prevent>
      <h4 class="fontFredoka">{{$t('Question')}}</h4>
      <SimpleInput :placeholder="$t('Question')" :value="values.question" />
      <h4 class="fontFredoka mt-2">{{$t('Answers')}}</h4>

     <div>
       <template v-for="(val, inx) in Object.keys(values.answers)" :key="`${val}-${inx}`">
        <div class="flex items-center justify-center my-1">
          <SimpleInput class="rounded-r-none" :placeholder="$t('Answer')" :value="values.answers[inx]" v-model.lazy="values.answers[inx]" />
          <button @click="removeAnswer(inx)" class="transition duration-150 p-3 rounded-r-xl bg-rose-400 border-2 border-rose-400 hover:opacity-80 focus:opacity-70">&times;</button>
        </div>
       </template>
       <button v-if="values.answers.length < 4" @click="add" class="transition duration-150 bg-login-input px-3 py-2 w-full fontFredoka text-center rounded-xl hover:opacity-80 focus:opacity-70">
         {{$t('Add new')}}
       </button>
     </div>

      <h4 class="fontFredoka mt-2">{{$t('Solution')}}</h4>
      <SimpleSelect v-model.lazy="values.answers">
        <option disabled>{{$t('Select an answer')}}</option>
        <template v-for="answer in question.answers" :key="answer">
          <option v-if="answer != ''">{{answer}}</option>
        </template>
      </SimpleSelect>
      <ButtonBluish class="mt-3">{{ $t('Save') }}</ButtonBluish>
    </form>
  </Widget>
</template>
<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import type {Question} from "@/types/question";
import SimpleSelect from "@/components/inputs/SimpleSelect.vue";
import {ref} from "vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";

const props = defineProps<{
  question: Question
}>()

const values = ref({
  question: props.question.question,
  answers: props.question.answers,
  answer: props.question.answers[0] || ''
})

const add = () => {
  values.value.answers.push('')
}

const removeAnswer = (inx: number) => {
  values.value.answers.splice(inx, 1)
}
</script>