import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import {
  Buffs,
  BuffSelectItem,
  BuffType,
  BUFF_LIST,
  NumberRange,
} from 'src/app/interfaces/buffs';
import { SubSink } from 'subsink';
import {
  addBuffAction,
  removeBuffAction,
  updateBuffAction,
} from '../state/actions/template.actions';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-buff-picker',
  templateUrl: './buff-picker.component.html',
  styleUrls: ['./buff-picker.component.scss'],
})
export class BuffPickerComponent implements OnInit {
  readonly form = this.fb.group({ buffType: [], value: [] });
  readonly filterControl = this.fb.control('');
  readonly subsink = new SubSink();
  readonly pickedBuffs$ = this.store.pipe(
    select(selectTemplateState),
    select((s) => s.buffs),
    map((buffs) =>
      buffs.map((b) => ({
        ...b,
        info: Buffs.GetBuffInfo(b.type),
      }))
    ),
    tap((x) => console.log(x))
  );

  readonly pickedBuffPossibleValues$ = this.form
    .get('buffType')!
    .valueChanges.pipe(
      map((type) => (!!type ? Buffs.GetBuffInfo(type).possibleValues : null))
    );
  readonly pickedBuffPossibleValuesAsArray$: Observable<
    BuffSelectItem[] | null
  > = this.pickedBuffPossibleValues$.pipe(
    map((possibleValues) =>
      Array.isArray(possibleValues) ? possibleValues : null
    )
  );
  readonly pickedBuffPossibleValuesAsNumberRange$: Observable<NumberRange | null> =
    this.pickedBuffPossibleValues$.pipe(
      map((possibleValues) =>
        !Array.isArray(possibleValues) ? (possibleValues as NumberRange) : null
      )
    );

  readonly pickableBuffs$ = combineLatest([
    this.pickedBuffs$,
    this.filterControl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([pickedBuffs, filter]) =>
      BUFF_LIST.filter(
        (allBuffs) =>
          (filter.length === 0 ||
            allBuffs.display.toLowerCase().includes(filter.toLowerCase())) &&
          !pickedBuffs.find((picked) => picked.type === allBuffs.type)
      )
    )
  );

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add(
      this.form
        .get('buffType')!
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe(() =>
          this.form.patchValue({ value: null }, { emitEvent: false })
        )
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  addClicked() {
    const newValue: { value: number; buffType: BuffType } = this.form.value;
    if (!newValue.buffType) return;
    this.store.dispatch(addBuffAction(newValue));
    this.form.patchValue({ type: null }, { emitEvent: false });
  }

  onRemoveClicked(buffType: BuffType) {
    this.store.dispatch(removeBuffAction({ buffType }));
  }

  updateBuffValue(buffType: BuffType, value: number) {
    this.store.dispatch(updateBuffAction({ buffType, newValue: value }));
  }
}
