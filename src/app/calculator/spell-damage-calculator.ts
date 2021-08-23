import { Skill } from '../data/skills.enum';
import { AspectSlot, AspectType } from '../interfaces/aspect';
import { BuffType } from '../interfaces/buffs';
import { PowerType } from '../interfaces/equipment';
import { Spell, SpellInfo, SPELLS } from '../interfaces/spell';
import { TemplateBuilderState } from '../template-builder/state/reducers/template.reducer';
import { CalcUtils } from './calc-utils';

export interface SpellDamageCalculation {
  currentSpell: SpellInfo;

  // Spell multiplicative damage
  magerySpellDamageMultiplier: number;
  evalIntSpellDamageMultiplier: number;

  // Spell additive Damage
  trackingAdditionalSpellDamage: number;
  campingAdditionalSpellDamage: number;
  inscriptionAdditionalSpellDamage: number;
  spellbookAdditionalSpellDamage: number;

  // Charged Spell Chance
  baseChargedSpellChance: number;
  baseChargedSpellMultiplier: number;
  effectiveAdditionalChargedSpellDamage: number;

  // Effective spell damage increase
  effectiveSpellDamageIncrease: number;

  // Additional Damage Sources
  averageFireAspectFlamestrikeBonusDamageForMin: number;
  averageFireAspectFlamestrikeBonusDamageForMax: number;
  averageFireAspectFlamestrikeBonusDamageForAverage: number;
  averageAspectProcBonusDamage: number;

  // Final damage for spell
  globalDamageMultiplier: number;
  finalDamageForSpellMin: number;
  finalDamageForSpellMax: number;
  finalDamageForSpellAverage: number;
}

export const SPELL_DAMAGE_CALC_DEFAULT: SpellDamageCalculation = {
  currentSpell: SPELLS[0],

  // Spell multiplicative damage
  magerySpellDamageMultiplier: 0,
  evalIntSpellDamageMultiplier: 0,

  // Spell additive Damage
  trackingAdditionalSpellDamage: 0,
  campingAdditionalSpellDamage: 0,
  inscriptionAdditionalSpellDamage: 0,
  spellbookAdditionalSpellDamage: 0,

  // Charged Spell Chance
  baseChargedSpellChance: 0,
  baseChargedSpellMultiplier: 0,
  effectiveAdditionalChargedSpellDamage: 0,

  // Effective spell damage increase
  effectiveSpellDamageIncrease: 0,

  // Additional Damage Sources
  averageFireAspectFlamestrikeBonusDamageForMin: 0,
  averageFireAspectFlamestrikeBonusDamageForMax: 0,
  averageFireAspectFlamestrikeBonusDamageForAverage: 0,
  averageAspectProcBonusDamage: 0,

  // Final damage for spell
  globalDamageMultiplier: 0,
  finalDamageForSpellMin: 0,
  finalDamageForSpellMax: 0,
  finalDamageForSpellAverage: 0,
};

export class SpellDamageCalculator implements SpellDamageCalculation {
  currentSpell = SPELLS[0];

  // Spell multiplicative damage
  magerySpellDamageMultiplier = 0;
  evalIntSpellDamageMultiplier = 0;

  // Spell additive Damage
  trackingAdditionalSpellDamage = 0;
  campingAdditionalSpellDamage = 0;
  inscriptionAdditionalSpellDamage = 0;
  spellbookAdditionalSpellDamage = 0;

  // Charged Spell Chance
  baseChargedSpellChance = 0;
  baseChargedSpellMultiplier = 0;
  effectiveAdditionalChargedSpellDamage = 0;

  // Effective spell damage increase
  effectiveSpellDamageIncrease = 0;

  // Additional Damage Sources
  averageFireAspectFlamestrikeBonusDamageForMin = 0;
  averageFireAspectFlamestrikeBonusDamageForMax = 0;
  averageFireAspectFlamestrikeBonusDamageForAverage = 0;
  averageAspectProcBonusDamage = 0;

  // Final damage for spell
  globalDamageMultiplier = 0;
  finalDamageForSpellMin = 0;
  finalDamageForSpellMax = 0;
  finalDamageForSpellAverage = 0;

  constructor(tmpl: TemplateBuilderState) {
    this.calculateSpellDamageMultipliers(tmpl);
    this.calculateAdditiveSpellDamage(tmpl);
    this.calculateChargedSpellDamage(tmpl);
    this.calculateEffectiveSpellDamageIncrease(tmpl);
    this.calculateAdditionalDamageSources(tmpl);
    this.calculateFinalDamageForSpell(tmpl);
  }

  calculateSpellDamageMultipliers(tmpl: TemplateBuilderState) {
    const magerySkill = CalcUtils.getSkillValue(tmpl, Skill.Magery) ?? 0;
    this.magerySpellDamageMultiplier = magerySkill / 100;

    const evalSkill = CalcUtils.getSkillValue(tmpl, Skill.EvalInt) ?? 0;
    this.evalIntSpellDamageMultiplier = 0.75 + (0.5 * evalSkill) / 100;
  }

  calculateAdditiveSpellDamage(tmpl: TemplateBuilderState) {
    const trackingSkill = CalcUtils.getSkillValue(tmpl, Skill.Tracking) ?? 0;
    this.trackingAdditionalSpellDamage = (0.25 * trackingSkill) / 100;
    const campingSkill = CalcUtils.getSkillValue(tmpl, Skill.Camping) ?? 0;
    this.campingAdditionalSpellDamage = (0.25 * campingSkill) / 100;
    const inscriptionSkill =
      CalcUtils.getSkillValue(tmpl, Skill.Inscription) ?? 0;
    this.inscriptionAdditionalSpellDamage = (0.25 * inscriptionSkill) / 100;
    const spellbook = CalcUtils.getSpellbook(tmpl);
    if (spellbook) {
      if (spellbook.powerType === PowerType.Crafted)
        this.spellbookAdditionalSpellDamage = spellbook.damageTier * 0.05;
      else
        this.spellbookAdditionalSpellDamage =
          spellbook.materialTier * 0.01 + (spellbook.isExceptional ? 0.1 : 0);
    }
  }

  calculateChargedSpellDamage(tmpl: TemplateBuilderState) {
    const mindBlastWizardryBuffValue = CalcUtils.getBuffValue(
      tmpl,
      BuffType.MindBlastWizardry
    );
    const mindBlastBonusCharge =
      this.currentSpell.spell === Spell.MindBlast && mindBlastWizardryBuffValue
        ? 0.1 + mindBlastWizardryBuffValue * 0.1
        : 0;
    const spiritStoneBonusChance = CalcUtils.getBuffValue(
      tmpl,
      BuffType.ActiveSpellSpiritStone
    ) ?? 0;
    this.baseChargedSpellChance = 0.1 + mindBlastBonusCharge;
    this.baseChargedSpellMultiplier = 0;
    this.effectiveAdditionalChargedSpellDamage = 0;
  }

  calculateEffectiveSpellDamageIncrease(tmpl: TemplateBuilderState) {}

  calculateAdditionalDamageSources(tmpl: TemplateBuilderState) {}

  calculateFinalDamageForSpell(tmpl: TemplateBuilderState) {}
}
