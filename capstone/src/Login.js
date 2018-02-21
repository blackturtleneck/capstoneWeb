import React from 'react';
import firebase from 'firebase';
import {auth, provider, db} from './FirestoreConfig';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  async login() {
    const result = await auth().signInWithPopup(provider)
    this.setState({ user: result.user });
    console.log("results", result.user.email);
    // Add a new document in collection "cities"
    db.collection("users").doc(result.user.email).set({
      name: result.user.displayName,
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  }

  logout() {
    auth().signOut()
    this.setState({ user: null });
  }




  test() {
    var users = db.collection("users");
    
    users.doc('new').set({
      FName: "sarah",
      LName: "F",
      DOB:'march 5 2020'
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

render() {
  const {user} = this.state

    return (
      <div className="login">
        <p>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</p>
        <button className="facebook" onClick={this.login.bind(this)}>
          Login with Facebook
        </button>

        <button onClick={this.test.bind(this)}>
          TESTTESTTEST
        </button>

        <button onClick={this.logout.bind(this)}>
          Logout
        </button>
      </div>
    );
  }
}
export default Login;