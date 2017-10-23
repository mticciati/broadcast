import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import {saveList} from '../../actions';

import formFields from './formFields';
import renderFields from '../../utils/renderFields';

class ListForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  async handleSubmit(values) {
    console.log('values', values);
    this.props.saveList(values);
  }

  //TODO update with msg Component
  handleResponse() {
    const {list} = this.props;
    if (!list) {
      return;
    } else if (list.name) {
      return 'Created '+list.name+'!';
    } else {
      return list;
    }
  }

  render() {
    let {submitting, handleSubmit} = this.props;
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

ListForm = connect(null, {saveList})(ListForm);

export default reduxForm({
  validate, 
  form: 'listForm'
})(ListForm);
