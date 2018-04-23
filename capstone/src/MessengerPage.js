import React from "react";
import firebase from "firebase";
import { auth, provider, db } from "./FirestoreConfig";
import UserList from "./UserList";
import Messenger from "./Messenger";
import "./Messaging.css";

class MessengerPage extends React.Component {
  constructor(props, context) {
    console.log("this.props messenger", props);
    super(props, context);
    this.state = {
      user: this.props.user,
      userEmail: this.props.userEmail
    };
    console.log(this.state);
  }

  componentDidMount() {
    let currentComponent = this;
    let curUserList = [];
    console.log("this.state", this.state);
    db
      .collection("users")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          if (doc.get("name") !== currentComponent.state.user) {
            curUserList.push({ email: doc.id, name: doc.get("name") });
          }
        });
        currentComponent.setState({ userList: curUserList });
      });
  }

  chooseUser(e) {
    let component = this;
    this.setState({ otherUser: e }, function() {});
    this.forceUpdate();
  }

  render() {
    console.log("messenger page state", this.state);
    return (
      <div className="messenger-page">
        {this.state.userList ? (
          <UserList
            chooseUser={this.chooseUser.bind(this)}
            user={this.state.userEmail}
            curUserList={this.state.userList}
          />
        ) : (
          <div>loading</div>
        )}
        {this.state.otherUser !== undefined && this.state.otherUser !== null ? (
          <Messenger
            user={this.state.user}
            userEmail={this.state.userEmail}
            otherUser={this.state.otherUser}
          />
        ) : (
          <p>Choose a match to start chatting</p>
        )}
      </div>
    );
  }
}

export default MessengerPage;
