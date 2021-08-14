import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { ManaCalculator } from 'src/app/calculator/mana-calculator';
import { recalculationFinishedAction } from '../actions/calculation.actions';
import {
  addMasteryAction,
  addSkillAction,
  removeMasteryAction,
  removeSkillAction,
  updateAspectsAction,
  updateMasteryAction,
  updateSkillAction,
  updateSkillValueAction,
  updateStatsAction,
} from '../actions/template.actions';
import { CalculationState } from '../reducers/calculation.reducer';
import {
  selectTemplateState,
  TemplateBuilderState,
} from '../reducers/template.reducer';

@Injectable()
export class CalculationEffects {
  recalculate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        addSkillAction,
        removeSkillAction,
        updateSkillAction,
        updateSkillValueAction,
        updateStatsAction,
        updateAspectsAction,
        addMasteryAction,
        removeMasteryAction,
        updateMasteryAction
      ),
      withLatestFrom(this.store$.select(selectTemplateState)),
      map(([a, state]) =>
        recalculationFinishedAction({
          calculationState: this.recalculateFromState(state),
        })
      )
    )
  );

  constructor(private actions$: Actions, private store$: Store) {}

  private recalculateFromState(
    templateState: TemplateBuilderState
  ): CalculationState {
    const manaCalculater = new ManaCalculator(templateState);
    return { manaCalculation: manaCalculater };
  }
}
