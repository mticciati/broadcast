import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import _ from 'lodash';
import {createRecipient} from '../../actions';

// import RecipientField from './RecipientField';
import formFields from './formFields';

function renderFields() {
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


class CreateRecipientForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  async handleSubmit(values) {
    console.log('values', values);
    this.props.createRecipient(values);
  }

  //TODO update with msg Component
  handleResponse() {
    const {recipient} = this.props;
    if (!recipient) {
      return;
    } else if (recipient.firstname) {
      return 'Created '+recipient.firstname+'!';
    } else {
      return recipient;
    }

  }
 
  render() {
    const { submitting, handleSubmit } = this.props;
    return (
      <div>
        {this.handleResponse()}
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          {renderFields()}
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

function mapStateToProps({recipient}) {
  return {recipient};
}

CreateRecipientForm = connect(mapStateToProps, {createRecipient})(CreateRecipientForm);

export default reduxForm({
  validate,
  form: 'recipientForm',
})(CreateRecipientForm);