import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchBroadcasts} from '../../actions';

import BroadcastList from './BroadcastList';

class Broadcasts extends Component {

  componentWillMount() {
    this.props.fetchBroadcasts();
  }

  renderContent() {
    const {broadcasts} = this.props;
    switch(broadcasts) {
      case null:
        return;
      case false:
        return;
      default:
        return <BroadcastList broadcasts={broadcasts} />
    }

  }

  render() {

    return (
      <div>
        <h3>Broadcasts</h3>
        <Link
          to="/broadcasts/new"
          className="btn waves-effect waves-light"
        >
          New Broadcast
          <i className="material-icons right">forward</i>
        </Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    broadcasts: state.broadcasts
  };
}

export default connect(mapStateToProps, {fetchBroadcasts})(Broadcasts);
