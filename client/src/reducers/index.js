import {combineReducers} from 'redux';
import authReducer from './authReducer';
import recipientReducer from './recipientReducer';
import recipientsReducer from './recipientsReducer';
import broadcastReducer from './broadcastReducer';
import broadcastsReducer from './broadcastsReducer';
import listReducer from './listReducer';
import listsReducer from './listsReducer';
import filteredRecipientsReducer from './filteredRecipientsReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  auth: authReducer,
  recipient: recipientReducer,
  recipients: recipientsReducer,
  filteredRecipients: filteredRecipientsReducer,
  broadcast: broadcastReducer,
  broadcasts: broadcastsReducer,
  list: listReducer,
  lists: listsReducer,
  form: formReducer
});