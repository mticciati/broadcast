import {FETCH_BROADCASTS} from '../actions/types';

export default (state = [], action) => {
  switch(action.type) {
    case FETCH_BROADCASTS:
      return action.payload;
    default:
      return state;
  }
}