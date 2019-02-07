import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import $ from 'jquery';
import {saveBroadcast, unsetBroadcastList} from '../../actions';
import renderFields from '../../utils/renderFields';

import Modal from '../shared/Modal';
import ListList from '../lists/ListList';
import formFields from './formFields';

class BroadcastForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentDidMount() {
    $('.modal').modal();
  }

  componentWillUnmount() {
    this.props.unsetBroadcastList()
  }

  async handleSubmit(values) {
    console.log('values', values);
    this.props.saveBroadcast(values);
  }

  //TODO update with msg Component
  handleResponse() {
    const {broadcast} = this.props;
    if (!broadcast) {
      return;
    } else if (broadcast.title) {
      return 'Created '+broadcast.title+'!';
    } else {
      return broadcast;
    }

  }

  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      <div>
        {this.handleResponse()}
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          {renderFields(formFields)}
          <div>
            <a
              href="#modal-list"
              className="btn waves-effect waves-light modal-trigger"
              type="button"
            >
              Choose List
              <i className="material-icons right">playlist_add</i>
            </a>
          </div>
          <div><ListList mode="remove" /></div>
          <div>
            <button
              className="btn waves-effect waves-light right"
              type="submit"
              name="action"
              disabled={submitting}
            >
              Send
              <i className="material-icons right">forward</i>
            </button>
          </div>
        </form>
        <Modal title="Your Lists" type="lists" />
      </div>
    );
  }


}

function validate(values) {
  const errors = {};

  _.each(formFields, ({name}) => {
    if (!values[name]) {
      errors[name] = 'Please provide a value';
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return {
    broadcast: state.broadcast,
    broadcastLists: state.broadcastLists
  };
}

BroadcastForm = connect(mapStateToProps, {saveBroadcast, unsetBroadcastList})(BroadcastForm);

export default reduxForm({
  validate,
  form: 'broadcastForm',
})(BroadcastForm);
