import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Skill } from 'src/app/data/skills.enum';
import { AspectType } from 'src/app/interfaces/aspect';
import { Buffs, BuffType } from 'src/app/interfaces/buffs';
import { RootState } from 'src/app/store';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-mana-calculator',
  templateUrl: './mana-calculator.component.html',
  styleUrls: ['./mana-calculator.component.scss'],
})
export class ManaCalculatorComponent implements OnInit {
  // Mana regen tick rate
  readonly mediSkill$ = this.store.pipe(
    select(selectTemplateState),
    map((t) => t.skills.find((s) => s.name == Skill.Meditation)?.value ?? 0)
  );
  readonly mediBaseManaRegFactor$ = this.mediSkill$.pipe(
    select((skillValue) => 2 - skillValue / 100),
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

  // Mana regen bonus ticks
  readonly tasteIdSkill$ = this.store.pipe(
    select(selectTemplateState),
    map((t) => t.skills.find((s) => s.name == Skill.TasteId)?.value ?? 0),
  );
  readonly foodBuff$ = this.store.pipe(
    select(selectTemplateState),
    select((s) => s.buffs),
    map((buffs) =>
      buffs.find((b) => b.active && b.type == BuffType.FoodManaReg)
    )
  );
  readonly foodBuffBonus$ = combineLatest([
    this.tasteIdSkill$,
    this.foodBuff$,
  ]).pipe(
    map(([tasteIdSkill, foodBuff]) => {
      if (foodBuff == null) return null;
      var buffBonus = Buffs.GetBuffBonus(foodBuff, tasteIdSkill);
      return buffBonus;
    })
  );
  readonly totalTickBonus$ = this.foodBuffBonus$.pipe();

  constructor(private store: Store<RootState>) {}

  ngOnInit(): void {}
}
