import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CalculationFormula } from 'src/app/calculator/calculation.model';
import { Skill } from 'src/app/data/skills.enum';
import { AspectSlot, AspectType } from 'src/app/interfaces/aspect';
import { Buffs, BuffType } from 'src/app/interfaces/buffs';
import { Masteries, MasteryType } from 'src/app/interfaces/mastery';
import {
  CalculationState,
  selectCalculationState,
} from '../state/reducers/calculation.reducer';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-mana-calculator',
  templateUrl: './mana-calculator.component.html',
  styleUrls: ['./mana-calculator.component.scss'],
})
export class ManaCalculatorComponent implements OnInit {
  readonly manaCalculationPanels$: Observable<CalculationFormula[]> =
    this.store.pipe(
      select(selectCalculationState),
      select((s) => s.manaCalculation),
      map(
        (state) =>
          [
            {
              defaultValue: 2,
              isAffected: state.totalManaTickInterval !== 2,
              formula:
                '<baseRegen> - <meditationBonus> - <airAspect> - <masteryChain meditation>',
              label: 'Mana regen tick rate',
              valueNumber: state.totalManaTickInterval,
              valueUnit: 's / tick',
              sources: [
                Skill.Meditation,
                AspectType.Air + AspectSlot.Armor,
                MasteryType.MeditationRate,
              ],
              children: [
                {
                  label: 'Base mana regen',
                  valueNumber: 2,
                  valueUnit: 's / tick',
                  defaultValue: 2,
                  isAffected: true,
                },
                {
                  label: 'Meditation tick rate bonus',
                  valueNumber: state.meditationTickRateFactor * 100,
                  valueUnit: '%',
                  defaultValue: 0,
                  isAffected: state.meditationTickRateFactor !== 0,
                  formula: '100% * <meditation> / 100',
                  sources: [Skill.Meditation],
                },
                {
                  label: 'Air Aspect armor bonus',
                  valueNumber: state.airAspectArmorTickRateFactor * 100,
                  valueUnit: '%',
                  defaultValue: 0,
                  isAffected: state.airAspectArmorTickRateFactor !== 0,
                  formula: '5% + <aspect level> * 1.5%',
                  sources: [AspectType.Air + AspectSlot.Armor],
                },
                {
                  label: 'Mastery chain bonus',
                  valueNumber: state.masteryChainMeditationRateFactor * 100,
                  valueUnit: '%',
                  defaultValue: 0,
                  isAffected: state.masteryChainMeditationRateFactor !== 0,
                  sources: [MasteryType.MeditationRate],
                },
              ],
            },
          ] as CalculationFormula[]
      )
    );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
