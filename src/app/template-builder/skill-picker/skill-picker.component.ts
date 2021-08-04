import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
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

  readonly pickableSkills$: Observable<SkillSelectGroup[]> =
    this.pickedSkills$.pipe(
      map((picked) =>
        Skills.GetSkillsForSelect().filter(
          (s) => !picked?.find((p) => p.name == s.value)
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

  readonly addSkillSubject = new Subject<TemplateSkill>();

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add(
      this.addSkillSubject.asObservable().subscribe((pickedSkill) => {})
    );
  }

  ngOnDestroy(): void {}

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
}
