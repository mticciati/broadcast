import {combineReducers} from 'redux';
import authReducer from './authReducer';
import recipientReducer from './recipientReducer';
import recipientsReducer from './recipientsReducer';
import broadcastReducer from './broadcastReducer';
import broadcastsReducer from './broadcastsReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
  auth: authReducer,
  recipient: recipientReducer,
  recipients: recipientsReducer,
  broadcast: broadcastReducer,
  broadcasts: broadcastsReducer,
  form: formReducer
});