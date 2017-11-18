import React from 'react';
import RecipientList from '../recipients/RecipientList';
import ListList from '../lists/ListList';

// TODO make listing items more flexible, not just for Recipients

function renderContent(type) {
  switch(type) {
    case 'recipients':
      return <RecipientList mode="add" />;
    case 'lists':
      return <ListList mode="add" />
    default:
      return;
  }

}

const Modal = ({title, type}) => (
  <div id="modal-list" className="modal modal-fixed-footer">
    <div className="modal-content">
      <h4>{title}</h4>
      {renderContent(type)}
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
    </div>
  </div>
)

export default Modal;
