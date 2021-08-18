import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { UiCardComponent } from './ui-card/ui-card.component';
import { CalculationPanelComponent } from './calculation-panel/calculation-panel.component';
import { HighlightOnDirective } from './highlight-on.directive';
import { HoverHightlightDirective } from './hover-hightlight.directive';

const MODULES = [
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
  CommonModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [
    ...MODULES,
    UiCardComponent,
    CalculationPanelComponent,
    HighlightOnDirective,
    HoverHightlightDirective,
  ],
  declarations: [
    UiCardComponent,
    CalculationPanelComponent,
    HighlightOnDirective,
    HoverHightlightDirective,
  ],
  providers: [],
})
export class SharedModule {}
