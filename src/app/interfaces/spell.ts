export enum Spell {
  Clumsy = 'clumsy',
  CreateFood = 'createFood',
  Feeblemind = 'feeblemind',
  Heal = 'heal',
  MagicArrow = 'magicArrow',
  NightSight = 'nightSight',
  ReactiveArmor = 'reactiveArmor',
  Weaken = 'weaken',
  Agility = 'agility',
  Cunning = 'cunning',
  Cure = 'cure',
  Harm = 'harm',
  MagicTrap = 'magicTrap',
  MagicUntrap = 'magicUntrap',
  Protection = 'protection',
  Strength = 'strength',
  Bless = 'bless',
  Fireball = 'fireball',
  MagicLock = 'magicLock',
  Poison = 'poison',
  Telekinesis = 'telekinesis',
  Teleport = 'teleport',
  Unlock = 'unlock',
  WallofStone = 'wallofStone',
  ArchCure = 'archCure',
  ArchProtection = 'archProtection',
  Curse = 'curse',
  FireField = 'fireField',
  GreaterHeal = 'greaterHeal',
  Lightning = 'lightning',
  ManaDrain = 'manaDrain',
  Recall = 'recall',
  BladeSpirits = 'bladeSpirits',
  DispelField = 'dispelField',
  Incognito = 'incognito',
  MagicReflection = 'magicReflection',
  MindBlast = 'mindBlast',
  Paralyze = 'paralyze',
  PoisonField = 'poisonField',
  SummonCreature = 'summonCreature',
  Dispel = 'dispel',
  EnergyBolt = 'energyBolt',
  Explosion = 'explosion',
  Invisibility = 'invisibility',
  Mark = 'mark',
  MassCurse = 'massCurse',
  ParalyzeField = 'paralyzeField',
  Reveal = 'reveal',
  ChainLightning = 'chainLightning',
  EnergyField = 'energyField',
  Flamestrike = 'flamestrike',
  GateTravel = 'gateTravel',
  ManaVampire = 'manaVampire',
  MassDispel = 'massDispel',
  MeteorSwarm = 'meteorSwarm',
  Polymorph = 'polymorph',
  Earthquake = 'earthquake',
  EnergyVortex = 'energyVortex',
  Resurrection = 'resurrection',
  SummonAirElemental = 'summonAirElemental',
  SummonDaemon = 'summonDaemon',
  SummonEarthElemental = 'summonEarthElemental',
  SummonFireElemental = 'summonFireElemental',
  SummonWaterElemental = 'summonWaterElemental',
}

export enum TargetType {
  Harmful,
  Neutral,
  Beneficial,
}

export enum SpellCategory {
  Damage,
  Buff,
  HealOrCure,
  Utility,
}

export interface SpellInfo {
  spell: Spell;
  circle: number;
  manaCost: number;
  targetType: TargetType;
  spellCategory: SpellCategory;
  castTime: number;
  damage?: { min: number; max: number };
}

export class Spells {
  static GetAllDamageSpells(): SpellInfo[] {
    return SPELLS.filter((s) => s.spellCategory === SpellCategory.Damage);
  }
}

export const SPELLS: SpellInfo[] = [
  // TODO
  {
    spell: Spell.Flamestrike,
    circle: 7,
    manaCost: 40,
    castTime: 2.5,
    spellCategory: SpellCategory.Damage,
    targetType: TargetType.Harmful,
    damage: { min: 95, max: 145 },
  },
];
