import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchRecipients, filterRecipients} from '../../actions';
import RecipientList from './RecipientList';

class RecipientListContainer extends Component {

  async componentDidMount() {
    await this.props.fetchRecipients();
    const {recipients, list} = this.props;
    this.props.filterRecipients(list, recipients);
  }

  renderContent() {
    const {recipients, mode, filteredRecipients} = this.props;
    switch(recipients) {
      case null:
      case false:
        return;
      case []:
        return <p>add more recipients!</p>;
      default:
        return <RecipientList recipients={filteredRecipients} mode={mode} />;
    }
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    recipients: state.recipients,
    filteredRecipients: state.filteredRecipients,
    list: state.list
  };
}

export default connect(mapStateToProps, {fetchRecipients, filterRecipients})(RecipientListContainer);