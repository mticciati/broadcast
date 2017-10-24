import React from 'react';
import _ from 'lodash';

function renderContent(recipients) {
  if (recipients.length > 0) {
    return (
      <ul className="collection">
        {_.map(recipients, (recipient) => {
          return (
            <li key={recipient.id} className="collection-item avatar">
              <i className="material-icons circle  grey darken-2">person</i>
              <span className="title">{recipient.firstname+' '+recipient.lastname}</span>
              <p>{recipient.email}</p>
              <p>{recipient.phone}</p>
            </li>
          )
        })}
      </ul>
    ); 
  } else {
    return <p>No Recipients in this List yet!</p>;
  }
  
}

const List = ({list, unsetList}) => (
  <div>
    <h3>{list.name}</h3>
    <p>{list.description}</p>
    <p>
      <a onClick={() => unsetList()}>Back to lists</a>
    </p>
    <p>
      <button 
        className="btn waves-effect waves-light" 
        type="button" 
      >
        Add Recipient
        <i className="material-icons right">person_add</i>
      </button>
    </p>  
    {renderContent(list._recipients)}
  </div>
);

export default List;