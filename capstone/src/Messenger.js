import React from 'react';
import firebase from 'firebase';
import { auth, provider, db } from './FirestoreConfig';
import UserList from './UserList';
// import ChatInput from './ChatInput';

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
    db.collection("users").doc(this.state.user).collection("messages").doc(this.state.otherUser).set({0:""});
    db.collection("users").doc(this.state.otherUser).collection("messages").doc(this.state.user).set({0:""});

  }

  componentDidMount() {
    console.log("componentDidMout")
    // firebase.database().ref('messages/').on('value', (snapshot) => {
    //   const currentMessages = snapshot.val()

    //   if (currentMessages != null) {
    //     this.setState({
    //       messages: currentMessages
    //     })
    //   }

    // })
    let currentComponent = this;
    let curUserList = [];
    db.collection("users").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        curUserList.push({"email":doc.id, "name":doc.get("name")});
        console.log("doc.itd", doc.id + " "+ doc.get("name"))
      });
      console.log("curUserList", curUserList);
      currentComponent.setState({userList:curUserList})

    });
    console.log("this.state", this.state)
  }

  updateMessage(event) {
    console.log('updateMessage:' + event.target.value);
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event) {
    console.log('submitMessage: ' + this.state.message)
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    }
    firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)
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
        <br />
      </div>
    );
  }
}

export default Messenger;
