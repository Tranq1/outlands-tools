import { Skill } from '../data/skills.enum';
import { TemplateBuilderState } from '../template-builder/state/reducers/template.reducer';

export enum BuffType {
  // Food
  FoodManaReg = 'foodManaReg',
  FoodSwingSpeed = 'foodSwingSpeed',

  // Skills
  ActiveMeditation = 'activeMeditation',

  // Misc
  ActiveSpellSpiritStone = 'activeSpellSpiritStone',

  // Grimoire
  ManaDrainWizardry = 'manaDrainWizardry',
  MagicMushroomWizardry = 'magicMushroomWizardry',
  MindBlastWizardry = 'mindBlastWizardry',
}

export enum BuffCategory {
  Food = 'food',
  Skill = 'skill',
  WizardGrimoire = 'wizardGrimoire',
  SpiritStone = 'spiritStone',
}

export interface BuffInfo {
  type: BuffType;
  display: string;
  category: BuffCategory;
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
  { display: 'Delectable', value: 5 },
  { display: 'Appetizing', value: 4 },
  { display: 'Adequate', value: 3 },
  { display: 'Meager', value: 2 },
  { display: 'Paltry', value: 1 },
  { display: 'Measly', value: 0 },
];

export const GRIMOIRE_VALUES: BuffSelectItem[] = [
  { display: 'Level 1', value: 1 },
  { display: 'Level 2', value: 2 },
  { display: 'Level 3', value: 3 },
];

export const ACTIVE_INACTIVE: BuffSelectItem[] = [
  { display: 'Active', value: 1 },
  { display: 'Inactive', value: 0 },
];

export const BUFF_LIST: BuffInfo[] = [
  {
    type: BuffType.FoodManaReg,
    display: 'Food Mana Regen Double Chance',
    possibleValues: FOOD_VALUES,
    category: BuffCategory.Food,
    canBeUsed: () => true,
  },
  {
    type: BuffType.FoodSwingSpeed,
    display: 'Food Swing Speed Increase',
    possibleValues: FOOD_VALUES,
    category: BuffCategory.Food,
    canBeUsed: () => true,
  },
  {
    type: BuffType.ActiveMeditation,
    display: 'Active Meditation',
    possibleValues: ACTIVE_INACTIVE,
    category: BuffCategory.Skill,
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.Meditation)?.value ?? 0) > 0,
  },
  {
    type: BuffType.ManaDrainWizardry,
    display: 'Mana Drain Grimoire Upgrade',
    possibleValues: GRIMOIRE_VALUES,
    category: BuffCategory.WizardGrimoire,
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.Magery)?.value ?? 0) > 80,
  },
  {
    type: BuffType.MagicMushroomWizardry,
    display: 'Create Food Grimoire Upgrade',
    possibleValues: GRIMOIRE_VALUES,
    category: BuffCategory.WizardGrimoire,
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.Magery)?.value ?? 0) > 80,
  },
  {
    type: BuffType.MindBlastWizardry,
    display: 'Mind Blast Grimoire Upgrade',
    possibleValues: GRIMOIRE_VALUES,
    category: BuffCategory.WizardGrimoire,
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.Magery)?.value ?? 0) > 80,
  },
  {
    type: BuffType.ActiveSpellSpiritStone,
    display: 'Active Spell Spirit Stone',
    possibleValues: ACTIVE_INACTIVE,
    category: BuffCategory.WizardGrimoire,
    canBeUsed: (state) =>
      (state.skills.find((s) => s.name === Skill.SpiritSpeak)?.value ?? 0) > 80,
  },
];
