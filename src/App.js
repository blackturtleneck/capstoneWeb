import React from "react";
import { Redirect } from "react-router-dom";
import { storageRef, auth, provider, db } from "./FirestoreConfig";
import { Routes, PageContent } from "./Enums";
import PageContainer from "./PageContainer";
import "./Login.css";
import { Link } from "react-router-dom";
import Login from "./Login";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      user: null
    };
    console.log("state", this.state);
  }

  componentDidMount() {
    // check whether user is logged in
    auth
      .onAuthStateChanged(user => {
        if (user) {
          this.setState({
            authenticated: true,
            user: {
              displayName: user.displayname,
              email: user.email
            }
          });
        } else {
          this.setState({
            authenticated: true,
            user: null
          });
        }
      })
      .bind(this);
  }

  render() {
    let path = window.location.href.split("/")[3];
    let content = "";
    switch (path) {
      case Routes.PROFILE:
        content = PageContent.PROFILE;
        break;
      case Routes.DATE_SELECTION:
        content = PageContent.DATE_SELECTION;
        break;
      default:
        content = PageContent.MESSENGER;
        break;
    }
    return (
      <div className="">
        {this.state.authenticated ? (
          this.state.user ? (
            <div>
              <PageContainer user={this.state.user} content={content} />
              {!path ? <Redirect to={"/messenger"} /> : null}
            </div>
          ) : (
            <div className="login">
              <Login />
              <Redirect to={"/"} />
            </div>
          )
        ) : (
          // if login hasn't mounted
          <div />
        )}
      </div>
    );
  }
}

export default App;

// /Users/jessicalibman/Desktop/Past/SUMMER2017/tasksheriff/mobile-react/resources/assets/js/App.js