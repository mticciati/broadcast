import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {

  renderContent() {
    const {auth} = this.props;
    switch(auth) {
      case null:
        return;
      case false:
        return [
          <li key="1"><Link to="/login" className="waves-effect waves-light">Log in</Link></li>,
          <li key="2"><Link to="/signup" className="waves-effect waves-light">Sign up</Link></li>
        ];
      default:
        return [
          <li key="1"><Link to="/recipients">Recipients</Link></li>,
          <li key="2"><Link to="/lists">Lists</Link></li>,
          <li key="3"><Link to="/broadcasts">Broadcasts</Link></li>,
          <li key="4"><a href="/api/logout" className="waves-effect waves-light">Logout</a></li>
        ]; 
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link 
            to='/'
            className="brand-logo left"
          >
            Broadcast
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({auth}) {
  return {auth};
}

export default connect(mapStateToProps)(Header);