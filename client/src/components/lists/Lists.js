import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {fetchLists, setList, unsetList} from '../../actions';

import ListItem from './ListItem';
import List from './List';

class Lists extends Component {

  componentDidMount() {
    this.props.fetchLists();
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
            )
          default: 
            return (
              <div>
                <p>
                  <a href="" onClick={() => this.props.unsetList()}>Back to Lists</a>
                </p>
                <p>
                  <button 
                    className="btn waves-effect waves-light" 
                    type="button" 
                  >
                    Add Recipient
                    <i className="material-icons right">person_add</i>
                  </button>
                </p>
                <List list={list} />
              </div>
            )
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
    list: state.list
  };
}

export default connect(mapStateToProps, {fetchLists, setList, unsetList})(Lists);