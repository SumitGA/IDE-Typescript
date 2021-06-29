import { combineReducers } from 'redux';
import cellsReducer from './cellReducers';
import bundlesReducer from './bundlesReducers';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
