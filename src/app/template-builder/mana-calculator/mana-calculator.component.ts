import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
