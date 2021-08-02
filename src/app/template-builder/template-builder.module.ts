import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillPickerComponent } from './skill-picker/skill-picker.component';
import { StoreModule } from '@ngrx/store';
import * as fromTemplate from './state/reducers/template.reducer';

@NgModule({
  declarations: [SkillPickerComponent],
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
