import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import {saveList, unsetList, updateList} from '../../actions';

import formFields from './formFields';
import renderFields from '../../utils/renderFields';

class ListForm extends Component {

  static propTypes = {
    mode: PropTypes.string.isRequired
  };

  static defaultProps = {
    mode: 'new'
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  componentWillUnmount() {
    this.props.unsetList();
  }

  async handleSubmit(values) {
    const {mode, list} = this.props;
    switch(mode) {
      case 'new':
        this.props.saveList(values);
        break;
      case 'edit':
        console.log('trying to update');
        this.props.updateList(values, list._id);
        break;
      default:
        console.log('need mode');
        break;
    }
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
              Save
              <i className="material-icons right">forward</i>
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

ListForm = connect(null, {saveList, unsetList, updateList})(ListForm);

export default reduxForm({
  validate,
  form: 'listForm'
})(ListForm);
