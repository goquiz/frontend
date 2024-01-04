import type {User} from "@/types/user";

export type CompletedQuiz = {
    answers: Array<CompletedAnswers>;
    quiz: {
        id: number;
        name: string;
        user: User;
    }
}

export type CompletedAnswers = {
    question: string;
    answers: Array<string>;
    answer: string;
    user_answer: string;
}