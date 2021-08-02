import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { Skill } from 'src/app/data/skills.enum';
import { TemplateSkill } from 'src/app/interfaces/skill';
import { Observable } from 'rxjs';
import { RootState } from 'src/app/store';
import { SubSink } from 'subsink';
import { addSkillAction } from '../state/actions/template.actions';

@Component({
  selector: 'app-skill-picker',
  templateUrl: './skill-picker.component.html',
  styleUrls: ['./skill-picker.component.scss'],
})
export class SkillPickerComponent implements OnInit, OnDestroy {
  readonly subsink = new SubSink();
  readonly form = this.fb.group({
    pickedSkill: null,
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

  readonly skillPicked$: Observable<Skill> = this.form
    .get('pickedSkill')!
    .valueChanges.pipe(distinctUntilChanged());

  constructor(private fb: FormBuilder, private store: Store<RootState>) {}

  ngOnInit(): void {
    this.subsink.add(
      this.skillPicked$.subscribe((pickedSkill) => {
        this.form.get('pickedSkill')?.setValue(null, { emitEvent: false });
        this.store.dispatch(
          addSkillAction({
            skill: {
              display: Skill[pickedSkill as keyof typeof Skill],
              name: pickedSkill,
              value: 100,
            },
          })
        );
      })
    );
  }

  ngOnDestroy(): void {}

  private GetSkillEntries(): { key: string; display: string }[] {
    return Object.entries(Skill).map(([key, display]) => ({ key, display }));
  }
}
