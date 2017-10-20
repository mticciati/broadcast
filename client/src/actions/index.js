import axios from 'axios';

import * as types from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({type: types.FETCH_USER, payload: res.data});
};

export const createRecipient = (values) => async dispatch => {
  console.log('from actions', values);
  const res = await axios.post('/api/recipients', values);
  console.log('from createRecipient', res);
  dispatch({type: types.CREATE_RECIPIENT, payload: res.data});
}

export const fetchRecipients = () => async dispatch => {
  const res = await axios.get('/api/recipients');
  console.log('from fetch recipients', res);
  dispatch({type: types.FETCH_RECIPIENTS, payload: res.data});
}

export const saveBroadcast = (values) => async dispatch => {
  const res = await axios.post('/api/broadcasts', values);
  dispatch({type: types.SAVE_BROADCAST, payload: res.data});
}

export const fetchBroadcasts = () => async dispatch => {
  const res = await axios.get('/api/broadcasts');
  dispatch({type: types.FETCH_BROADCASTS, payload: res.data});
}