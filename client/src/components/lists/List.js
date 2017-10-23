import React from 'react';
import _ from 'lodash';

function renderContent(recipients) {
  if (recipients.length > 0) {
    return _.map(recipients, (recipient) => {
      return <li key={recipient.id}>recipient.firstname</li>;
    });
  } else {
    return <p>No Recipients in this List yet!</p>;
  }
  
}

const List = ({list}) => (
  <div>
    <ul>
    {renderContent(list._recipients)}
    </ul>
  </div>
);

export default List;