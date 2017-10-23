import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import {fetchBroadcasts} from '../../actions';

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
        return _.map(broadcasts, (broadcast) => {
          return (
            <div key={broadcast._id} className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{broadcast.title}</span>
                <p>{broadcast.body}</p>
                <p>Sent on: {new Date(broadcast.created_at).toLocaleDateString()}</p>
              </div>
              <div className="card-action">
                <a>Positions: {broadcast.totalPositions}</a>
                <a>Positions Left: {broadcast.openPositions}</a>
              </div>
            </div>
          );
        });
    }
    
  }

  render() {

    return (
      <div>
        <h3>Broadcasts</h3>
        <Link to="/broadcasts/new">New</Link>
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