import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CalculationFormula } from 'src/app/calculator/calculation.model';
import { Skill } from 'src/app/data/skills.enum';
import { AspectType } from 'src/app/interfaces/aspect';
import { Buffs, BuffType } from 'src/app/interfaces/buffs';
import { selectCalculationState } from '../state/reducers/calculation.reducer';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-mana-calculator',
  templateUrl: './mana-calculator.component.html',
  styleUrls: ['./mana-calculator.component.scss'],
})
export class ManaCalculatorComponent implements OnInit {
  readonly manaCalculation$ = this.store.pipe(
    select(selectCalculationState),
    select((s) => s.manaCalculation)
  );
  readonly manaCalculationPanels$: Observable<CalculationFormula[]> = of([
    {
      defaultValue: 0,
      isAffected: true,
      formula: 'some formula',
      label: 'Mana regen tick rate',
      valueNumber: 0.6,
      valueUnit: 's / tick',
      children: [
        {
          defaultValue: 2,
          isAffected: false,
          formula: 'some formula',
          label: 'Base mana tick rate',
          valueNumber: 2,
          valueUnit: 's / tick',
          sources: ['meditation'],
        },
        {
          defaultValue: 1,
          isAffected: false,
          formula: '1 * meditation / 100',
          label: 'Meditation tick rate bonus',
          valueNumber: 2,
          valueUnit: 's / tick',
          sources: ['test1'],
        },
      ],
    },
    {
      defaultValue: 0,
      isAffected: true,
      formula: 'some formula',
      label: 'Mana regen tick rate',
      valueNumber: 0.6,
      valueUnit: 's / tick',
      children: [
        {
          defaultValue: 2,
          isAffected: false,
          formula: 'some formula',
          label: 'Base mana tick rate',
          valueNumber: 2,
          valueUnit: 's / tick',
        },
        {
          defaultValue: 1,
          isAffected: false,
          formula: '1 * meditation / 100',
          label: 'Meditation tick rate bonus',
          valueNumber: 2,
          valueUnit: 's / tick',
        },
      ],
    },
  ]);

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
