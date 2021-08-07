import { createAction, props } from '@ngrx/store';
import { CalculationState } from '../reducers/calculation.reducer';
import { TemplateBuilderState } from '../reducers/template.reducer';

export const recalculateAction = createAction('[Calculate] Recalculate');
export const recalculationFinishedAction = createAction(
  '[Calculate] Recalculation Finished',
  props<{ calculationState: CalculationState }>()
);
