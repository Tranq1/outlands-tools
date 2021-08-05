export enum MaterialTier {
  Normal = 0,
  Dull = 1,
  Shadow = 2,
  Copper = 3,
  Bronze = 4,
  Golden = 5,
  Rose = 6,
  Vere = 7,
  Vale = 8,
  Avar = 9,
}

export enum MagicTier {
  Regular = 0,
  Potent = 1,
  Surpassingly = 2,
  Eminently = 3,
  Exceedingly = 4,
  Supremely = 5,
}

export enum PowerType {
  Regular,
  Magic,
  Crafted,
}

export enum ItemType {
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
  itemType: ItemType;
  powerType: PowerType;
  materialTier: MaterialTier;
  isExceptional: boolean;
}

export interface Weapon extends BaseEquipment {
  accuracyTier: MagicTier;
  damageTier: MagicTier;
  slayerTier: SlayerTier;
}

export interface Armor extends BaseEquipment {
  protectionTier: MagicTier;
}

export interface Spellbook extends BaseEquipment {
  potencyTier: MagicTier;
  damageTier: MagicTier;
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