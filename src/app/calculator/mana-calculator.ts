import { Skill } from '../data/skills.enum';
import { AspectSlot, AspectType } from '../interfaces/aspect';
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
  materialSpellbookBonusChance: number; // matLevel * 0.05 + (0.1 * exceptional)
  totalBonusChance: number; // sum of the above

  // Mana refund chance
  aspectManaRefundChance: number; // 0.015 * aspectSpellbookLevel
  manaDrainBonusRefundChance: number; // 0.05 + 0.05 * manaDrainLevel
  spellbookBonusRefundChance: number; // 0.05 * spellbookRefundLevel
  totalBaseRefundChance: number; // aspectChance + manaDrainChance + spellbookBonusChance
  totalEffectiveRefundChance: number; // (1 + totalChance) * (1 + totalChance^2)

  // Additional mana sources
  magicMushroomAverageExtraMana: number; // 25 / 60 * (4 - spellWizLevel)
  voidArmorBonusReg: number; // maxMana * (0.16 + 0.02 * aspectLevel) / 60
  totalAverageBonusMana: number; // sum of the above

  // 1 / (totalManaTickInterval * totalBonusChance * totalEffectiveRefundChance)
  // + totalAverageBonusMana * totalEffectiveRefundChance
  totalEffectiveMana: number;
}

export class ManaCalculator implements ManaCalculation {
  // Mana Regen Tick rate
  baseManaRegTickInterval!: number; // 2
  meditationTickRateFactor!: number; // 1 * meditation / 100
  airAspectArmorTickRateFactor!: number; // 0.05 + level * 0.015
  masteryChainMeditationRateFactor!: number; // up to 0.3
  totalManaTickInterval!: number; // base - meditation - airAspect - masteryChain

  // Bonus Regen per Tick
  baseFoodBonusChance!: number; // 0.05 * foodTier
  tasteIdAdditionalBonusChance!: number; // 0.25 * tasteId / 100
  materialSpellbookBonusChance!: number; // matLevel * 0.05 + (0.1 * exceptional)
  totalBonusChance!: number; // sum of the above

  // Mana refund chance
  aspectManaRefundChance!: number; // 0.015 * aspectSpellbookLevel
  manaDrainBonusRefundChance!: number; // 0.05 + 0.05 * manaDrainLevel
  spellbookBonusRefundChance!: number; // 0.05 * spellbookRefundLevel
  totalBaseRefundChance!: number; // aspectChance + manaDrainChance + spellbookBonusChance
  totalEffectiveRefundChance!: number; // (1 + totalChance) * (1 + totalChance^2)

  // Additional mana sources
  magicMushroomAverageExtraMana!: number; // 25 / 60 * (4 - spellWizLevel)
  voidArmorBonusReg!: number; // maxMana * (0.16 + 0.02 * aspectLevel) / 60
  totalAverageBonusMana!: number; // sum of the above

  // 1 / (totalManaTickInterval * totalBonusChance * totalEffectiveRefundChance)
  // + totalAverageBonusMana * totalEffectiveRefundChance
  totalEffectiveMana!: number;

  constructor(tmpl: TemplateBuilderState) {
    this.calculate(tmpl);
  }

  public calculate(tmpl: TemplateBuilderState) {
    this.calculateManaTickRate(tmpl);
    this.calculateBonusRegenPerTick(tmpl);
    this.calculateManaRefundChance(tmpl);
    this.calculateAdditionalManaSources(tmpl);
    this.calculateTotalEffectiveMana(tmpl);
  }
  private calculateManaTickRate(tmpl: TemplateBuilderState) {
    this.baseManaRegTickInterval = 2;
    const mediSkill = CalcUtils.getSkillOrZero(tmpl, Skill.Meditation);
    this.meditationTickRateFactor = mediSkill / 100;
    const airArmorLvl = CalcUtils.getAspectLevelOrZero(
      tmpl,
      AspectType.Air,
      AspectSlot.Spellbook
    );
    this.airAspectArmorTickRateFactor =
      airArmorLvl === 0 ? 0 : 0.05 + airArmorLvl * 0.015;
    this.masteryChainMeditationRateFactor = CalcUtils.getMasteryChainValue(
      tmpl,
      MasteryType.MeditationRate
    );
    this.totalManaTickInterval =
      this.baseManaRegTickInterval -
      this.meditationTickRateFactor -
      this.airAspectArmorTickRateFactor -
      this.masteryChainMeditationRateFactor;
  }

  calculateBonusRegenPerTick(tmpl: TemplateBuilderState) {
    throw new Error('Method not implemented.');
  }
  calculateManaRefundChance(tmpl: TemplateBuilderState) {
    throw new Error('Method not implemented.');
  }
  calculateAdditionalManaSources(tmpl: TemplateBuilderState) {
    throw new Error('Method not implemented.');
  }
  calculateTotalEffectiveMana(tmpl: TemplateBuilderState) {
    throw new Error('Method not implemented.');
  }
}
