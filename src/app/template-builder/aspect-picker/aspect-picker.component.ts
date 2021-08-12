import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, tap } from 'rxjs/operators';
import { AspectType } from 'src/app/interfaces/aspect';
import { SubSink } from 'subsink';
import { updateAspectsAction } from '../state/actions/template.actions';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-aspect-picker',
  templateUrl: './aspect-picker.component.html',
  styleUrls: ['./aspect-picker.component.scss'],
})
export class AspectPickerComponent implements OnInit, OnDestroy {
  readonly subsink = new SubSink();
  readonly allAspectsForm = this.fb.group({ type: [], level: 0 });
  readonly allAspectsChanged$ = this.allAspectsForm.valueChanges;

  public readonly aspectForm = this.fb.group({
    armor: this.fb.group({ type: [], level: 0 }),
    weapon: this.fb.group({ type: [], level: 0 }),
    spellbook: this.fb.group({ type: [], level: 0 }),
  });

  readonly pickedAspects$ = this.store.pipe(
    select(selectTemplateState),
    select((s) => s.aspects)
  );

  readonly aspectChanged$ = this.aspectForm.valueChanges.pipe();

  readonly aspectList = Object.entries(AspectType).map(([display, value]) => ({
    value,
    display,
  }));

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add(
      this.pickedAspects$.subscribe((a) =>
        this.aspectForm.setValue(a, { emitEvent: false })
      ),
      this.aspectChanged$.subscribe((aspects) =>
        this.store.dispatch(updateAspectsAction({ aspects }))
      ),
      this.allAspectsChanged$.subscribe(
        (v: { type: string; level: number }) => {
          this.allAspectsForm.patchValue({ type: null }, { emitEvent: false });
          this.aspectForm.patchValue({
            armor: { type: v.type, level: v.level },
            weapon: { type: v.type, level: v.level },
            spellbook: { type: v.type, level: v.level },
          });
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
