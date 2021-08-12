export enum AspectType {
  Air = 'air',
  Artisan = 'artisan',
  Blood = 'blood',
  Command = 'command',
  Earth = 'earth',
  Fortune = 'fortune',
  Lyric = 'lyric',
  Poison = 'poison',
  Shadow = 'shadow',
  Water = 'water',
  Fire = 'fire',
  Void = 'void',
  Eldritch = 'eldritch',
}

export enum AspectSlot {
  Armor = 'armor',
  Weapon = 'weapon',
  Spellbook = 'spellbook',
}

export interface Aspect {
  type: AspectType | null;
  level: number;
}

export type CharAspect = {
  [loc in AspectSlot]: Aspect;
};
