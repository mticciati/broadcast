import {FILTER_LISTS} from '../actions/types';

export default (state = [], action) => {
  switch(action.type) {
    case FILTER_LISTS:
      return action.payload;
    default:
      return state;
  }
}
