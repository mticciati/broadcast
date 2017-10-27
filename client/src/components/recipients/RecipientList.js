import React from 'react';
import _ from 'lodash';

const RecipientList = ({recipients}) => (
    <ul className="collection">
      {_.map(recipients, (recipient) => {
        return (
          <li key={recipient._id} className="collection-item avatar">
            <i className="material-icons circle grey darken-2">person</i>
            <span className="title">{recipient.firstname+' '+recipient.lastname}</span>
            <p>{recipient.email}</p>
            <p>{recipient.phone}</p>
            <a 
              className="btn-floating btn-large waves-effect waves-light red secondary-content" 
            >
              <i className="material-icons">add</i>
            </a>
          </li>
        );
      })}
  </ul>
)

export default RecipientList;