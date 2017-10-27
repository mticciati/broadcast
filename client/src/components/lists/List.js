import React, {Component} from 'react';
import {connect} from 'react-redux';
import {unsetList, fetchRecipients} from '../../actions';
import _ from 'lodash';
import $ from 'jquery';

import Modal from '../shared/Modal';

// TODO update to only show recipients to add that are not already in the list

class List extends Component {

  componentDidMount() {
    $('.modal').modal();
  }

  renderContent(recipients) {
    if (recipients.length > 0) {
      return (
        <ul className="collection">
          {_.map(recipients, (recipient) => {
            return (
              <li key={recipient._id} className="collection-item avatar">
                <i className="material-icons circle grey darken-2">person</i>
                <span className="title">{recipient.firstname+' '+recipient.lastname}</span>
                <p>{recipient.email}</p>
                <p>{recipient.phone}</p>
              </li>
            )
          })}
        </ul>
      ); 
    } else {
      return <p>No Recipients in this List yet!</p>;
    }
    
  }

  render() {
    const {list, unsetList, fetchRecipients, recipients} = this.props;
    return (
      <div>
        <h3>{list.name}</h3>
        <p>{list.description}</p>
        <p>
          <a onClick={() => unsetList()}>Back to lists</a>
        </p>
        <p>
          <a 
            href="#modal-list"
            className="btn waves-effect waves-light modal-trigger" 
            type="button" 
            onClick={() => fetchRecipients()}
          >
            Add Recipients
            <i className="material-icons right">group_add</i>
          </a>         
        </p>  
        {this.renderContent(list._recipients)}
        <Modal title="Your Recipients" items={recipients} />
      </div>
    );
  }
} 

function mapStateToProps(state) {
  return {
    list: state.list,
    recipients: state.recipients
  }
}

export default connect(mapStateToProps, {unsetList, fetchRecipients})(List);