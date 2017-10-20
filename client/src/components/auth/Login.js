import React, {Component} from 'react';
// import {Redirect} from 'react-router-dom';
// import axios from 'axios';

class Login extends Component {
  //  constructor(props) {
  //   super(props);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.state = {
  //     fireRedirect: false
  //   }
  // }

  // async handleSubmit(e) {
  //   e.preventDefault();
  //   var values = {
  //     username: this.refs.username.value,
  //     password: this.refs.password.value
  //   };
  //   const res = await axios.post('/api/login', values);
  //   console.log('login response', res);
  //   if (res.data) {
  //     this.setState({ fireRedirect: true })
  //   }
  // }

  render() {
    // const { from } = this.props.location.state || '/'
    // const { fireRedirect } = this.state
    // {fireRedirect && (
    //         <Redirect to={from || '/dashboard'}/>
    //       )}
    return (
      <div>
        <form action="/api/login" method="post">
          <div>
            <label>Username:</label>
            <input ref="username" type="text" name="username"/>
          </div>
          <div>
            <label>Password:</label>
            <input ref="password" type="password" name="password"/>
          </div>
          <div>
            <button className="btn waves-effect waves-light right" type="submit" name="action">Log in
              <i className="material-icons right">arrow_forward</i>
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;