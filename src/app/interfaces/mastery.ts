export enum MasteryType {
  MeleeAccuracy = 'meleeAccuracy',
  MeleeDefense = 'meleeDefense',
  MeleeDamage = 'meleeDamage',
  MeleeSpecialChance = 'meleeSpecialChance',
  MeleeSwingSpeed = 'meleeSwingSpeed',
  MeleeIgnoreArmorChance = 'meleeIgnoreArmorChance',
  MeleeAspectWeaponEffectModifier = 'meleeAspectWeaponEffectModifier',
  MeleeAspectWeaponEffectChance = 'meleeAspectWeaponEffectChance',
  SpellDamage = 'spellDamage',
  SpellChargedChance = 'spellChargedChance',
  SpellChargedDamage = 'spellChargedDamage',
  SpellIgnoreResistChance = 'spellIgnoreResistChance',
  MeditationRate = 'meditationRate',
  SpellDisruptionAvoidanceChance = 'spellDisruptionAvoidanceChance',
  SpellbookAspectEffectModifier = 'spellbookAspectEffectModifier',
  SpellbookAspectEffectChance = 'spellbookAspectEffectChance',
  DamagetoBeastialCreatures = 'damagetoBeastialCreatures',
  DamagetoConstructCreatures = 'damagetoConstructCreatures',
  DamagetoDaemonicCreatures = 'damagetoDaemonicCreatures',
  DamagetoElementalCreatures = 'damagetoElementalCreatures',
  DamagetoHumanoidCreatures = 'damagetoHumanoidCreatures',
  DamagetoMonstrousCreatures = 'damagetoMonstrousCreatures',
  DamagetoNatureCreatures = 'damagetoNatureCreatures',
  DamagetoUndeadCreatures = 'damagetoUndeadCreatures',
  FollowerDamage = 'followerDamage',
  DamagedtoBardedCreatures = 'damagedtoBardedCreatures',
  DamagetoPoisonedCreatures = 'damagetoPoisonedCreatures',
  PoisonDamage = 'poisonDamage',
  BackstabDamage = 'backstabDamage',
  TrapandWandDamage = 'trapandWandDamage',
  DamagetoBosses = 'damagetoBosses',
  DamageonShips = 'damageonShips',
  ShipCannonDamage = 'shipCannonDamage',
  DamagetoCreaturesAbove66HP = 'damagetoCreaturesAbove66HP',
  DamagetoCreaturesBelow33HP = 'damagetoCreaturesBelow33HP',
  PhysicalDamageResistance = 'physicalDamageResistance',
  SpellDamageResistance = 'spellDamageResistance',
  FollowerDamageResistance = 'followerDamageResistance',
  EffectiveParryingSkill = 'effectiveParryingSkill',
  EffectiveMagicResistSkill = 'effectiveMagicResistSkill',
  HealingAmountsReceived = 'healingAmountsReceived',
  FollowerHealingReceived = 'followerHealingReceived',
  BossDamageResistance = 'bossDamageResistance',
  DamageResistanceonShips = 'damageResistanceonShips',
  EffectiveAlchemySkill = 'effectiveAlchemySkill',
  EffectiveLockpickingSkill = 'effectiveLockpickingSkill',
  EffectivePoisoningSkill = 'effectivePoisoningSkill',
  EffectiveBardingSkill = 'effectiveBardingSkill',
  BardingDuration = 'bardingDuration',
  SummonDurationandDispelResist = 'summonDurationandDispelResist',
  Chancefor5BonusStealthSteps = 'chancefor5BonusStealthSteps',
  GoldDropIncrease = 'goldDropIncrease',
  SpecialLootChance = 'specialLootChance',
  RareLootChance = 'rareLootChance',
}

export interface CharMasteryEntry {
  type: MasteryType;
  value: number;
}

export type MasteryInfo = {
  [entry in MasteryType]: { display: string; values: number[] };
};

