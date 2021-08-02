import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillPickerComponent } from './skill-picker/skill-picker.component';
import { StoreModule } from '@ngrx/store';
import * as fromTemplate from './state/reducers/template.reducer';
import { StatsPickerComponent } from './stats-picker/stats-picker.component';

@NgModule({
  declarations: [SkillPickerComponent, StatsPickerComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
        fromTemplate.templateFeatureKey,
        fromTemplate.reducer
    ),
  ],
  exports: [SkillPickerComponent],
})
export class TemplateBuilderModule {}