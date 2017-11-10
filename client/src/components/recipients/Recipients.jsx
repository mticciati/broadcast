import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RecipientList from './RecipientList';

class Recipients extends Component {

  renderContent() {
    return <RecipientList mode="edit" />
  }

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
        {this.renderContent()}
      </div>
    );
  }
}

export default Recipients;