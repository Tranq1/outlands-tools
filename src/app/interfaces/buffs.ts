export enum BuffType {
    FoodManaReg,
    FoodSwingSpeed,
    ActiveMeditation,
    ManaDrainWizardry,
    MagicMushroomWizardry
}

export interface BuffInfo {
  type: BuffType;
  display: string;
  source: string;
  possibleValues: number[] | NumberRange;
}

export interface NumberRange {
  min: number;
  max: number;
  step: number;
}

export interface ActiveBuffValue {
  type: BuffType;
  value: number;
  active: boolean;
}

export class Buffs {
  static GetBuffInfo(type: BuffType): BuffInfo {
    return BUFF_LIST.find((b) => b.type === type)!;
  }
}

const BUFF_LIST: BuffInfo[] = [
  {
    type: BuffType.FoodManaReg,
    display: 'Food Mana Regen Double Chance',
    possibleValues: [1, 2, 3, 4, 5],
    source: 'food',
  },
  {
    type: BuffType.FoodSwingSpeed,
    display: 'Food Swing Speed Increase',
    possibleValues: [1, 2, 3, 4, 5],
    source: 'food',
  },
  {
    type: BuffType.ActiveMeditation,
    display: 'Active Meditation',
    possibleValues: [0, 1],
    source: 'meditation',
  },
  {
    type: BuffType.ManaDrainWizardry,
    display: 'Mana Drain Wizardry Refund Chance',
    possibleValues: [0, 1, 2, 3],
    source: 'wizardGrimoire',
  },
  {
    type: BuffType.MagicMushroomWizardry,
    display: 'Magic Mushroom Bonus Mana',
    possibleValues: [0, 1, 2, 3],
    source: 'wizardGrimoire',
  },
];
