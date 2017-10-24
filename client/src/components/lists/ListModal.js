import React from 'react';

import List from './List';

//TODO use?

function renderContent(list) {
  if (list) {
    return <List list={list} />;
  } 
}

const ListModal = ({list}) => {

  return (
    <div id="list-modal" className="modal bottom-sheet">
      <div className="modal-content">
        <h4>Modal Header</h4>
        <p>
          <button 
            className="btn waves-effect waves-light" 
            type="button" 
          >
            Add Recipient
            <i className="material-icons right">person_add</i>
          </button>
        </p>
        {renderContent(list)}   
      </div>
    </div>
  );
}

export default ListModal;