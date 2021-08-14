import { Action, createFeatureSelector, createReducer, on } from '@ngrx/store';
import { ManaCalculation, MANA_CALCULATION_DEFAULT } from '../../../calculator/mana-calculator';
import {
  recalculateAction,
  recalculationFinishedAction,
} from '../actions/calculation.actions';

export const calculationFeatureKey = 'calculation';

export interface CalculationState {
  manaCalculation: ManaCalculation;
}

export const initialState: CalculationState = {
  manaCalculation: MANA_CALCULATION_DEFAULT,
};

export const reducer = createReducer(
  initialState,
  on(
    recalculationFinishedAction,
    (state, { calculationState }) => calculationState!
  )
);

export const selectCalculationState = createFeatureSelector<CalculationState>(
  calculationFeatureKey
);
