import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
  fetchLists,
  setList,
  filterLists,
  fetchRecipients,
  addListToBroadcast,
  removeListFromBroadcast,
  unsetBroadcastList
} from '../../actions';

import List from './List';
import ListItemAdd from './ListItemAdd';
import ListItemRemove from './ListItemRemove';
import ListItemEdit from './ListItemEdit';

class ListList extends Component {

  static propTypes = {
    mode: PropTypes.string.isRequired
  }

  static defaultProps = {
    mode: 'edit'
  }

  async componentDidMount() {
    await this.props.fetchLists();
    await this.props.fetchRecipients();
    const {mode} = this.props;
    if (mode === 'add' || mode === 'remove') {
      const {lists, broadcastLists} = this.props;
      this.props.filterLists(lists, broadcastLists);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {lists, broadcastLists} = this.props;
    console.log('broadcastLists', broadcastLists);
    if (broadcastLists) {
      if (prevProps.broadcastLists.length !== broadcastLists.length) {
        this.props.filterLists(lists, broadcastLists);
      }
    }
  }

  componentWillUnmount() {
    this.props.unsetBroadcastList();
  }

  renderList() {
    const {
      addListToBroadcast,
      removeListFromBroadcast,
      setList,
      filteredLists,
      lists,
      broadcastLists,
      mode
    } = this.props;
    switch(mode) {
      case 'add':
        return _.map(filteredLists, (list) => {
          return (
            <ListItemAdd
             key={list._id}
             list={list}
             onAction={addListToBroadcast}
           />
         );
        })
      case 'remove':
        return _.map(broadcastLists, (list) => {
          return (
            <ListItemRemove
             key={list._id}
             list={list}
             onAction={removeListFromBroadcast}
           />
         );
        })
      case 'edit':
      default:
        return _.map(lists, (list) => {
          return (
            <ListItemEdit
             key={list._id}
             list={list}
             onAction={setList}
           />
         );
        })
     }
  }

  renderContent() {
    const {lists, list} = this.props;
    switch(lists) {
      case null:
        return <li><p>Loading...</p></li>;
      case false:
        return <li><p>You have no lists yet!</p></li>;
      default:
        switch(list) {
          case null:
            return (
              <ul className="collection">
                {this.renderList()}
              </ul>
            );
          default:
            return <List />
        }
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    lists: state.lists,
    list: state.list,
    filteredLists: state.filteredLists,
    recipients: state.recipients,
    broadcastLists: state.broadcastLists
  };
}

export default connect(mapStateToProps, {
    fetchLists,
    setList,
    fetchRecipients,
    filterLists,
    addListToBroadcast,
    removeListFromBroadcast,
    unsetBroadcastList
})(ListList);
