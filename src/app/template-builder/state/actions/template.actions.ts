import { createAction, props } from '@ngrx/store';
import { Skill as Skill } from 'src/app/data/skills.enum';
import { TemplateSkill } from 'src/app/interfaces/skill';

export const addSkillAction = createAction(
  '[Template Skill] Add Skill',
  props<{ skill: TemplateSkill }>()
);
export const removeSkillAction = createAction(
  '[Template Skill] Remove Skill',
  props<{ skill: Skill }>()
);
export const updateSkillValueAction = createAction(
  '[Template Skill] Update Skill',
  props<{ skill: Skill, value: number }>()
);
