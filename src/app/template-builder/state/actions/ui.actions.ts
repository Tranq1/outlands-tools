import { createAction, props } from '@ngrx/store';

export const setHoverHighlight = createAction(
  '[UI] Set hover higlight',
  props<{ highlightOn: string[] }>()
);
