import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {fetchRecipients, filterRecipients, addRecipientToList, removeRecipientFromList} from '../../actions';
// import RecipientList from './RecipientList';


class RecipientList extends Component {

  async componentDidMount() {
    await this.props.fetchRecipients();
    const {recipients, mode} = this.props;
    if (mode === 'add' || mode === 'remove') {
      const {list} = this.props;
      this.props.filterRecipients(list, recipients);
    }
    console.log('rendered');
  }

  componentDidUpdate(prevProps, prevState) {
    const {recipients, list} = this.props;
    if (list) {
      if (prevProps.list._recipients.length !== list._recipients.length) {
        this.props.filterRecipients(list, recipients);
      } 
    }   
  }

  handleRecipientAction(recipient_id) {
    const {mode} = this.props;
    let list;
    switch(mode) {
      case 'add':
        list = this.props.list;
        this.props.addRecipientToList(list._id, recipient_id);
        break;
      case 'edit':
        console.log(mode);
        break;
      case 'remove':
        list = this.props.list;
        this.props.removeRecipientFromList(list._id, recipient_id);
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
      case 'edit':
      default:
      console.log('edit mode render');
        recipientsToList = recipients;
        break;
    }
    switch(recipientsToList) {
      case null:
      case false:
      console.log('null or false recipientsToList');
        return;
      default:
        if (recipients.length === 0) {
          return <p>add more recipients!</p>;
        }
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
                   onClick={() => this.handleRecipientAction(recipient._id)}   
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