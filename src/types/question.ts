export type Question = {
    id: number;
    question: string;
    image: string|null;
    answers: Array<string>;
    answer: string|undefined;
}