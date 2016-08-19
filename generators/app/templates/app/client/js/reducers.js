import { SOMETHING } from './action-creators';

export function something(state = [], action) {
  if (action.type === SOMETHING) {
    return [ ...state, action.payload ];
  }

  return state;
}
