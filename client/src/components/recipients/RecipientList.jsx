import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {Link} from 'react-router-dom';
import _ from 'lodash';

import * as actions from '../../actions';


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

  handleRecipientAction(recipient) {
    const {mode} = this.props;
    let list;
    switch(mode) {
      case 'add':
        list = this.props.list;
        this.props.addRecipientToList(list._id, recipient._id);
        break;
      case 'remove':
        list = this.props.list;
        this.props.removeRecipientFromList(list._id, recipient._id);
        break;
      case 'edit':
        this.props.setRecipient(recipient);
        break;
      default:
        console.log('need recipient action');
        break;
    } 
    
  }

  // renderAction(recipient_id) {
  //   const {mode} = this.props;
  //   switch(mode) {
  //     case 'add':
  //     case 'remove':
  //       return (
  //         <a 
  //           className="btn-floating btn-large waves-effect waves-light red secondary-content" 
  //           onClick={() => this.handleRecipientAction(recipient_id)}   
  //         >
  //          <i className="material-icons">{mode}</i>
  //        </a>
  //       );
  //     case 'edit':
  //       return (
  //         <Link 
  //           className="btn-floating btn-large waves-effect waves-light red secondary-content" 
  //           to={`/recipients/${recipient_id}`}   
  //         >
  //          <i className="material-icons">{mode}</i>
  //        </Link>
  //       );
  //     default:
  //       console.log('need action');
  //       break;
  //   }
  // }

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
                  onClick={() => this.handleRecipientAction(recipient)}   
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

export default connect(mapStateToProps, actions)(RecipientList);