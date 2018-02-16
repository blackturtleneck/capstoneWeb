import React from 'react';
// import firebase from 'firebase';
import {auth, provider, db} from './FirestoreConfig';

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
    
    // var users = db.CollectionReference('users');
    
    // users.doc('kUEypqhlHUFAn7lJcK6t').set({
    //   FName: "sarah",
    //   LName: "F",
    //   DOB:'march 5 2020'
    // })
    // .then(function() {
    //   console.log("Document successfully written!");
    // })
    // .catch(function(error) {
    //     console.error("Error writing document: ", error);
    // });

  }

  logout() {
    auth().signOut()
    this.setState({user: null});
  }




  test() {
    var users = db.collection("users");
    
    users.doc('new').set({
      FName: "sarah",
      LName: "F",
      DOB:'march 5 2020',
      PhotoRef: ''
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

    return(
      <div className = "login">
            <p>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</p>
        <button onClick={this.login.bind(this)}>
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