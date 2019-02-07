import axios from 'axios';

import * as types from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({type: types.FETCH_USER, payload: res.data});
};

export const saveRecipient = (values) => async dispatch => {
  console.log('from actions', values);
  const res = await axios.post('/api/recipients', values);
  console.log('from saveRecipient', res);
  dispatch({type: types.SAVE_RECIPIENT, payload: res.data});
}

export const updateRecipient = (values, recipient_id) => async dispatch => {
  console.log('from actions', values);
  const res = await axios.patch(`/api/recipients/${recipient_id}`, values);
  console.log('from updateRecipient', res);
  dispatch({type: types.UPDATE_RECIPIENT, payload: res.data});
}

export const fetchRecipients = () => async dispatch => {
  const res = await axios.get('/api/recipients');
  console.log('from fetch recipients', res);
  dispatch({type: types.FETCH_RECIPIENTS, payload: res.data});
}

export const filterRecipients = (list, recipients) => {
  let filteredRecipients;
  if (!recipients || recipients.length === 0 || !list) {
    console.log('no recipients or no list');
    console.log('list', list);
    console.log('recipients', recipients);
    filteredRecipients = recipients;
  } else {
    filteredRecipients = recipients.filter(recipient => list._recipients.filter(listRecipient => listRecipient._id === recipient._id).length === 0);
  }
  return {
    type: types.FILTER_RECIPIENTS,
    payload: filteredRecipients
  };
}

export const setRecipient = (recipient) => dispatch => {
  dispatch({type: types.SET_RECIPIENT, payload: recipient});
}

export const unsetRecipient = () => dispatch => {
  dispatch({type: types.UNSET_RECIPIENT});
}

export const saveBroadcast = (values) => async dispatch => {
  const res = await axios.post('/api/broadcasts', values);
  dispatch({type: types.SAVE_BROADCAST, payload: res.data});
}

export const fetchBroadcasts = () => async dispatch => {
  const res = await axios.get('/api/broadcasts');
  dispatch({type: types.FETCH_BROADCASTS, payload: res.data});
}

export const saveList = (values) => async dispatch => {
  const res = await axios.post('/api/lists', values);
  console.log('from saveList', res);
  dispatch({type: types.SAVE_LIST, payload: res.data});
}

export const updateList = (values, list_id) => async dispatch => {
  console.log('from actions', values);
  const res = await axios.patch(`/api/lists/${list_id}`, values);
  console.log('from updateList', res);
  dispatch({type: types.UPDATE_LIST, payload: res.data});
}

export const fetchLists = () => async dispatch => {
  const res = await axios.get('/api/lists');
  dispatch({type: types.FETCH_LISTS, payload: res.data});
}

export const fetchList = (id) => async dispatch => {
  const res = await axios.get(`/api/lists/${id}`);
  dispatch({type: types.FETCH_LIST, payload: res.data});
}

export const setList = (list) => dispatch => {
  dispatch({type: types.SET_LIST, payload: list});
}

export const filterLists = (lists, broadcastLists) => {
  let filteredLists;
  if (!broadcastLists || broadcastLists.length === 0 || !lists) {
    console.log('no recipients or no list');
    console.log('lists', lists);
    console.log('broadcastLists', broadcastLists);
    filteredLists = lists;
  } else {
    filteredLists = lists.filter(list => broadcastLists.filter(broadcastList => broadcastList._id === list._id).length === 0);
  }
  return {
    type: types.FILTER_LISTS,
    payload: filteredLists
  };
}

export const unsetList = () => dispatch => {
  dispatch({type: types.UNSET_LIST});
}

export const addRecipientToList = (list_id, recipient_id) => async dispatch => {
  const data = {recipients: [recipient_id]};
  const res = await axios.post(`/api/lists/${list_id}/recipients`, data);
  dispatch({type: types.ADD_RECIPIENT_TO_LIST, payload: res.data});
}

export const removeRecipientFromList = (list_id, recipient_id) => async dispatch => {
  const res = await axios.delete(`/api/lists/${list_id}/recipients/${recipient_id}`);
  dispatch({type: types.REMOVE_RECIPIENT_FROM_LIST, payload: res.data});
}

export const addListToBroadcast = (list) => dispatch => {
  console.log('addListToBroadcastlist', list);
  dispatch({type: types.ADD_LIST_TO_BROADCAST, payload: list._id});
}

export const removeListFromBroadcast = (list) => dispatch => {
  console.log('removeListFromBroadcastlist', list);
  dispatch({type: types.REMOVE_LIST_FROM_BROADCAST, payload: list._id});
}

export const unsetBroadcastList = () => dispatch => {
  dispatch({type: types.UNSET_BROADCAST_LISTS});
}
