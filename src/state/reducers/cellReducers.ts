import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      // We avoid returning the entire new object just replacing the required field which is //content in this case.
      const { id, content } = action.payload;

      // Using immer to simplify the complex spread operation done traditionally
      state.data[id].content = content;
      return;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter(id => id !== action.payload);
      return;
    case ActionType.MOVE_CELL:
      return state
    case ActionType.INSERT_CELL_BEFORE:
      return state
    default:
      return state;
  }
});

export default reducer;