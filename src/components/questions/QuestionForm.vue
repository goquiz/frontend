<template>
    <form v-on:submit.prevent>
      <h4 class="fontFredoka">{{$t('Question')}}</h4>
      <SimpleInput :disabled="processing" :placeholder="$t('Question')" :value="values.question" v-model.lazy="values.question" />
      <InputError v-if="errors?.question" :error="errors.question" />
      <h4 class="fontFredoka mt-2">{{$t('Answers')}}</h4>

     <div>
       <template v-for="(val, inx) in Object.keys(values.answers)" :key="`${val}-${inx}`">
         <div class="flex items-center justify-center my-1">
           <SimpleInput :disabled="processing" class="rounded-r-none" :placeholder="$t('Answer')" :value="values.answers[inx]" v-model="values.answers[inx]" />
           <button type="button" @click="removeAnswer(inx)" class="transition duration-150 p-3 rounded-r-xl bg-rose-400 border-2 border-rose-400 hover:opacity-80 focus:opacity-70">&times;</button>
         </div>
         <InputError v-if="errors??['answers.' + inx]" :error="errors['answers.' + inx]" />
       </template>
       <button type="button" :disabled="processing" v-if="values.answers.length < 4" @click="add" class="transition duration-150 bg-login-input px-3 py-2 w-full fontFredoka text-center rounded-xl hover:opacity-80 focus:opacity-70">
         {{$t('Add new')}}
       </button>
       <InputError v-if="errors?.answers" :error="errors.answers" />
     </div>

      <h4 class="fontFredoka mt-2">{{$t('Solution')}}</h4>
      <SimpleSelect :disabled="processing" v-model.lazy="values.answer">
        <option disabled>{{$t('Select an answer')}}</option>
        <template v-for="answer in values.answers" :key="answer">
          <option :selected="answer == values.answer" :value="answer" v-if="answer != ''">{{answer}}</option>
        </template>
      </SimpleSelect>

      <ButtonBluish :disabled="!canSubmit" :isLoading="processing" @click="submit" class="mt-3">
        <span>{{ $t('Save') }}</span>
      </ButtonBluish>
    </form>
</template>
<script setup lang="ts">
import SimpleInput from "@/components/inputs/SimpleInput.vue";
import type {Question} from "@/types/question";
import SimpleSelect from "@/components/inputs/SimpleSelect.vue";
import {computed, reactive} from "vue";
import ButtonBluish from "@/components/buttons/ButtonBluish.vue";
import type {TInputError} from "@/scripts/errorTranslator";
import InputError from "@/components/inputs/InputError.vue";

const emit = defineEmits(['submit'])

const props = defineProps<{
  question?: Question;
  processing: boolean;
  errors: TInputError;
}>()

const values = reactive({
  question: props.question?.question || '',
  answers: props.question?.answers || [],
  answer: props.question?.answer || ''
})

const add = () => {
  values.answers.push('')
}

const removeAnswer = (inx: number) => {
  values.answers.splice(inx, 1)
}

const canSubmit = computed(() => values.answers.filter(x => x).length >= 1)

const submit = () => {
  const data = {
    question: values.question,
    answers: values.answers,
    answer: values.answer !== '' ? values.answer : values.answers[0]
  }
  emit('submit', data)
}
</script>