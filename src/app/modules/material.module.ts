import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const MODULES = [
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatInputModule,
  MatExpansionModule,
  MatCardModule,
  NgxMatSelectSearchModule,
];

@NgModule({
  imports: [...MODULES],
  exports: [...MODULES],
  declarations: [],
  providers: [],
})
export class MaterialModule {}
