import React, {Component} from 'react';
import axios from 'axios';

class Signup extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  async handleSubmit(e) {
    e.preventDefault();
    var values = {
      email: this.refs.email.value,
      username: this.refs.username.value,
      password: this.refs.password.value
    };
    const res = await axios.post('/api/signup', values);
    alert(res);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Email:</label>
          <input ref="email" type="email" name="email"/>
        </div>
        <div>
          <label>Username:</label>
          <input ref="username" type="text" name="username"/>
        </div>
        <div>
          <label>Password:</label>
          <input ref="password" type="password" name="password"/>
        </div>
        <div>
          <button className="btn waves-effect waves-light right" type="submit" name="action">Sign up
            <i className="material-icons right">arrow_forward</i>
          </button>
        </div>
      </form>
    )
  }
}

export default Signup;