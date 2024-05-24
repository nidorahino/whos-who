export interface Configs {
    selectedGenre: string,
    selectedNumQuestions: number,
    selectedGameMode: string,
    selectedNumAnswers: number;
};

export const defaultConfigs: Configs = {
    selectedGenre: 'country',
    selectedNumQuestions: 5,
    selectedGameMode: "Guess the Song",
    selectedNumAnswers: 4,
};