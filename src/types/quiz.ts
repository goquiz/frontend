import type {Question} from "@/types/question";

export type Quiz = {
    id: number;
    name: string;
}

export type FullQuiz = {
    id: number;
    name: string;
    questions: Array<Question>;
}