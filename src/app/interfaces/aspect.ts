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

export interface Aspect {
  type: AspectType;
  level: number;
}

export interface CharAspect {
  armor?: Aspect;
  weapon?: Aspect;
  spellbook?: Aspect;
}
