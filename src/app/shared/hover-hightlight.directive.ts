import { Directive, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { setHoverHighlight } from '../template-builder/state/actions/ui.actions';

@Directive({
  selector: '[appHoverHightlight]',
})
export class HoverHightlightDirective {
  @Input()
  appHoverHightlight: string[] = [];

  @HostListener('mouseenter')
  private mouseenter() {
    this.store.dispatch(setHoverHighlight({ highlightOn: this.appHoverHightlight }));
  }

  @HostListener('mouseleave')
  private mouseleave() {
    this.store.dispatch(setHoverHighlight({ highlightOn: [] }));
  }

  constructor(private store: Store) {}
}
