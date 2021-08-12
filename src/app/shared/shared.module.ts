import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../modules/material.module';
import { UiCardComponent } from './ui-card/ui-card.component';

const MODULES = [ReactiveFormsModule, FormsModule, MaterialModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES, UiCardComponent],
  declarations: [UiCardComponent],
  providers: [],
})
export class SharedModule {}
