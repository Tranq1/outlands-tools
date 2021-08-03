export enum BuffType {
  FoodManaReg,
  FoodSwingSpeed,
  ActiveMeditation,
}

export interface BuffInfo {
  type: BuffType;
  display: string;
  source: string;
  possibleValues: number[] | NumberRange;
  bonus: (value: number) => number;
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

  static GetBuffBonus(activeBuff: ActiveBuffValue): number {
    var buff = this.GetBuffInfo(activeBuff.type);
    return buff.bonus(activeBuff.value);
  }
}

const BUFF_LIST: BuffInfo[] = [
  {
    type: BuffType.FoodManaReg,
    bonus: (tier) => 0.05 * tier,
    display: 'Food Mana Regen Double Chance',
    possibleValues: [1, 2, 3, 4, 5],
    source: 'food',
  },
  {
    type: BuffType.FoodSwingSpeed,
    bonus: (tier) => 0.01 * tier,
    display: 'Food Swing Speed Increase',
    possibleValues: [1, 2, 3, 4, 5],
    source: 'food',
  },
  {
    type: BuffType.ActiveMeditation,
    bonus: (active) => 1 + active * 1,
    display: 'Active Meditation',
    possibleValues: [0, 1],
    source: 'meditation',
  },
];
