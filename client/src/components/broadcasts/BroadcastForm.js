import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import {saveBroadcast} from '../../actions';
import renderFields from '../../utils/renderFields';

import formFields from './formFields';

class BroadcastForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
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
            <button 
              className="btn waves-effect waves-light right" 
              type="submit" 
              name="action"
              disabled={submitting}
            >
              Create
              <i className="material-icons right">arrow_forward</i>
            </button>
          </div>
        </form>
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

function mapStateToProps({broadcast}) {
  return {broadcast};
}

BroadcastForm = connect(mapStateToProps, {saveBroadcast})(BroadcastForm);

export default reduxForm({
  validate,
  form: 'broadcastForm',
})(BroadcastForm);