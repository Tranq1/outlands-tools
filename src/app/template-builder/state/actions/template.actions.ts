import { createAction, props } from '@ngrx/store';
import { Skill as Skill } from 'src/app/data/skills.enum';
import { CharAspect } from 'src/app/interfaces/aspect';
import { BuffType, CharBuffValue } from 'src/app/interfaces/buffs';
import { CharStats } from 'src/app/interfaces/char-stats';
import { CharMasteryEntry } from 'src/app/interfaces/mastery';
import { TemplateSkill } from 'src/app/interfaces/skill';

export const addSkillAction = createAction(
  '[Template Skill] Add Skill',
  props<{ skill: TemplateSkill }>()
);
export const removeSkillAction = createAction(
  '[Template Skill] Remove Skill',
  props<{ skillName: string }>()
);
export const updateSkillAction = createAction(
  '[Template Skill] Update Skill',
  props<{ skillName: string; newValue: number }>()
);
export const updateSkillValueAction = createAction(
  '[Template Skill] Update Skill',
  props<{ skill: Skill; value: number }>()
);
export const updateStatsAction = createAction(
  '[Template Stats] Update Stats',
  props<{ stats: CharStats }>()
);
export const updateAspectsAction = createAction(
  '[Template Aspects] Update Aspects',
  props<{ aspects: CharAspect }>()
);
export const addMasteryAction = createAction(
  '[Template Mastery] Add Mastery',
  props<{ mastery: CharMasteryEntry }>()
);
export const removeMasteryAction = createAction(
  '[Template Mastery] Remove Mastery',
  props<{ name: string }>()
);
export const updateMasteryAction = createAction(
  '[Template Mastery] Update Mastery',
  props<{ name: string; newValue: number }>()
);
export const addBuffAction = createAction(
  '[Template Buff] Add Buff',
  props<{ buffType: BuffType; value: number }>()
);
export const removeBuffAction = createAction(
  '[Template Buff] Remove Buff',
  props<{ buffType: BuffType }>()
);
export const setBuffActiveAction = createAction(
  '[Template Buff] Set Buff Active',
  props<{ buffType: BuffType }>()
);
export const updateBuffAction = createAction(
  '[Template Buff] Update Buff',
  props<{ buffType: BuffType; newValue: number }>()
);
