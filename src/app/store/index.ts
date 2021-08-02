import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { TemplateBuilderState } from '../template-builder/state/reducers/template.reducer';
import * as fromTemplate from '../template-builder/state/reducers/template.reducer';

export interface RootState {
    template: TemplateBuilderState
}

export const reducers: ActionReducerMap<RootState> = {
    template: fromTemplate.reducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
