import {CREATE_RECIPIENT} from '../actions/types';

export default (state = null, action) => {
  switch(action.type) {
    case CREATE_RECIPIENT:
      return action.payload;
    default: 
      return state;
  }
}