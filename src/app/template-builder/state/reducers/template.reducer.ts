import {
  Action,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { CharAspect } from 'src/app/interfaces/aspect';
import { ActiveBuffValue } from 'src/app/interfaces/buffs';
import { CharStats } from 'src/app/interfaces/char-stats';
import { TemplateSkill } from 'src/app/interfaces/skill';
import {
  addSkillAction,
  removeSkillAction,
  updateStatsAction,
} from '../actions/template.actions';

export const templateFeatureKey = 'template';

export interface TemplateBuilderState {
  skills: TemplateSkill[];
  stats: CharStats;
  aspects: CharAspect;
  buffs: ActiveBuffValue[];
}

export const initialState: TemplateBuilderState = {
  skills: [],
  stats: { str: 25, dex: 25, int: 25 },
  aspects: { armor: null, spellbook: null, weapon: null },
  buffs: [],
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
  })),
  on(updateStatsAction, (state, { stats }) => ({ ...state, stats }))
);

export const selectTemplateState =
  createFeatureSelector<TemplateBuilderState>(templateFeatureKey);
export const selectSkills = createSelector(
  selectTemplateState,
  (state) => state.skills
);
