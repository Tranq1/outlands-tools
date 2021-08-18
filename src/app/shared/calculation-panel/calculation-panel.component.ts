import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { CalculationFormula } from 'src/app/calculator/calculation.model';

@Component({
  selector: 'app-calculation-panel',
  templateUrl: './calculation-panel.component.html',
  styleUrls: ['./calculation-panel.component.scss'],
})
export class CalculationPanelComponent implements OnInit {
  private readonly formulaSubject = new ReplaySubject<CalculationFormula[]>(1);
  @Input()
  set formula(value: CalculationFormula[]) {
    console.log('set', value);
    this.formulaSubject.next(value);
  }
  readonly formulas$ = this.formulaSubject
    .asObservable()
    .pipe(tap(x => console.log(x)));

  constructor() {}

  ngOnInit(): void {}
}
