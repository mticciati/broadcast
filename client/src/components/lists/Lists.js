import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {fetchLists, setList, fetchRecipients} from '../../actions';

import ListItem from './ListItem';
import List from './List';

class Lists extends Component {

  componentDidMount() {
    this.props.fetchLists();
    this.props.fetchRecipients();
  }

  renderContent() {
    const {lists, list, setList} = this.props;
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
                {_.map(lists, (list) => {
                    return <ListItem key={list._id} list={list} setList={setList} />;
                  })
                }
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
        <h3>Lists</h3>
        <Link to="/lists/new">New List</Link>
        {this.renderContent()}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    lists: state.lists,
    list: state.list,
    recipients: state.recipients
  };
}

export default connect(mapStateToProps, {fetchLists, setList, fetchRecipients})(Lists);