import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

const MODULES = [ReactiveFormsModule];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
  providers: [],
})
export class SharedModule {}
