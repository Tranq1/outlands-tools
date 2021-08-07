import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillPickerComponent } from './skill-picker/skill-picker.component';
import { StoreModule } from '@ngrx/store';
import * as fromTemplate from './state/reducers/template.reducer';
import { StatsPickerComponent } from './stats-picker/stats-picker.component';
import { MaterialModule } from '../modules/material.module';
import { SharedModule } from '../modules/shared.module';
import { AspectPickerComponent } from './aspect-picker/aspect-picker.component';
import { MasteryPickerComponent } from './mastery-picker/mastery-picker.component';
import { EquipmentPickerComponent } from './equipment-picker/equipment-picker.component';
import { ManaCalculatorComponent } from './mana-calculator/mana-calculator.component';
import { BuffPickerComponent } from './buff-picker/buff-picker.component';
import * as fromCalc from './state/reducers/calculation.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CalculationEffects } from './state/effects/calculation.effects';

const EXPORTED_COMPONENTS = [
  SkillPickerComponent,
  StatsPickerComponent,
  AspectPickerComponent,
  MasteryPickerComponent,
  EquipmentPickerComponent,
  ManaCalculatorComponent,
  BuffPickerComponent,
];

@NgModule({
  declarations: [...EXPORTED_COMPONENTS],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTemplate.templateFeatureKey,
      fromTemplate.reducer
    ),
    StoreModule.forFeature(fromCalc.calculationFeatureKey, fromCalc.reducer),
    EffectsModule.forFeature([CalculationEffects]),
    MaterialModule,
    SharedModule,
  ],
  exports: [...EXPORTED_COMPONENTS],
})
export class TemplateBuilderModule {}
