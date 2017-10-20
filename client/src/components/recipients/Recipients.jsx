import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import * as actions from '../../actions';

class Recipients extends Component {

  componentWillMount() {
    const {fetchRecipients} = this.props;
    fetchRecipients();
  }

  renderContent() {
    const {recipients} = this.props;
    switch(recipients) {
      case null:
        return;
      case false:
        return;
      default:
        return _.map(recipients, (r) => {
          return (
            <div key={r._id}>
              {r.firstname}
            </div>
          );
        });
    }
    
  }

  render() {

    return (
      <div>
        <Link to="/recipients/create">Create</Link>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    recipients: state.recipients
  };
}

export default connect(mapStateToProps, actions)(Recipients);