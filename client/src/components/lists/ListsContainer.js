import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import ListList from './ListList';
import ListForm from './ListForm';
import List from './List';



class ListsContainer extends Component {

  renderContent() {
    const {list} = this.props;
    if (list) {
      const initialValues = {
        name: list.name,
        description: list.description
      }
      return (
        <div>
          <ListForm mode="edit" list={list} initialValues={initialValues} />
          <List />
        </div>
      );
    }
    return (
      <div>
        <h3>Lists</h3>
        <Link
          to="/lists/new"
          className="btn waves-effect waves-light"
        >
          New List
          <i className="material-icons right">playlist_add</i>
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
