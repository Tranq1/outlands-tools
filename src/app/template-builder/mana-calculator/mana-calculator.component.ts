import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalculationPanel } from 'src/app/calculator/calculation-panel.model';
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
  readonly manaCalculationPanels$: Observable<CalculationPanel[]> =
    this.store.pipe(
      select(selectCalculationState),
      select((s) => s.manaCalculation),
      map((state) => [
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
          valueNumber: state.totalEffectiveRefundBonus * 100,
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
        {
          label: 'Average mana from other sources',
          defaultValue: 0,
          valueNumber: state.totalAverageBonusMana,
          valueUnit: ' mana / s',
          formula:
            '<mushroom mana> + <void armor restore> - <mana drain spell cost>',
          sources: [
            BuffType.MagicMushroomWizardry,
            AspectType.Void + AspectSlot.Armor,
            BuffType.ManaDrainWizardry,
          ],
          children: [
            {
              label: 'Magic mushroom bonus',
              defaultValue: 0,
              valueNumber: state.magicMushroomBonusManaPerSecond,
              valueUnit: ' mana / s',
              formula: '25 / <mushroom consumption rate in s>',
              sources: [BuffType.MagicMushroomWizardry],
            },
            {
              label: 'Void armor mana restoration',
              defaultValue: 0,
              valueNumber: state.voidArmorBonusManaPerSecond,
              valueUnit: ' mana / s',
              formula: '16% + 2% * <void level> * <maximum mana>',
              sources: [AspectType.Void + AspectSlot.Armor],
            },
            {
              label: 'Mana drain spell cost',
              defaultValue: 0,
              valueNumber: state.manaDrainSpellCostPerSecond * -1,
              valueUnit: ' mana / s',
              formula: '11 mana / 60s',
              sources: [BuffType.ManaDrainWizardry],
            },
          ],
        },
        {
          label: 'Total effective mana',
          defaultValue: 0.5,
          valueNumber: state.totalEffectiveMana,
          valueUnit: ' mana / s',
          formula:
            '<total mana tick interval> * <total bonus chance> * <effective refund bonus> \n+ <average bonus mana> * <effective refund bonus>',
        },
      ])
    );

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
