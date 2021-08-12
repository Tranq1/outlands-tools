import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Skill } from 'src/app/data/skills.enum';
import { AspectType } from 'src/app/interfaces/aspect';
import { Buffs, BuffType } from 'src/app/interfaces/buffs';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-mana-calculator',
  templateUrl: './mana-calculator.component.html',
  styleUrls: ['./mana-calculator.component.scss'],
})
export class ManaCalculatorComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
