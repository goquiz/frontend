export type HostedQuiz = {
    id: number;
    name: string;
    public_key: string;
    is_active: boolean;
}

export type HostedQuizzes = Array<HostedQuiz>