import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { defer, EMPTY, empty, Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { selectUiState } from '../template-builder/state/reducers/ui.reducer';
import { intersection } from 'lodash-es';

@Directive({
  selector: '[appHighlightOn]',
})
export class HighlightOnDirective implements OnInit, OnDestroy {
  private readonly subsink = new SubSink();

  @Input()
  appHighlightOn: string[] = [];

  readonly triggerHoverEffect$: Observable<boolean> = this.store.pipe(
    select(selectUiState),
    select((s) => s.hoverSource),
    map((sources) => intersection(sources, this.appHighlightOn).length > 0)
  );

  constructor(
    private store: Store,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.el.nativeElement.style.transition = 'all 0.5s ease-out';
    this.el.nativeElement.style.transitionProperty = 'box-shadow background-color';
    this.subsink.add(
      this.triggerHoverEffect$.subscribe((shouldHighlight) =>
        this.highlight(shouldHighlight)
      )
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  highlight(shouldHighlight: boolean) {
    if (shouldHighlight) {
      this.el.nativeElement.style.backgroundColor = '#ff7171';
      this.el.nativeElement.style.boxShadow = '0 0 10px 8px #ff7171';
    } else {
        this.el.nativeElement.style.backgroundColor = null;
        this.el.nativeElement.style.boxShadow = null;
    }
  }
}
