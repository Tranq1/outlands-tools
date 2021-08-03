import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { updateStatsAction } from '../state/actions/template.actions';
import { selectTemplateState } from '../state/reducers/template.reducer';

@Component({
  selector: 'app-stats-picker',
  templateUrl: './stats-picker.component.html',
  styleUrls: ['./stats-picker.component.scss'],
})
export class StatsPickerComponent implements OnInit, OnDestroy {
  readonly subsink = new SubSink();
  readonly form = this.fb.group({
    str: [0, [Validators.min(10), Validators.max(125)]],
    dex: [0, [Validators.min(10), Validators.max(125)]],
    int: [0, [Validators.min(10), Validators.max(125)]],
  });

  readonly charStats$ = this.store.pipe(
    select(selectTemplateState),
    select((s) => s.stats)
  );
  readonly statsChanged$ = this.form.valueChanges.pipe(debounceTime(1000));

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.subsink.add(
      this.charStats$.subscribe((s) =>
        this.form.setValue(s, { emitEvent: false })
      ),
      this.statsChanged$.subscribe((stats) =>
        this.store.dispatch(updateStatsAction({ stats }))
      )
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
