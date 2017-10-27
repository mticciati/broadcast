import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchRecipients} from '../../actions';

import RecipientList from './RecipientList';

class Recipients extends Component {

  componentWillMount() {
    this.props.fetchRecipients();
  }

  renderContent() {
    const {recipients} = this.props;
    switch(recipients) {
      case null:
        return;
      case false:
        return;
      default:
        return <RecipientList recipients={recipients} />;
    }
    
  }

  render() {

    return (
      <div>
        <h3>Recipients</h3>
        <Link to="/recipients/new">New</Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipients: state.recipients
  };
}

export default connect(mapStateToProps, {fetchRecipients})(Recipients);