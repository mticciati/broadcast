import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import ListList from './ListList';
import ListForm from './ListForm';



class ListsContainer extends Component {

  renderContent() {
    const {list} = this.props;
    if (list) {
      const initialValues = {
        name: list.name,
        description: list.description
      }
      return <ListForm mode="edit" list={list} initialValues={initialValues} />;
    }
    return (
      <div>
        <h3>Lists</h3>
        <Link
          to="/lists/new"
          className="btn waves-effect waves-light"
        >
          New Recipient
          <i className="material-icons right">person_add</i>
        </Link>
        <ListList mode="edit" />
      </div>
    );
  }

  render() {

    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    list: state.list
  };
}

export default connect(mapStateToProps, null)(ListsContainer);
