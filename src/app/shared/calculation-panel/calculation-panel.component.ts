import { Component, Input, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { CalculationPanel } from 'src/app/calculator/calculation-panel.model';

@Component({
  selector: 'app-calculation-panel',
  templateUrl: './calculation-panel.component.html',
  styleUrls: ['./calculation-panel.component.scss'],
})
export class CalculationPanelComponent implements OnInit {
  private readonly formulaSubject = new ReplaySubject<CalculationPanel[]>(1);
  @Input()
  set formula(value: CalculationPanel[]) {
    this.formulaSubject.next(value);
  }
  readonly formulas$ = this.formulaSubject.asObservable();

  constructor() {}

  ngOnInit(): void {}
}
