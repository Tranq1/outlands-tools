import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { selectTemplateState } from '../state/reducers/template.reducer';
import { map, startWith, take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import {
  CharMasteryEntry,
  Masteries,
  MasteryType,
} from 'src/app/interfaces/mastery';
import { combineLatest, Subject } from 'rxjs';
import {
  addMasteryAction,
  removeMasteryAction,
  updateMasteryAction,
} from '../state/actions/template.actions';

@Component({
  selector: 'app-mastery-picker',
  templateUrl: './mastery-picker.component.html',
  styleUrls: ['./mastery-picker.component.scss'],
})
export class MasteryPickerComponent implements OnInit, OnDestroy {
  readonly subsink = new SubSink();
  readonly pickedMasteryItems$ = this.store.pipe(
    select(selectTemplateState),
    select((s) => s.masteries),
    map((masteries) =>
      masteries.map((m) => ({
        ...m,
        display: Masteries.GetDisplayName(m.type),
      }))
    )
  );

  readonly formItemsArray = this.fb.array([]);
  readonly form = this.fb.group({ type: [], value: [] });

  readonly filterControl = this.fb.control('');
  readonly pickableMasteries$ = combineLatest([
    this.pickedMasteryItems$,
    this.filterControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([pickedItems, filter]) =>
      Masteries.GetSelectItems().filter(
        (allItems) =>
          (filter.length === 0 ||
            allItems.display.toLowerCase().includes(filter.toLowerCase())) &&
          !pickedItems.find((picked) => picked.type === allItems.value)
      )
    )
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add();
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  addClicked() {
    const newValue = this.form.value as CharMasteryEntry;
    if (!newValue.type || newValue.value <= 0) return;
    this.store.dispatch(addMasteryAction({ mastery: newValue }));
    this.form.patchValue({ type: null }, { emitEvent: false });
  }

  onRemoveClicked(name: string) {
    console.log('remove', name);
    this.store.dispatch(removeMasteryAction({ name }));
  }

  updateMasteryValue(type: MasteryType, value: number) {
    this.store.dispatch(updateMasteryAction({ name: type, newValue: value }));
  }
}
