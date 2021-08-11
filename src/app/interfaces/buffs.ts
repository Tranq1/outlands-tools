import { Skill } from '../data/skills.enum';
import { TemplateBuilderState } from '../template-builder/state/reducers/template.reducer';

export enum BuffType {
  FoodManaReg = 'foodManaReg',
  FoodSwingSpeed = 'foodSwingSpeed',
  ActiveMeditation = 'activeMeditation',
  ManaDrainWizardry = 'manaDrainWizardry',
  MagicMushroomWizardry = 'magicMushroomWizardry',
}

export interface BuffInfo {
  type: BuffType;
  display: string;
  source: string;
  possibleValues: BuffSelectItem[] | NumberRange | undefined;
  canBeUsed: (state: TemplateBuilderState) => boolean;
}

export interface NumberRange {
  min: number;
  max: number;
  step: number;
}

export interface CharBuffValue {
  type: BuffType;
  value: number;
  active: boolean;
}

export interface BuffSelectItem {
  display: string;
  value: number;
}

export class Buffs {
  static GetBuffInfo(type: BuffType): BuffInfo {
    return BUFF_LIST.find((b) => b.type === type)!;
  }
}

export const FOOD_VALUES: BuffSelectItem[] = [
  { display: 'Normal', value: 0 },
  { display: 'Measly', value: 1 },
  { display: 'Bla', value: 2 },
  { display: 'Bla2', value: 3 },
  { display: 'Bla3', value: 4 },
  { display: 'Delectable', value: 5 },
];

export const GRIMOIRE_VALUES: BuffSelectItem[] = [
  { display: 'Level 1', value: 1 },
  { display: 'Level 2', value: 2 },
  { display: 'Level 3', value: 3 },
];

export const BUFF_LIST: BuffInfo[] = [
  {
    type: BuffType.FoodManaReg,
    display: 'Food Mana Regen Double Chance',
    possibleValues: FOOD_VALUES,
    source: 'food',
    canBeUsed: () => true,
  },
  {
    type: BuffType.FoodSwingSpeed,
    display: 'Food Swing Speed Increase',
    possibleValues: FOOD_VALUES,
    source: 'food',
    canBeUsed: () => true,
  },
  {
    type: BuffType.ActiveMeditation,
    display: 'Active Meditation',
    possibleValues: undefined,
    source: 'meditation',
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.Meditation)?.value ?? 0) > 0,
  },
  {
    type: BuffType.ManaDrainWizardry,
    display: 'Mana Drain Wizardry Refund Chance',
    possibleValues: GRIMOIRE_VALUES,
    source: 'wizardGrimoire',
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.Magery)?.value ?? 0) > 80,
  },
  {
    type: BuffType.MagicMushroomWizardry,
    display: 'Magic Mushroom Bonus Mana',
    possibleValues: GRIMOIRE_VALUES,
    source: 'wizardGrimoire',
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.Magery)?.value ?? 0) > 80,
  },
];
