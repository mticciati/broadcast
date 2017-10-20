import {SAVE_BROADCAST} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case SAVE_BROADCAST:
      return action.payload;
    default: 
      return state;
  }
}