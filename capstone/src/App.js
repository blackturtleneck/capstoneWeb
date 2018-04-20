import React from "react";
import { auth, provider, db } from "./FirestoreConfig";
import PageContainer from "./PageContainer";
import "./Login.css";
import { Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      user: null
    };
  }

  async login() {
    const result = await auth().signInWithPopup(provider);
    this.setState({ user: result.user });
    // Add a new document in collection "users"
    // if(!db.collection("users").doc(result.user.email).get()) {
    db
      .collection("users")
      .doc(result.user.email)
      .set({
        name: result.user.displayName,
        fName: result.additionalUserInfo.profile.first_name,
        lName: result.additionalUserInfo.profile.last_name,
        gender: result.additionalUserInfo.profile.gender,
        age: result.additionalUserInfo.profile.age_range.min,
        linkFB: result.additionalUserInfo.profile.link,
        timeZone: result.additionalUserInfo.profile.timezone,
        photoURL: result.user.photoURL,
        icons: { first: "abc", sec: "def" }
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  render() {
    return (
      <div className="">
        {this.state.authenticated ? (
          this.state.user ? (
            <PageContainer user={this.state.user} />
          ) : (
            <div className="login">
              {/* <p>{user ? `Hi, ${user.displayName}!` : 'Welcome to our unamed app'}</p> */}
              <button className="facebook" onClick={this.login.bind(this)}>
                Login with Facebook
              </button>
            </div>
          )
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default App;

// /Users/jessicalibman/Desktop/Past/SUMMER2017/tasksheriff/mobile-react/resources/assets/js/App.js
