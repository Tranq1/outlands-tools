import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  share,
  startWith,
  tap,
} from 'rxjs/operators';
import {
  Skill,
  SkillCategory,
  Skills,
  SkillSelect,
  SkillSelectGroup,
} from 'src/app/data/skills.enum';
import { TemplateSkill } from 'src/app/interfaces/skill';
import { SubSink } from 'subsink';
import {
  addSkillAction,
  removeSkillAction,
  updateSkillAction,
} from '../state/actions/template.actions';
import { selectSkills } from '../state/reducers/template.reducer';
import groupBy from 'lodash-es/groupBy';

@Component({
  selector: 'app-skill-picker',
  templateUrl: './skill-picker.component.html',
  styleUrls: ['./skill-picker.component.scss'],
})
export class SkillPickerComponent implements OnInit, OnDestroy {
  readonly subsink = new SubSink();
  readonly form = this.fb.group({
    name: null,
    value: 100,
  });

  readonly pickedSkills$: Observable<TemplateSkill[]> = this.store.pipe(
    select(selectSkills)
  );

  readonly filterControl = this.fb.control([]);
  readonly pickableSkills$: Observable<SkillSelectGroup[]> = combineLatest([
    this.pickedSkills$,
    this.filterControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([pickedSkills, filter]) =>
      Skills.GetSkillsForSelect().filter(
        (allSkills) =>
          (filter.length === 0 ||
            allSkills.display.toLowerCase().includes(filter.toLowerCase())) &&
          !pickedSkills?.find((p) => p.name == allSkills.value)
      )
    ),
    map((s) =>
      Object.entries(groupBy(s, 'category')).map(([cat, skills]) => ({
        category: cat as SkillCategory,
        skills,
      }))
    ),
    share()
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  public onAddClicked(): void {
    var skill = this.form.get('name')?.value;
    if (skill == null) return;
    var pickedSkill = Skills.GetSkillInfo(skill);
    this.store.dispatch(
      addSkillAction({
        skill: {
          display: pickedSkill.display,
          name: skill,
          value: this.form.get('value')!.value,
        },
      })
    );
    this.form.patchValue({ name: null }, { emitEvent: false });
  }

  public onRemoveClicked(skillName: string): void {
    this.store.dispatch(removeSkillAction({ skillName }));
  }

  public updateSkillValue(skillName: string, newValue: number) {
    this.store.dispatch(updateSkillAction({ skillName, newValue }));
  }
}
