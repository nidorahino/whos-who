import { defaultConfigs, Configs } from "./configs.model";

export interface Result {
    name: string,
    score: number,
    correctAnswers: number,
    config: Configs
};

export const defaultResult: Result = {
    name: '',
    score: 0,
    correctAnswers: 0,
    config: defaultConfigs
}
