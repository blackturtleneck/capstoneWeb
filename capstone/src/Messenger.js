import React from 'react';
import firebase from 'firebase';
import { auth, provider, db } from './FirestoreConfig';
import UserList from './UserList';

class Messenger extends React.Component {
  constructor(props, context) {
    console.log("this.props messenger", props);
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      messages: [],
      user: this.props.user,
      userEmail: this.props.userEmail,
      otherUser: this.props.otherUser
    }
    // create a collection of message documents between this user and another user
    db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages").doc("0").set({"from":null, id:0, text:""});
    db.collection("users").doc(this.props.otherUser).collection("messages").doc(this.state.user).collection("messages").doc("0").set({"from":null, id:0, text:""});
    ;
  

    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }

  componentDidMount() {
    // console.log("componentDidMout")
    // firebase.database().ref('messages/').on('value', (snapshot) => {
    //   const currentMessages = snapshot.val()

    //   if (currentMessages != null) {
    //     this.setState({
    //       messages: currentMessages
    //     })
    //   }

    // })
    let currentComponent = this;
    let curMessage = []

    db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages")
    .onSnapshot(function(querySnapshot) {
      var curMessages = [];
      querySnapshot.forEach(function(doc) {
          curMessages.push(doc.data());
      });
    // .onSnapshot(function (doc) {
    //   console.log("doc data", doc.data());
    //   for (let i = 0; i < doc.data().length; i++) {
    //     console.log("data", doc.data()[i])
    //     curMessage.push(doc.data()[i])
    //   }
      currentComponent.setState({ messages: curMessages });
    });
    // querySnapshot.forEach(function(doc) {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    // });

  }


  //   db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).get().then(function (querySnapshot) {
  //     querySnapshot.forEach(function (doc) {
  //       console.log("this worked?!")
  //       // doc.data() is never undefined for query doc snapshots
  //       curUserList.push({ "email": doc.id, "name": doc.get("name") });
  //       console.log("doc.itd", doc.id + " " + doc.get("name"))
  //     });
  //     console.log("curUserList", curUserList);
  //     currentComponent.setState({ userList: curUserList })

  //   });
  //   console.log("this.state", this.state)
  // }

  updateMessage(event) {
    console.log('updateMessage:' + event.target.value);
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event) {
    const thisUser = db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages");
    const otherUser = db.collection("users").doc(this.props.otherUser).collection("messages").doc(this.state.user).collection("messages");

    console.log('submitMessage: ' + this.state.message)
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message,
      from: this.state.user
    }
    // firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)
    db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages").doc(this.state.messages.length + "").set(nextMessage);
    db.collection("users").doc(this.props.otherUser).collection("messages").doc(this.state.user).collection("messages").doc(this.state.messages.length + "").set(nextMessage);
  }

  render() {
    console.log("this.state", this.state);
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li key={message.id}>{message.text}</li>
      )
    })
    return (
      <div className="messenger">
        <ol>
          {currentMessage}
        </ol>
        <input onChange={this.updateMessage} type="text" placeholder="message" />
        <button onClick={this.submitMessage}>Submit Message</button>
        <br />
      </div>
    );
  }
}

export default Messenger;
