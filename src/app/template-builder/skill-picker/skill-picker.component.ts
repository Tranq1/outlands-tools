import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { Skill } from 'src/app/data/skills.enum';
import { TemplateSkill } from 'src/app/interfaces/skill';
import { SubSink } from 'subsink';
import {
  addSkillAction,
  removeSkillAction,
} from '../state/actions/template.actions';
import { selectSkills } from '../state/reducers/template.reducer';

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

  readonly pickableSkills$ = this.pickedSkills$.pipe(
    map((picked) =>
      this.GetSkillEntries().filter(
        (s) => !picked?.find((p) => p.name == s.key)
      )
    ),
    share()
  );

  readonly addSkillSubject = new Subject<TemplateSkill>();

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add(
      this.addSkillSubject.asObservable().subscribe((pickedSkill) => {
        this.form.patchValue({ name: null }, { emitEvent: false });
        this.store.dispatch(
          addSkillAction({
            skill: {
              display: Skill[pickedSkill.name as keyof typeof Skill],
              name: pickedSkill.name,
              value: pickedSkill.value,
            },
          })
        );
      })
    );
  }

  ngOnDestroy(): void {}

  public onAddClicked(): void {
    this.addSkillSubject.next(this.form.value);
  }

  public onRemoveClicked(skillName: string): void {
    this.store.dispatch(removeSkillAction({ skillName }));
  }

  private GetSkillEntries(): { key: string; display: string }[] {
    return Object.entries(Skill).map(([key, display]) => ({ key, display }));
  }
}
