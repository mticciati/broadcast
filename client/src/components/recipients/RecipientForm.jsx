import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';
import {unsetRecipient, saveRecipient, updateRecipient} from '../../actions';

import formFields from './formFields';

class RecipientForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  //TODO static require handleSubmit
  static propTypes = {
    mode: PropTypes.string.isRequired
  };

  static defaultProps = {
    mode: 'new'
  };

  componentWillUnmount() {
    this.props.unsetRecipient();
  }
  //TODO componentWillReceiveProps(nextProps) ?

  renderFields() {
    return _.map(formFields, ({label, name, type, required}) => {
      return (
        <div key={name}>
          <label>{label} {required && '*'}</label>
          <Field 
            key={name} 
            type="text" 
            required={required} 
            label={label} 
            name={name} 
            component="input" 
            style={{marginBottom: '5px'}} />
          <div className="red-text" style={{marginBottom: '20px'}}></div>
      </div>
      );
    });
  }


  handleSubmit(values) {
    console.log('values', values);
    const {mode, recipient} = this.props;
    switch(mode) {
      case 'new':
        this.props.saveRecipient(values);
        break;
      case 'edit':
        console.log('trying to update');
        this.props.updateRecipient(values, recipient._id);
        break;
      default: 
        console.log('need mode');
        break;
    }
    
  }

  //TODO update with msg Component
  //TODO update for save and edit
  handleResponse() {
    const {recipient} = this.props;
    if (!recipient) {
      return;
    } else if (recipient.firstname) {
      return recipient.firstname;
    } else {
      return recipient;
    }

  }
 
  render() {
    const { submitting, handleSubmit} = this.props;
    return (
      <div>
        {this.handleResponse()}
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          {this.renderFields()}
          <div>
            <button 
              className="btn waves-effect waves-light right" 
              type="submit" 
              name="action"
              disabled={submitting}
            >
              Save
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

RecipientForm = connect(null, {unsetRecipient, saveRecipient, updateRecipient})(RecipientForm);

export default reduxForm({
  validate,
  form: 'recipientForm',
})(RecipientForm);