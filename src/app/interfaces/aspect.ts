export enum AspectType {
  None,
  Air,
  Artisan,
  Blood,
  Command,
  Earth,
  Fortune,
  Lyric,
  Poison,
  Shadow,
  Water,
  Fire,
  Void,
  Eldritch,
}

export enum AspectSlot {
  Armor = 'armor',
  Weapon = 'weapon',
  Spellbook = 'spellbook',
}

export interface Aspect {
  type: AspectType;
  level: number;
}

export type CharAspect = {
    [loc in AspectSlot]: Aspect | null;
};
