import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Skill } from 'src/app/data/skills.enum';
import { AspectType } from 'src/app/interfaces/aspect';
import { RootState } from 'src/app/store';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-mana-calculator',
  templateUrl: './mana-calculator.component.html',
  styleUrls: ['./mana-calculator.component.scss'],
})
export class ManaCalculatorComponent implements OnInit {
  readonly mediSkill$ = this.store.pipe(
    select(selectTemplateState),
    map((t) => t.skills.find((s) => s.name == Skill.Meditation)?.value ?? 0)
  );
  readonly mediBaseManaRegFactor$ = this.mediSkill$.pipe(
    select((skillValue) => 2 - skillValue / 100),
    tap(console.log)
  );
  readonly airAspectArmor$ = this.store.pipe(
    select(selectTemplateState),
    select((s) => s.aspects.armor),
    map((a) => (a.type == AspectType.Air ? a.level : 0))
  );
  readonly airAspectArmorBonus$ = this.airAspectArmor$.pipe(
    map((level) => (level === 0 ? 0 : 0.05 + level * 0.015))
  );
  readonly totalManaRegTicksPerSecond$ = combineLatest([
    this.mediBaseManaRegFactor$,
    this.airAspectArmorBonus$,
  ]).pipe(map(([baseManaReg, airAspectBonus]) => baseManaReg - airAspectBonus));

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}
}
