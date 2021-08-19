import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalculationFormula } from 'src/app/calculator/calculation.model';
import { Skill } from 'src/app/data/skills.enum';
import { AspectSlot, AspectType } from 'src/app/interfaces/aspect';
import { BuffType } from 'src/app/interfaces/buffs';
import { EquipmentType, PowerType } from 'src/app/interfaces/equipment';
import { MasteryType } from 'src/app/interfaces/mastery';
import { selectCalculationState } from '../state/reducers/calculation.reducer';

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
                  showAsAffected: true,
                },
                {
                  label: 'Meditation tick rate bonus',
                  valueNumber: state.meditationTickRateFactor * 100,
                  valueUnit: '%',
                  defaultValue: 0,
                  formula: '100% * <meditation> / 100',
                  sources: [Skill.Meditation],
                },
                {
                  label: 'Air Aspect armor bonus',
                  valueNumber: state.airAspectArmorTickRateFactor * 100,
                  valueUnit: '%',
                  defaultValue: 0,
                  formula: '5% + <aspect level> * 1.5%',
                  sources: [AspectType.Air + AspectSlot.Armor],
                },
                {
                  label: 'Mastery chain bonus',
                  valueNumber: state.masteryChainMeditationRateFactor * 100,
                  valueUnit: '%',
                  defaultValue: 0,
                  sources: [MasteryType.MeditationRate],
                },
              ],
            },
            {
              defaultValue: 0,
              valueNumber: state.totalBonusChance * 100,
              formula:
                '<base food chance> + <taste ID food bonus> + <material spellbook chance>',
              label: 'Average bonus regen per tick',
              valueUnit: '%',
              sources: [
                Skill.TasteId,
                BuffType.FoodManaReg,
                EquipmentType.Spellbook + PowerType.Crafted,
              ],
              children: [
                {
                  label: 'Plain food bonus chance',
                  defaultValue: 0,
                  valueNumber: state.baseFoodBonusChance * 100,
                  formula: '5% * <food level>',
                  valueUnit: '%',
                  sources: [BuffType.FoodManaReg],
                },
                {
                  label: 'Taste ID bonus chance',
                  defaultValue: 0,
                  valueNumber: state.tasteIdAdditionalBonusChance * 100,
                  formula: '25% * <taste ID> / 100',
                  valueUnit: '%',
                  sources: [Skill.TasteId],
                },
                {
                  label: 'Material spellbook bonus chance',
                  defaultValue: 0,
                  valueNumber: state.materialSpellbookBonusTickChance * 100,
                  formula: '25% * <taste ID> / 100',
                  valueUnit: '%',
                  sources: [EquipmentType.Spellbook + PowerType.Crafted],
                },
              ],
            },
            {
              label: 'Effective average mana refunded',
              defaultValue: 0,
              valueNumber: (state.totalEffectiveRefundChance) * 100,
              valueUnit: '%',
              formula:
                '<base refund chance> multiplied and added with itself because you have a chance to gain a refund on previously refunded mana again',
              sources: [
                EquipmentType.Spellbook + PowerType.Magic,
                BuffType.ManaDrainWizardry,
                AspectSlot.Spellbook,
              ],
              children: [
                {
                  label: 'Aspect refund chance',
                  defaultValue: 0,
                  valueNumber: state.aspectManaRefundChance * 100,
                  valueUnit: '%',
                  formula: '1.5% * <aspect level>',
                  sources: [AspectSlot.Spellbook],
                },
                {
                  label: 'Mana drain refund chance',
                  defaultValue: 0,
                  valueNumber: state.manaDrainBonusRefundChance * 100,
                  valueUnit: '%',
                  formula: '10% | 15% | 20%',
                  sources: [BuffType.ManaDrainWizardry],
                },
                {
                  label: 'Magic spellbook refund chance',
                  defaultValue: 0,
                  valueNumber: state.spellbookBonusRefundChance * 100,
                  valueUnit: '%',
                  formula: '5% * <spellbook potenty tier>',
                  sources: [EquipmentType.Spellbook + PowerType.Magic],
                },
                {
                  label: 'Total base refund chance',
                  defaultValue: 0,
                  valueNumber: state.totalBaseRefundChance * 100,
                  valueUnit: '%',
                  formula:
                    '<spect chance> + <mana drain chance> + <spellbook chance>',
                  sources: [EquipmentType.Spellbook + PowerType.Magic],
                },
              ],
            },
          ] as CalculationFormula[]
      )
    );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
