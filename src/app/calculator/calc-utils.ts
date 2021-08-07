import { Skill } from '../data/skills.enum';
import { AspectSlot, AspectType } from '../interfaces/aspect';
import { BuffType } from '../interfaces/buffs';
import { Spellbook, Weapon } from '../interfaces/equipment';
import { MasteryType } from '../interfaces/mastery';
import { TemplateBuilderState } from '../template-builder/state/reducers/template.reducer';

export class CalcUtils {
  public static getSkillValue(
    template: TemplateBuilderState,
    skill: Skill
  ): number | undefined {
    return template.skills.find((s) => s.name === skill)?.value ?? undefined;
  }

  public static getAspectLevel(
    template: TemplateBuilderState,
    aspectSlot: AspectSlot,
    aspect?: AspectType
  ): number | undefined {
    const aspectInSlot = template.aspects[aspectSlot];
    if (aspectInSlot && (!aspect || aspectInSlot.type === aspect))
      return aspectInSlot.level;
    return undefined;
  }

  public static getMasteryChainValue(
    template: TemplateBuilderState,
    masteryType: MasteryType
  ): number | undefined {
    var mastery = template.masteries.find((m) => m.type === masteryType);
    return mastery?.value ?? undefined;
  }

  static getBuffValue(
    template: TemplateBuilderState,
    buffType: BuffType
  ): number | undefined {
    var buff = template.buffs.find((b) => b.active && b.type === buffType);
    return buff?.value ?? 0;
  }

  static getWeapon(tmpl: TemplateBuilderState): Weapon | null {
    return tmpl.equipment.weapon;
  }

  static getSpellbook(tmpl: TemplateBuilderState): Spellbook | null {
    return tmpl.equipment.spellbook;
  }
}
