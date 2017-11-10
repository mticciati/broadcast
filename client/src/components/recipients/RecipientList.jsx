import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchRecipients, filterRecipients, addRecipientToList, removeRecipientFromList} from '../../actions';
// import RecipientList from './RecipientList';


class RecipientList extends Component {

  async componentDidMount() {
    await this.props.fetchRecipients();
    const {recipients, list} = this.props;
    this.props.filterRecipients(list, recipients);
    console.log('rendered');
  }

  componentDidUpdate(prevProps, prevState) {
    const {recipients, list} = this.props;
    if (prevProps.list._recipients.length !== list._recipients.length) {
      this.props.filterRecipients(list, recipients);
    } 
  }

  handleRecipientAction(list_id, recipient_id) {
    const {mode} = this.props;
    switch(mode) {
      case 'add':
        this.props.addRecipientToList(list_id, recipient_id);
        break;
      case 'edit':
        console.log(mode);
        break;
      case 'remove':
        this.props.removeRecipientFromList(list_id, recipient_id);
        break;
      default:
        console.log('need recipient action');
        break;
    } 
    
  }

  renderContent() {
    const {mode, filteredRecipients, list, recipients} = this.props;
    let recipientsToList;
    switch (mode) {
      case 'add':
        recipientsToList = filteredRecipients;
        break;
      case 'remove':
        recipientsToList = list._recipients;
        break;
      default:
        recipientsToList = recipients;
        break;
    }
    switch(recipientsToList.length) {
      case null:
      case false:
      console.log('null or false recipientsToList');
        return;
      case 0:
      console.log('empty recipientsToList');
        return <p>add more recipients!</p>;
      default:
        return (
          <ul className="collection">
            {_.map(recipientsToList, (recipient) => {
             return (
               <li key={recipient._id} className="collection-item avatar">
                 <i className="material-icons circle grey darken-2">person</i>
                 <span className="title">{recipient.firstname+' '+recipient.lastname}</span>
                 <p>{recipient.email}</p>
                 <p>{recipient.phone}</p>
                 <a 
                   className="btn-floating btn-large waves-effect waves-light red secondary-content" 
                   onClick={() => this.handleRecipientAction(list._id, recipient._id)}   
                 >
                   <i className="material-icons">{mode}</i>
                 </a>
               </li>
             );
            })}
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

export default connect(mapStateToProps, {fetchRecipients, filterRecipients, addRecipientToList, removeRecipientFromList})(RecipientList);