import { Skill } from '../data/skills.enum';
import { AspectSlot, AspectType } from '../interfaces/aspect';
import { Buffs, BuffType } from '../interfaces/buffs';
import { EquipmentType, PowerType } from '../interfaces/equipment';
import { MasteryType } from '../interfaces/mastery';
import { TemplateBuilderState } from '../template-builder/state/reducers/template.reducer';
import { CalcUtils } from './calc-utils';

export interface ManaCalculation {
  // Mana Regen Tick rate
  baseManaRegTickInterval: number; // 2
  meditationTickRateFactor: number; // 1 * meditation / 100
  airAspectArmorTickRateFactor: number; // 0.05 + level * 0.015
  masteryChainMeditationRateFactor: number; // up to 0.3
  totalManaTickInterval: number; // base - meditation - airAspect - masteryChain

  // Bonus Regen per Tick
  baseFoodBonusChance: number; // 0.05 * foodTier
  tasteIdAdditionalBonusChance: number; // 0.25 * tasteId / 100
  totalFoodBonusChance: number; // baseFoodBonusChance + tasteIdAdditionalBonusChance
  materialSpellbookBonusTickChance: number; // matLevel * 0.05 + (0.1 * exceptional)
  totalBonusChance: number; // sum of the above

  // Mana refund chance
  aspectManaRefundChance: number; // 0.015 * aspectSpellbookLevel
  manaDrainBonusRefundChance: number; // 0.05 + 0.05 * manaDrainLevel
  spellbookBonusRefundChance: number; // 0.05 * spellbookRefundLevel
  totalBaseRefundChance: number; // aspectChance + manaDrainChance + spellbookBonusChance
  totalEffectiveRefundBonus: number; // (1 + totalChance) * (1 + totalChance^2)

  // Additional mana sources
  magicMushroomBonusManaPerSecond: number; // 25 / 60 * (4 - spellWizLevel)
  voidArmorBonusManaPerSecond: number; // maxMana * (0.16 + 0.02 * aspectLevel) / 60
  manaDrainSpellCostPerSecond: number; // 11 / 60 assuming casting one mana drain spell every minute
  totalAverageBonusMana: number; // sum of the above

  // 1 / (totalManaTickInterval * totalBonusChance * totalEffectiveRefundChance)
  // + totalAverageBonusMana * totalEffectiveRefundChance
  totalEffectiveMana: number;
}

export const MANA_CALCULATION_DEFAULT: ManaCalculation = {
  baseManaRegTickInterval: 2,
  meditationTickRateFactor: 0,
  airAspectArmorTickRateFactor: 0,
  masteryChainMeditationRateFactor: 0,
  totalManaTickInterval: 0,

  baseFoodBonusChance: 0,
  tasteIdAdditionalBonusChance: 0,
  totalFoodBonusChance: 0,
  materialSpellbookBonusTickChance: 0,
  totalBonusChance: 0,

  aspectManaRefundChance: 0,
  manaDrainBonusRefundChance: 0,
  spellbookBonusRefundChance: 0,
  totalBaseRefundChance: 0,
  totalEffectiveRefundBonus: 0,

  magicMushroomBonusManaPerSecond: 0,
  voidArmorBonusManaPerSecond: 0,
  manaDrainSpellCostPerSecond: 0,
  totalAverageBonusMana: 0,

  totalEffectiveMana: 0,
};

export class ManaCalculator implements ManaCalculation {
  // Mana Regen Tick rate
  baseManaRegTickInterval: number = 2; // 2
  meditationTickRateFactor: number = 0; // 1 * meditation / 100
  airAspectArmorTickRateFactor: number = 0; // 0.05 + level * 0.015
  masteryChainMeditationRateFactor: number = 0; // up to 0.3
  totalManaTickInterval: number = 0; // base - meditation - airAspect - masteryChain

  // Bonus Regen per Tick
  baseFoodBonusChance: number = 0; // 0.05 * foodTier
  tasteIdAdditionalBonusChance: number = 0; // 0.25 * tasteId / 100
  totalFoodBonusChance: number = 0; // baseFoodBonusChance + tasteIdAdditionalBonusChance
  materialSpellbookBonusTickChance: number = 0; // matLevel * 0.05 + (0.1 * exceptional)
  totalBonusChance: number = 0; // sum of the above

  // Mana refund chance
  aspectManaRefundChance: number = 0; // 0.015 * aspectSpellbookLevel
  manaDrainBonusRefundChance: number = 0; // 0.05 + 0.05 * manaDrainLevel
  spellbookBonusRefundChance: number = 0; // 0.05 * spellbookRefundLevel
  totalBaseRefundChance: number = 0; // aspectChance + manaDrainChance + spellbookBonusChance
  totalEffectiveRefundBonus: number = 0; // (1 + totalChance) * (1 + totalChance^2)

  // Additional mana sources
  magicMushroomBonusManaPerSecond = 0; // 25 / 60 * (4 - spellWizLevel)
  voidArmorBonusManaPerSecond = 0; // maxMana * (0.16 + 0.02 * aspectLevel) / 60
  manaDrainSpellCostPerSecond = 0; // 11 / 60 assuming casting one mana drain spell every minute
  totalAverageBonusMana: number = 0; // sum of the above

  // 1 / (totalManaTickInterval * totalBonusChance * totalEffectiveRefundChance)
  // + totalAverageBonusMana * totalEffectiveRefundChance
  totalEffectiveMana: number = 0;

