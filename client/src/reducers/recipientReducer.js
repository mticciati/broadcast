import {SAVE_RECIPIENT} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case SAVE_RECIPIENT:
      return action.payload;
    default: 
      return state;
  }
}