import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Signup from './auth/Signup';
import Login from './auth/Login';
import RecipientsContainer from './recipients/RecipientsContainer';
import RecipientForm from './recipients/RecipientForm';
import Broadcasts from './broadcasts/Broadcasts';
import BroadcastForm from './broadcasts/BroadcastForm';
import ListsContainer from './lists/ListsContainer';
import ListForm from './lists/ListForm';

//testing
import axios from 'axios';
window.axios = axios;

const Landing = () => (
  <div>
    <h1>Landing</h1>
  </div>
);

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
  </div>
);

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container" style={{marginTop: '60px'}}>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={Dashboard} />
              <Route exact path="/recipients" component={RecipientsContainer} />
              <Route exact path="/recipients/new" component={RecipientForm} />
              <Route exact path="/broadcasts" component={Broadcasts} />
              <Route exact path="/broadcasts/new" component={BroadcastForm} />
              <Route exact path="/lists" component={ListsContainer} />
              <Route exact path="/lists/new" component={ListForm} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, actions)(App);
