import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Skill } from 'src/app/data/skills.enum';
import { RootState } from 'src/app/store';
import { selectFeature as selectTemplate } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-mana-calculator',
  templateUrl: './mana-calculator.component.html',
  styleUrls: ['./mana-calculator.component.scss'],
})
export class ManaCalculatorComponent implements OnInit {
  readonly mediSkill$ = this.store.pipe(
    select(selectTemplate),
    map((t) => t.skills.find((s) => s.name == Skill.Meditation)?.value ?? 0)
  );
  readonly mediBaseManaRegFactor$ = this.mediSkill$.pipe(
    select((t) => 0.5 * (1 + t / 100))
  );

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}
}
