import { createFeatureSelector, createReducer } from '@ngrx/store';

export const uiFeatureKey = 'ui';

export interface UIState {
  hoverSource: string | null;
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
  hoverSource: null,
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

export const reducer = createReducer(initialState);

export const selectUiState = createFeatureSelector(uiFeatureKey);
