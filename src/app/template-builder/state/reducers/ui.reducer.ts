import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { setHoverHighlight } from '../actions/ui.actions';

export const uiFeatureKey = 'ui';

export interface UIState {
  hoverSource: string[];
  showPickers: {
    skillStats: boolean;
    aspects: boolean;
    masteries: boolean;
    buffs: boolean;
    equipment: boolean;
  };
  showCalculators: {
    mana: boolean;
    spellDamage: boolean;
    swingSpeed: boolean;
    meleeDamage: boolean;
    misc: boolean;
  };
}

export const initialState: UIState = {
  hoverSource: [],
  showPickers: {
    aspects: true,
    buffs: true,
    equipment: true,
    masteries: true,
    skillStats: true,
  },
  showCalculators: {
    mana: true,
    meleeDamage: false,
    misc: true,
    spellDamage: true,
    swingSpeed: false,
  },
};

export const reducer = createReducer(
  initialState,
  on(setHoverHighlight, (state, { highlightOn }) => ({
    ...state,
    hoverSource: highlightOn,
  }))
);

export const selectUiState = createFeatureSelector<UIState>(uiFeatureKey);
