import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import RecipientList from './RecipientList';
import RecipientForm from './RecipientForm';



class RecipientsContainer extends Component {

  renderContent() {
    const {recipient} = this.props;
    if (recipient) {
      const initialValues = {
        firstname: recipient.firstname,
        lastname: recipient.lastname,
        email: recipient.email,
        phone: recipient.phone
      }
      return <RecipientForm mode="edit" recipient={recipient} initialValues={initialValues} />;
    }
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

  render() {

    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    recipient: state.recipient
  };
}

export default connect(mapStateToProps, null)(RecipientsContainer);
