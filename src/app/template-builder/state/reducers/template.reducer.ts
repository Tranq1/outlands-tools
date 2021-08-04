import {
  Action,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { AspectType, CharAspect } from 'src/app/interfaces/aspect';
import { ActiveBuffValue, BuffType } from 'src/app/interfaces/buffs';
import { CharStats } from 'src/app/interfaces/char-stats';
import { TemplateSkill } from 'src/app/interfaces/skill';
import {
  addSkillAction,
  removeSkillAction,
  updateAspectsAction,
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
  aspects: {
    armor: { type: AspectType.None, level: 0 },
    weapon: { type: AspectType.None, level: 0 },
    spellbook: { type: AspectType.None, level: 0 },
  },
  buffs: [{ active: true, type: BuffType.FoodManaReg, value: 5 }],
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
  on(updateStatsAction, (state, { stats }) => ({ ...state, stats })),
  on(updateAspectsAction, (state, { aspects }) => ({ ...state, aspects }))
);

export const selectTemplateState =
  createFeatureSelector<TemplateBuilderState>(templateFeatureKey);

export const selectSkills = createSelector(
  selectTemplateState,
  (state) => state.skills
);
