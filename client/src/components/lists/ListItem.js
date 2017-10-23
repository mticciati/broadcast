import React from 'react';

const ListItem = ({list, setList}) => (
  <li className="collection-item avatar">
    <i className="material-icons circle  grey darken-2">view_list</i>
    <span className="title">{list.name}</span>
    <p>{list.description}</p>
    <p>{list._recipients.length} recipient(s)</p>
    <a href="#!" className="secondary-content" onClick={() => setList(list)}>
      <i className="material-icons">info_outline</i>
    </a>
  </li>
);

export default ListItem;