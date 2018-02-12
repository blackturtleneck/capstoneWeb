import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './client';

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: null
    }
  }

  async login() {
    const result = await auth().signInWithPopup(provider)
    this.setState({user: result.user});
  }

  logout() {
    auth().signOut()
    this.setState({user: null});
  }



render() {
  const {user} = this.state
    return(
      <div className = "login">
            <p>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</p>
        <button onClick={this.login.bind(this)}>
          Login with Facebook
        </button>

        <button onClick={this.logout.bind(this)}>
          Logout
        </button>
        </div>
    );
    }
}
export default Login;