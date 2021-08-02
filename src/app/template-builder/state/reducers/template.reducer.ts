import {
  Action,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { CharAspect } from 'src/app/interfaces/aspect';
import { CharStats } from 'src/app/interfaces/char-stats';
import { TemplateSkill } from 'src/app/interfaces/skill';
import { addSkillAction, removeSkillAction } from '../actions/template.actions';

export const templateFeatureKey = 'template';

export interface TemplateBuilderState {
  skills: TemplateSkill[];
  stats: CharStats;
  aspects: CharAspect;
}

export const initialState: TemplateBuilderState = {
  skills: [],
  stats: { str: 25, dex: 25, int: 25 },
  aspects: { armor: undefined, spellbook: undefined, weapon: undefined },
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

export const selectFeature =
  createFeatureSelector<TemplateBuilderState>(templateFeatureKey);
export const selectSkills = createSelector(
  selectFeature,
  (state) => state.skills
);
