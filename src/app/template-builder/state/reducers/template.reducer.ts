import { Action, createReducer, on } from '@ngrx/store';


export const templateFeatureKey = 'template';

export interface State {
    skills: []
}

export const initialState: State = {
    skills: []
};


export const reducer = createReducer(
  initialState,

);

