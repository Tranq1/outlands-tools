import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { Skill } from 'src/app/data/skills.enum';
import { TemplateSkill } from 'src/app/interfaces/skill';
import { combineLatest, Observable, Subject } from 'rxjs';
import { RootState } from 'src/app/store';
import { SubSink } from 'subsink';
import {
  addSkillAction,
  removeSkillAction,
} from '../state/actions/template.actions';

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

  readonly pickedSkills$: Observable<TemplateSkill[]> = this.store.select(
    (s) => s.template.skills
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

  constructor(private fb: FormBuilder, private store: Store<RootState>) {}

  ngOnInit(): void {
    this.subsink.add(
      this.addSkillSubject.asObservable().subscribe((pickedSkill) => {
        console.log(pickedSkill);
        this.form.get('pickedSkill')?.setValue(null, { emitEvent: false });
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
