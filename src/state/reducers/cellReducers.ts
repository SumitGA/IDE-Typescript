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
      const { direction } = action.payload;
      // grabbing the index of the cell to be moved
      const index = state.order.findIndex((id) => id === action.payload.id);
      // moving out cell before and after by swapping their indices
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      // Checking for boundry condition for index to be within array range
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return;
      }
      //actual swapping the content
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return;
    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      };
      //assigning new cell to state
      state.data[cell.id] = cell;
      const foundIndex = state.order.findIndex((id) => id === action.payload.id);
      //checking condition if index is not found then adding cell to the last of order array
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        //adding new cell before the current index of cell
        state.order.splice(foundIndex, 0, cell.id);
      }
      return;
    default:
      return;
  }
});

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;