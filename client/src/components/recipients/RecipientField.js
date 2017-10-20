// Single label and input
import React from 'react';

export default ({input, label, type, required}) => (
  <div>
    <label>{label} {required && '*'}</label>
    <input type={type} style={{marginBottom: '5px'}} />
    <div className="red-text" style={{marginBottom: '20px'}}>
    </div>
  </div>
)