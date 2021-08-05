export enum MasteryType {
  MeditationRate = 'meditationRate',
}

export interface CharMastery {
  type: MasteryType;
  value: number;
}
