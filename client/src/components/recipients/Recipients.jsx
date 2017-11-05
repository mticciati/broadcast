import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
// import {fetchRecipients} from '../../actions';

// import RecipientList from './RecipientList';
import RecipientListContainer from './RecipientListContainer';

class Recipients extends Component {

  // componentWillMount() {
  //   this.props.fetchRecipients();
  // }

  renderContent() {
    // const {recipients} = this.props;
    // switch(recipients) {
    //   case null:
    //     return;
    //   case false:
    //     return;
    //   default:
    //     return <RecipientList recipients={recipients} mode="edit" />;
    // }
    return <RecipientListContainer mode="edit" />
  }

  render() {

    return (
      <div>
        <h3>Recipients</h3>
        <Link 
          to="/recipients/new" 
          className="btn waves-effect waves-light"
        >
          New Recipient
          <i className="material-icons right">person_add</i>
        </Link>
        {this.renderContent()}
      </div>
    );
  }
}

export default Recipients;