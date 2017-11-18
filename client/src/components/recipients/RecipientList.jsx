import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';

import * as actions from '../../actions';
import RecipientListItemAdd from './RecipientListItemAdd';
import RecipientListItemEdit from './RecipientListItemEdit';
import RecipientListItemRemove from './RecipientListItemRemove';


class RecipientList extends Component {

  static propTypes = {
    mode: PropTypes.string.isRequired
  }

  static defaultProps = {
    mode: 'edit'
  }

  async componentDidMount() {
    await this.props.fetchRecipients();
    const {recipients, mode} = this.props;
    if (mode === 'add' || mode === 'remove') {
      const {list} = this.props;
      this.props.filterRecipients(list, recipients);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {recipients, list} = this.props;
    if (list) {
      if (prevProps.list._recipients.length !== list._recipients.length) {
        this.props.filterRecipients(list, recipients);
      }
    }
  }

  renderList() {
    const {
      addRecipientToList,
      removeRecipientFromList,
      setRecipient,
      filteredRecipients,
      list,
      recipients,
      mode
    } = this.props;
    switch(mode) {
      case 'add':
        return _.map(filteredRecipients, (recipient) => {
          return (
            <RecipientListItemAdd
             key={recipient._id}
             recipient={recipient}
             onAction={addRecipientToList}
             list_id={list._id}
           />
         );
        })
      case 'remove':
        return _.map(list._recipients, (recipient) => {
          return (
            <RecipientListItemRemove
             key={recipient._id}
             recipient={recipient}
             onAction={removeRecipientFromList}
             list_id={list._id}
           />
         );
        })
      case 'edit':
      default:
        return _.map(recipients, (recipient) => {
          return (
            <RecipientListItemEdit
             key={recipient._id}
             recipient={recipient}
             onAction={setRecipient}
           />
         );
        })
     }
  }

  renderContent() {
    const {recipients} = this.props;
    switch(recipients) {
      case null:
        return <li><p>Loading...</p></li>;
      case false:
        console.log('null or false recipients');
        return;
      default:
        if (recipients.length === 0) {
          return <p>add more recipients!</p>;
        }
        return (
          <ul className="collection">
            {this.renderList()}
          </ul>
        );
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

export default connect(mapStateToProps, actions)(RecipientList);
