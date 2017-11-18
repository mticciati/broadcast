import React from 'react';

const RecipientListItemEdit = ({recipient, onAction}) => (
  <li key={recipient._id} className="collection-item avatar">
    <i className="material-icons circle grey darken-2">person</i>
    <span className="title">{recipient.firstname+' '+recipient.lastname}</span>
    <p>{recipient.email}</p>
    <p>{recipient.phone}</p>
    <a
     className="btn-floating btn-large waves-effect waves-light red secondary-content"
     onClick={() => onAction(recipient)}
     >
      <i className="material-icons">edit</i>
   </a>
  </li>
);

export default RecipientListItemEdit;
