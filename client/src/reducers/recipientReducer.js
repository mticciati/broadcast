import {SAVE_RECIPIENT, UPDATE_RECIPIENT, SET_RECIPIENT, UNSET_RECIPIENT} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case SAVE_RECIPIENT:
    case SET_RECIPIENT:
    case UPDATE_RECIPIENT:
      return action.payload;
    case UNSET_RECIPIENT:
      return null;
    default: 
      return state;
  }
}