  constructor(tmpl: TemplateBuilderState) {
    this.calculate(tmpl);
  }

  public calculate(tmpl: TemplateBuilderState) {
    this.calculateManaTickRate(tmpl);
    this.calculateBonusRegenPerTick(tmpl);
    this.calculateManaRefundChance(tmpl);
    this.calculateAdditionalManaSources(tmpl);
    this.calculateTotalEffectiveMana();
  }

  private calculateManaTickRate(tmpl: TemplateBuilderState) {
    this.baseManaRegTickInterval = 2;
    const mediSkill = CalcUtils.getSkillValue(tmpl, Skill.Meditation) ?? 0;
    this.meditationTickRateFactor = mediSkill / 100;

    const airArmorLvl =
      CalcUtils.getAspectLevel(tmpl, AspectSlot.Armor, AspectType.Air) ?? 0;
    this.airAspectArmorTickRateFactor =
      airArmorLvl === 0 ? 0 : 0.05 + airArmorLvl * 0.015;

    this.masteryChainMeditationRateFactor =
      (CalcUtils.getMasteryChainValue(tmpl, MasteryType.MeditationRate) ?? 0) /
      100;

    this.totalManaTickInterval =
      this.baseManaRegTickInterval -
      this.meditationTickRateFactor -
      this.airAspectArmorTickRateFactor -
      this.masteryChainMeditationRateFactor;
  }

  calculateBonusRegenPerTick(tmpl: TemplateBuilderState) {
    const foodLevel = CalcUtils.getBuffValue(tmpl, BuffType.FoodManaReg) ?? 0;
    this.baseFoodBonusChance = 0.05 * foodLevel;

    const tasteIdSkill = CalcUtils.getSkillValue(tmpl, Skill.TasteId) ?? 0;
    this.tasteIdAdditionalBonusChance = (0.25 * tasteIdSkill) / 100;
    this.totalFoodBonusChance =
      this.baseFoodBonusChance + this.tasteIdAdditionalBonusChance;

    const spellbook = CalcUtils.getSpellbook(tmpl);
    if (spellbook && spellbook.powerType == PowerType.Crafted) {
      const spellbookMatTier = spellbook.materialTier ?? 0;
      const exceptionalBonus = spellbook.isExceptional ? 0.1 : 0;
      this.materialSpellbookBonusTickChance =
        spellbookMatTier * 0.05 + exceptionalBonus;
    }

    this.totalBonusChance =
      this.baseFoodBonusChance +
      this.tasteIdAdditionalBonusChance +
      this.materialSpellbookBonusTickChance;
  }

  calculateManaRefundChance(tmpl: TemplateBuilderState) {
    const aspectSpellbookLevel =
      CalcUtils.getAspectLevel(tmpl, AspectSlot.Spellbook) ?? 0;
    this.aspectManaRefundChance = 0.015 * aspectSpellbookLevel;

    const manaDrainBuff = CalcUtils.getBuffValue(
      tmpl,
      BuffType.ManaDrainWizardry
    );
    if (manaDrainBuff && manaDrainBuff > 0)
      this.manaDrainBonusRefundChance = 0.05 + 0.05 * manaDrainBuff;

    const spellbook = CalcUtils.getSpellbook(tmpl);
    if (spellbook && spellbook.powerType === PowerType.Magic) {
      this.spellbookBonusRefundChance = spellbook.potencyTier * 0.05;
    }

    this.totalBaseRefundChance = Math.min(
      50,
      this.aspectManaRefundChance +
        this.manaDrainBonusRefundChance +
        this.spellbookBonusRefundChance
    );

    this.totalEffectiveRefundBonus =
      this.totalBaseRefundChance === 0
        ? 0
        : (1 + this.totalBaseRefundChance) *
            (1 + Math.pow(this.totalBaseRefundChance, 2)) -
          1;
  }

  calculateAdditionalManaSources(tmpl: TemplateBuilderState) {
    const magicMushroomBuffLevel = CalcUtils.getBuffValue(
      tmpl,
      BuffType.MagicMushroomWizardry
    );
    if (magicMushroomBuffLevel)
      this.magicMushroomBonusManaPerSecond =
        (25 / 60) * (4 - magicMushroomBuffLevel);

    const voidArmor = CalcUtils.getAspectLevel(
      tmpl,
      AspectSlot.Armor,
      AspectType.Void
    );
    const maxMana = tmpl.stats.int;
    if (voidArmor)
      this.voidArmorBonusManaPerSecond =
        (maxMana * (0.16 + 0.02 * voidArmor)) / 60;

    const manaDrainBuff = CalcUtils.getBuffValue(
      tmpl,
      BuffType.ManaDrainWizardry
    );
    if (manaDrainBuff && manaDrainBuff > 0)
      this.manaDrainSpellCostPerSecond = 11 / 60;

    this.totalAverageBonusMana =
      this.magicMushroomBonusManaPerSecond +
      this.voidArmorBonusManaPerSecond -
      this.manaDrainSpellCostPerSecond;
  }

  calculateTotalEffectiveMana() {
    console.log(
      this.totalManaTickInterval,
      this.totalBonusChance,
      this.totalEffectiveRefundBonus
    );
    this.totalEffectiveMana =
      (1 / this.totalManaTickInterval) *
        (1 + this.totalBonusChance) *
        (1 + this.totalEffectiveRefundBonus) +
      this.totalAverageBonusMana * this.totalEffectiveRefundBonus;
  }
}
