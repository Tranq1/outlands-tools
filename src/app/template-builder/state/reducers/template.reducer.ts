import { Action, createReducer, on } from '@ngrx/store';
import { TemplateSkill } from 'src/app/interfaces/skill';
import { addSkillAction, removeSkillAction } from '../actions/template.actions';

export const templateFeatureKey = 'template';

export interface TemplateBuilderState {
  skills: TemplateSkill[];
}

export const initialState: TemplateBuilderState = {
  skills: [],
};

export const reducer = createReducer(
  initialState,
  on(addSkillAction, (state, { skill }) => ({
    ...state,
    skills: [...state.skills, skill],
  })),
  on(removeSkillAction, (state, { skillName }) => ({
    ...state,
    skills: state.skills.filter((skill) => skill.name != skillName),
  }))
);
