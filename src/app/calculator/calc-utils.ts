import { type } from 'os';
import { Skill } from '../data/skills.enum';
import { Aspect, AspectSlot, AspectType } from '../interfaces/aspect';
import { MasteryType } from '../interfaces/mastery';
import { TemplateBuilderState } from '../template-builder/state/reducers/template.reducer';

export class CalcUtils {
  public static getSkillOrZero(
    template: TemplateBuilderState,
    skill: Skill
  ): number {
    return template.skills.find((s) => s.name === skill)?.value ?? 0;
  }

  public static getAspectLevelOrZero(
    template: TemplateBuilderState,
    aspect: AspectType,
    aspectSlot: AspectSlot
  ): number {
    const aspectInSlot = template.aspects[aspectSlot];
    if (aspectInSlot && aspectInSlot.type === aspect) return aspectInSlot.level;
    return 0;
  }

  public static getMasteryChainValue(
    template: TemplateBuilderState,
    masteryType: MasteryType
  ): number {
    var mastery = template.masteries.find((m) => m.type === masteryType);
    return mastery?.value ?? 0;
  }
}