const x: MasteryInfo = {
  meleeAccuracy: { display: 'Melee Accuracy', values: [1.0, 1.25, 1.5] },
  meleeDefense: { display: 'Melee Defense', values: [2.0, 2.5, 3.0] },
  meleeDamage: { display: 'Melee Damage', values: [1.0, 1.25, 1.5] },
  meleeSpecialChance: {
    display: 'Melee Special Chance',
    values: [1.0, 1.25, 1.5],
  },
  meleeSwingSpeed: {
    display: 'Melee Swing Speed',
    values: [1.0, 1.25, 1.5],
  },
  meleeIgnoreArmorChance: {
    display: 'Melee Ignore Armor Chance',
    values: [3.0, 3.75, 4.5],
  },
  meleeAspectWeaponEffectModifier: {
    display: 'Melee Aspect Weapon Effect Modifier',
    values: [5.0, 6.25, 7.5],
  },
  meleeAspectWeaponEffectChance: {
    display: 'Melee Aspect Weapon Effect Chance',
    values: [5.0, 6.25, 7.5],
  },
  spellDamage: { display: 'Spell Damage', values: [1.0, 1.25, 1.5] },
  spellChargedChance: {
    display: 'Spell Charged Chance',
    values: [1.0, 1.25, 1.5],
  },
  spellChargedDamage: {
    display: 'Spell Charged Damage',
    values: [2.0, 2.5, 3.0],
  },
  spellIgnoreResistChance: {
    display: 'Spell Ignore Resist Chance',
    values: [3.0, 3.75, 4.5],
  },
  meditationRate: { display: 'Meditation Rate', values: [2.0, 2.5, 3.0] },
  spellDisruptionAvoidanceChance: {
    display: 'Spell Disruption Avoidance Chance',
    values: [5.0, 6.25, 7.5],
  },
  spellbookAspectEffectModifier: {
    display: 'Spellbook Aspect Effect Modifier',
    values: [5.0, 6.25, 7.5],
  },
  spellbookAspectEffectChance: {
    display: 'Spellbook Aspect Effect Chance',
    values: [5.0, 6.25, 7.5],
  },
  damagetoBeastialCreatures: {
    display: 'Damage to Beastial Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoConstructCreatures: {
    display: 'Damage to Construct Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoDaemonicCreatures: {
    display: 'Damage to Daemonic Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoElementalCreatures: {
    display: 'Damage to Elemental Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoHumanoidCreatures: {
    display: 'Damage to Humanoid Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoMonstrousCreatures: {
    display: 'Damage to Monstrous Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoNatureCreatures: {
    display: 'Damage to Nature Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoUndeadCreatures: {
    display: 'Damage to Undead Creatures',
    values: [2.0, 2.5, 3.0],
  },
  followerDamage: { display: 'Follower Damage', values: [2.0, 2.5, 3.0] },
  damagedtoBardedCreatures: {
    display: 'Damaged to Barded Creatures',
    values: [2.0, 2.5, 3.0],
  },
  damagetoPoisonedCreatures: {
    display: 'Damage to Poisoned Creatures',
    values: [2.0, 2.5, 3.0],
  },
  poisonDamage: { display: 'Poison Damage', values: [2.0, 2.5, 3.0] },
  backstabDamage: { display: 'Backstab Damage', values: [2.0, 2.5, 3.0] },
  trapandWandDamage: {
    display: 'Trap and Wand Damage',
    values: [4.0, 5.0, 6.0],
  },
  damagetoBosses: { display: 'Damage to Bosses', values: [3.0, 3.75, 4.5] },
  damageonShips: { display: 'Damage on Ships', values: [3.0, 3.75, 4.5] },
  shipCannonDamage: {
    display: 'Ship Cannon Damage',
    values: [2.0, 2.5, 3.0],
  },
  damagetoCreaturesAbove66HP: {
    display: 'Damage to Creatures Above 66 HP',
    values: [2.0, 2.5, 3.0],
  },
  damagetoCreaturesBelow33HP: {
    display: 'Damage to Creatures Below 33 HP',
    values: [2.0, 2.5, 3.0],
  },
  physicalDamageResistance: {
    display: 'Physical Damage Resistance',
    values: [1.0, 1.25, 1.5],
  },
  spellDamageResistance: {
    display: 'Spell Damage Resistance',
    values: [1.0, 1.25, 1.5],
  },
  followerDamageResistance: {
    display: 'Follower Damage Resistance',
    values: [2.0, 2.5, 3.0],
  },
  effectiveParryingSkill: {
    display: 'Effective Parrying Skill',
    values: [3.0, 3.75, 4.5],
  },
  effectiveMagicResistSkill: {
    display: 'Effective Magic Resist Skill',
    values: [3.0, 3.75, 4.5],
  },
  healingAmountsReceived: {
    display: 'Healing Amounts Received',
    values: [3.0, 3.75, 4.5],
  },
  followerHealingReceived: {
    display: 'Follower Healing Received',
    values: [3.0, 3.75, 4.5],
  },
  bossDamageResistance: {
    display: 'Boss Damage Resistance',
    values: [2.0, 2.5, 3.0],
  },
  damageResistanceonShips: {
    display: 'Damage Resistance on Ships',
    values: [3.0, 3.75, 4.5],
  },
  effectiveAlchemySkill: {
    display: 'Effective Alchemy Skill',
    values: [3.0, 3.75, 4.5],
  },
  effectiveLockpickingSkill: {
    display: 'Effective Lockpicking Skill',
    values: [3.0, 3.75, 4.5],
  },
  effectivePoisoningSkill: {
    display: 'Effective Poisoning Skill',
    values: [3.0, 3.75, 4.5],
  },
  effectiveBardingSkill: {
    display: 'Effective Barding Skill',
    values: [3.0, 3.75, 4.5],
  },
  bardingDuration: { display: 'Barding Duration', values: [3.0, 3.75, 4.5] },
  summonDurationandDispelResist: {
    display: 'Summon Duration and Dispel Resist',
    values: [3.0, 3.75, 4.5],
  },
  chancefor5BonusStealthSteps: {
    display: 'Chance for 5 Bonus Stealth Steps',
    values: [3.0, 3.75, 4.5],
  },
  goldDropIncrease: {
    display: 'Gold Drop Increase',
    values: [1.0, 1.5, 2.0],
  },
  specialLootChance: {
    display: 'Special Loot Chance',
    values: [1.0, 1.5, 2.0],
  },
  rareLootChance: { display: 'Rare Loot Chance', values: [1.0, 1.5, 2.0] },
};
