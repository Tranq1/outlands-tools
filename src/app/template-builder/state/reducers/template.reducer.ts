import {
  Action,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { AspectType, CharAspect } from 'src/app/interfaces/aspect';
import { CharBuffValue, BuffType } from 'src/app/interfaces/buffs';
import { CharStats } from 'src/app/interfaces/char-stats';
import { CharEquipment } from 'src/app/interfaces/equipment';
import { CharMasteryEntry } from 'src/app/interfaces/mastery';
import { TemplateSkill } from 'src/app/interfaces/skill';
import {
  addBuffAction,
  addMasteryAction,
  addSkillAction,
  removeBuffAction,
  removeMasteryAction,
  removeSkillAction,
  updateAspectsAction,
  updateBuffAction,
  updateMasteryAction,
  updateSkillAction,
  updateStatsAction,
} from '../actions/template.actions';

export const templateFeatureKey = 'template';

export interface TemplateBuilderState {
  skills: TemplateSkill[];
  stats: CharStats;
  aspects: CharAspect;
  buffs: CharBuffValue[];
  masteries: CharMasteryEntry[];
  equipment: CharEquipment;
}

export const initialState: TemplateBuilderState = {
  skills: [],
  stats: { str: 25, dex: 25, int: 25 },
  aspects: {
    armor: { type: null, level: 0 },
    weapon: { type: null, level: 0 },
    spellbook: { type: null, level: 0 },
  },
  buffs: [],
  masteries: [],
  equipment: { armor: null, instrument: null, spellbook: null, weapon: null },
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
  on(updateSkillAction, (state, { skillName, newValue }) => ({
    ...state,
    skills: state.skills.map((skill) =>
      skill.name !== skillName ? skill : { ...skill, value: newValue }
    ),
  })),
  on(updateStatsAction, (state, { stats }) => ({ ...state, stats })),
  on(updateAspectsAction, (state, { aspects }) => ({ ...state, aspects })),
  on(addMasteryAction, (state, { mastery }) => ({
    ...state,
    masteries: [...state.masteries, mastery],
  })),
  on(removeMasteryAction, (state, { name }) => ({
    ...state,
    masteries: state.masteries.filter((mastery) => mastery.type != name),
  })),
  on(updateMasteryAction, (state, { name, newValue }) => ({
    ...state,
    masteries: state.masteries.map((mastery) =>
      mastery.type !== name ? mastery : { ...mastery, value: newValue }
    ),
  })),
  on(addBuffAction, (state, { buffType, value }) => ({
    ...state,
    buffs: [...state.buffs, { active: true, type: buffType, value: value }],
  })),
  on(removeBuffAction, (state, { buffType }) => ({
    ...state,
    buffs: state.buffs.filter((buff) => buff.type != buffType),
  })),
  on(updateBuffAction, (state, { buffType, newValue }) => ({
    ...state,
    buffs: state.buffs.map((buff) =>
      buff.type !== buffType ? buff : { ...buff, value: newValue }
    ),
  }))
);

export const selectTemplateState =
  createFeatureSelector<TemplateBuilderState>(templateFeatureKey);

export const selectSkills = createSelector(
  selectTemplateState,
  (state) => state.skills
);
