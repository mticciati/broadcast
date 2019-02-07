import {
  ADD_LIST_TO_BROADCAST,
  REMOVE_LIST_FROM_BROADCAST,
  UNSET_BROADCAST_LISTS
} from '../actions/types';

import _ from 'lodash';

export default (state = [], action) => {
  switch(action.type) {
    case ADD_LIST_TO_BROADCAST:
      state.push(action.payload);
      return state;
    case REMOVE_LIST_FROM_BROADCAST:
      return _.map((state), list => list._id !== action.list_id);
    case UNSET_BROADCAST_LISTS:
      return [];
    default:
      return state;
  }
}
