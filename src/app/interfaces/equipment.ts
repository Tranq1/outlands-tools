export enum MaterialTier {
  Avar = 9,
  Vale = 8,
  Vere = 7,
  Rose = 6,
  Golden = 5,
  Bronze = 4,
  Copper = 3,
  Shadow = 2,
  Dull = 1,
  Regular = 0,
}

export enum MagicTier {
  Regular = 0,
  Potent = 1,
  Surpassingly = 2,
  Eminently = 3,
  Exceedingly = 4,
  Supremely = 5,
}

export enum DamageTier {
  Regular = 0,
  Ruin = 1,
  Might = 2,
  Force = 3,
  Power = 4,
  Vanquishing = 5,
}

export enum PowerType {
  Regular = 'regular',
  Magic = 'magic',
  Crafted = 'crafted',
}

export enum EquipmentType {
  Weapon = 'weapon',
  Armor = 'armor',
  Spellbook = 'spellbook',
  Shield = 'shield',
  Instrument = 'instrument',
}

export enum SlayerTier {
  None = 0,
  Lesser = 1,
  Regular = 2,
  Greater = 3,
}

export interface BaseEquipment {
  itemType: EquipmentType;
  powerType: PowerType;
  materialTier: MaterialTier;
  isExceptional: boolean;
}

export interface Weapon extends BaseEquipment {
  accuracyTier: MagicTier;
  damageTier: DamageTier;
  slayerTier: SlayerTier;
}

export interface Armor extends BaseEquipment {
  protectionTier: MagicTier;
}

export interface Spellbook extends BaseEquipment {
  potencyTier: MagicTier;
  damageTier: DamageTier;
  slayerTier: SlayerTier;
}

export interface Instrument extends BaseEquipment {
  artistryTier: MagicTier;
  slayerTier: SlayerTier;
}

export interface CharEquipment {
  weapon: Weapon | null;
  armor: Armor | null;
  spellbook: Spellbook | null;
  instrument: Instrument | null;
}
