export enum Skill {
  //Combat
  Anatomy = 'anatomy',
  Archery = 'archery',
  Fencing = 'fencing',
  Healing = 'healing',
  MaceFighting = 'maceFighting',
  Parrying = 'parrying',
  Swordsmanship = 'swordsmanship',
  Tactics = 'tactics',
  Wrestling = 'wrestling',

  // Magic
  Meditation = 'meditation',
  Magery = 'magery',
  SpiritSpeak = 'spiritSpeak',
  EvalInt = 'evalInt',
  ResistSpells = 'resistSpells',

  // Bard
  Discordance = 'discordance',
  Musicianship = 'musicianship',
  Peacemaking = 'peacemaking',
  Provocation = 'provocation',

  // Thieving
  DetectHidden = 'detectHidden',
  Hiding = 'hiding',
  Lockpicking = 'lockpicking',
  Poisoning = 'poisoning',
  RemoveTrap = 'removeTrap',
  Snooping = 'snooping',
  Stealing = 'stealing',
  Stealth = 'stealth',

  // Trade
  Alchemy = 'alchemy',
  Blacksmithy = 'blacksmithy',
  Carpentry = 'carpentry',
  Cartography = 'cartography',
  Cooking = 'cooking',
  Fishing = 'fishing',
  Inscription = 'inscription',
  Lumberjacking = 'lumberjacking',
  Mining = 'mining',
  Tailoring = 'tailoring',
  Tinkering = 'tinkering',

  // Wilderness
  AnimalLore = 'animalLore',
  AnimalTaming = 'animalTaming',
  Camping = 'camping',
  ForensicEval = 'forensicEval',
  Herding = 'herding',
  Tracking = 'tracking',
  Veterinary = 'veterinary',

  // Misc
  ArmsLore = 'armsLore',
  Begging = 'begging',
  ItemId = 'itemId',
  TasteId = 'tasteId',
}

export enum SkillCategory {
  Combat = 'Combat',
  Magic = 'Magic',
  Bard = 'Bard',
  Thieving = 'Thieving',
  Trade = 'Trade',
  Wilderness = 'Wilderness',
  Misc = 'Misc',
}

const SKILLS: {
  [name in Skill]: SkillInfo;
} = {
  // Combat
  anatomy: { display: 'Anatomy', category: SkillCategory.Combat },
  archery: { display: 'Archery', category: SkillCategory.Combat },
  fencing: { display: 'Fencing', category: SkillCategory.Combat },
  healing: { display: 'Healing', category: SkillCategory.Combat },
  maceFighting: { display: 'Mace Fighting', category: SkillCategory.Combat },
  parrying: { display: 'Parrying', category: SkillCategory.Combat },
  swordsmanship: { display: 'Swordsmanship', category: SkillCategory.Combat },
  tactics: { display: 'Tactics', category: SkillCategory.Combat },
  wrestling: { display: 'Wrestling', category: SkillCategory.Combat },

  // Magic
  meditation: { display: 'Meditation', category: SkillCategory.Magic },
  magery: { display: 'Magery', category: SkillCategory.Magic },
  spiritSpeak: { display: 'Spirit Speak', category: SkillCategory.Magic },
  evalInt: {
    display: 'Evaluating Intelligence',
    category: SkillCategory.Magic,
  },
  resistSpells: { display: 'Resisting Spells', category: SkillCategory.Magic },

  // Bard
  discordance: { display: 'Discordance', category: SkillCategory.Bard },
  musicianship: { display: 'Musicianship', category: SkillCategory.Bard },
  peacemaking: { display: 'Peacemaking', category: SkillCategory.Bard },
  provocation: { display: 'Provocation', category: SkillCategory.Bard },

  // Thieving
  detectHidden: {
    display: 'Detecting Hidden',
    category: SkillCategory.Thieving,
  },
  hiding: { display: 'Hiding', category: SkillCategory.Thieving },
  lockpicking: { display: 'Lockpicking', category: SkillCategory.Thieving },
  poisoning: { display: 'Poisoning', category: SkillCategory.Thieving },
  removeTrap: { display: 'Remove Trap', category: SkillCategory.Thieving },
  snooping: { display: 'Snooping', category: SkillCategory.Thieving },
  stealing: { display: 'Stealing', category: SkillCategory.Thieving },
  stealth: { display: 'Stealth', category: SkillCategory.Thieving },

  // Trade
  alchemy: { display: 'Alchemy', category: SkillCategory.Trade },
  blacksmithy: { display: 'Blacksmithy', category: SkillCategory.Trade },
  carpentry: { display: 'Carpentry', category: SkillCategory.Trade },
  cartography: { display: 'Cartography', category: SkillCategory.Trade },
  cooking: { display: 'Cooking', category: SkillCategory.Trade },
  fishing: { display: 'Fishing', category: SkillCategory.Trade },
  inscription: { display: 'Inscription', category: SkillCategory.Trade },
  lumberjacking: { display: 'Lumberjacking', category: SkillCategory.Trade },
  mining: { display: 'Mining', category: SkillCategory.Trade },
  tailoring: { display: 'Tailoring', category: SkillCategory.Trade },
  tinkering: { display: 'Tinkering', category: SkillCategory.Trade },

  // Wilderness
  animalLore: { display: 'Animal Lore', category: SkillCategory.Wilderness },
  animalTaming: {
    display: 'Animal Taming',
    category: SkillCategory.Wilderness,
  },
  camping: { display: 'Camping', category: SkillCategory.Wilderness },
  forensicEval: {
    display: 'Forensic Evaluation',
    category: SkillCategory.Wilderness,
  },
  herding: { display: 'Herding', category: SkillCategory.Wilderness },
  tracking: { display: 'Tracking', category: SkillCategory.Wilderness },
  veterinary: { display: 'Veterinary', category: SkillCategory.Wilderness },

  // Misc
  armsLore: { display: 'Arms Lore', category: SkillCategory.Misc },
  begging: { display: 'Begging', category: SkillCategory.Misc },
  itemId: { display: 'Item Identification', category: SkillCategory.Misc },
  tasteId: { display: 'Taste Identification', category: SkillCategory.Misc },
};

export class Skills {
  public static GetGroupedSkillListForSelect(): SkillSelectGroup[] {
    var categories = Object.values(SkillCategory).map((c) => ({
      category: c,
      skills: this.GetSkillsForCategory(c),
    }));
    return categories;
  }

  public static GetSkillsForCategory(category: SkillCategory): SkillSelect[] {
    return Object.entries(SKILLS)
      .filter(([key, value]) => value.category === category)
      .map(([key, value]) => ({
        value: key as Skill,
        display: value.display,
        category: category,
      }));
  }

  public static GetSkillsForSelect(): SkillSelect[] {
    return Object.entries(SKILLS).map(([key, value]) => ({
      value: key as Skill,
      display: value.display,
      category: value.category,
    }));
  }

  public static GetSkillInfo(skill: Skill): SkillInfo {
    return SKILLS[skill];
  }
}

export interface SkillInfo {
  display: string;
  category: SkillCategory;
}

export interface SkillSelectGroup {
  category: SkillCategory;
  skills: SkillSelect[];
}

export interface SkillSelect {
  value: Skill;
  category: SkillCategory;
  display: string;
}
