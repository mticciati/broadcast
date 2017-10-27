import React from 'react';
import _ from 'lodash';
import RecipientList from '../recipients/RecipientList';

// TODO make listing items more flexible, not just for Recipients

const Modal = ({title, items}) => (
  <div id="modal-list" className="modal modal-fixed-footer">
    <div className="modal-content">
      <h4>{title}</h4>
      <RecipientList recipients={items} />
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Close</a>
    </div>
  </div>
)

export default Modal;