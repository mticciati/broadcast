import {FETCH_RECIPIENTS} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case FETCH_RECIPIENTS:
      return action.payload;
    default: 
      return state;
  }
}