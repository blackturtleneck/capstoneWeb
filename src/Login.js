import React, { Component } from 'react';
import { auth, provider, db } from './FirestoreConfig';

class Login extends Component {
    render() {
        return (
            <button className="facebook" onClick={this.props.login.bind(this)}>
                Login with Facebook
            </button>
        );
    }
}

export default Login;
