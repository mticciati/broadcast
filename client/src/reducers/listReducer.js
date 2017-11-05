import {SAVE_LIST, FETCH_LIST, SET_LIST, UNSET_LIST, ADD_RECIPIENT_TO_LIST} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case SAVE_LIST:
    case FETCH_LIST:
    case SET_LIST:
    case ADD_RECIPIENT_TO_LIST:
      return action.payload;
    case UNSET_LIST:
      return null;
    default:
      return state;
  }
}