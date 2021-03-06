import React from 'react';

const ListItem = ({list, onAction, mode}) => (
  <li className="collection-item avatar hoverable">
    <i className="material-icons circle  grey darken-2">view_list</i>
    <span className="title">{list.name}</span>
    <p>{list.description}</p>
    <p>{list._recipients.length} recipient(s)</p>
    <a
      className="btn-floating btn-large waves-effect waves-light red secondary-content"
      onClick={() => onAction(list)}
    >
      <i className="material-icons">{mode}</i>
    </a>
  </li>
);

export default ListItem;
