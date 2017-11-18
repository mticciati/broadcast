import React, {Component} from 'react';
import {connect} from 'react-redux';
import {unsetList} from '../../actions';
import $ from 'jquery';

import Modal from '../shared/Modal';
import RecipientList from '../recipients/RecipientList';

class List extends Component {

  componentDidMount() {
    $('.modal').modal();
  }

  componentWillUnmount() {
    this.props.unsetList();
  }

  render() {
    const {list, unsetList} = this.props;
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
          >
            Add Recipients
            <i className="material-icons right">group_add</i>
          </a>
        </p>
        <RecipientList mode="remove" />
        <Modal title="Your Recipients" type="recipients" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list
  }
}

export default connect(mapStateToProps, {unsetList})(List);
