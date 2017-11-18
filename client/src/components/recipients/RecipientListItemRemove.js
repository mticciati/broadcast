import React from 'react';

const RecipientListItemRemove = ({recipient, onAction, list_id}) => (
  <li key={recipient._id} className="collection-item avatar">
    <i className="material-icons circle grey darken-2">person</i>
    <span className="title">{recipient.firstname+' '+recipient.lastname}</span>
    <p>{recipient.email}</p>
    <p>{recipient.phone}</p>
    <a
     className="btn-floating btn-large waves-effect waves-light red secondary-content"
     onClick={() => onAction(list_id, recipient._id)}
     >
      <i className="material-icons">remove</i>
   </a>
  </li>
);

export default RecipientListItemRemove;
