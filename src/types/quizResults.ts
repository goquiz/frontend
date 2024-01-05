import type {User} from "@/types/user";
import type {Question} from "@/types/question";

export type QuizResult = {
    id: number;
    name: string;
    user_answer: Array<UserAnswer>|undefined;
}

export type UserAnswer = {
    id: number;
    user: User;
    answers: Array<ResUserAnswer>;
}

export type ResUserAnswer = {
    id: number;
    answer: string;
    question: Question;
}