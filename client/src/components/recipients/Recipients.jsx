import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RecipientList from './RecipientList';

class Recipients extends Component {

  render() {

    return (
      <div>
        <h3>Recipients</h3>
        <Link 
          to="/recipients/new" 
          className="btn waves-effect waves-light"
        >
          New Recipient
          <i className="material-icons right">person_add</i>
        </Link>
        <RecipientList mode="edit" />
      </div>
    );
  }
}

export default Recipients;