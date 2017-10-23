import React from 'react';
import {Field} from 'redux-form';
import _ from 'lodash';

export default (formFields) => {
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