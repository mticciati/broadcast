import {FILTER_RECIPIENTS} from '../actions/types';

export default (state = [], action) => {
  switch(action.type) {
    case FILTER_RECIPIENTS:
      return action.payload;
    default:
      return state;
  }
}