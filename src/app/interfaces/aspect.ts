export enum AspectType {
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
