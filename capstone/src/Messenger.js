import React from 'react';
import firebase from 'firebase';
import { auth, provider, db } from './FirestoreConfig';
import UserList from './UserList';
import './Messaging.css';

class Messenger extends React.Component {
  constructor(props, context) {
    super(props, context)
    console.log("this.props messenger", props);

    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      // messages: [],
      user: this.props.user,
      userEmail: this.props.userEmail,
      otherUser: this.props.otherUser,
      otherUserName: this.props.otherUserName

    }

    console.log(this.state);

    // create a collection of message documents between this user and another user
    db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages").doc("0").set({ "from": null, id: 0, text: "" });
    db.collection("users").doc(this.props.otherUser).collection("messages").doc(this.state.user).collection("messages").doc("0").set({ "from": null, id: 0, text: "" });

    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }

  componentWillMount() {
        // pull down previous messages
        let currentComponent = this;
        let prevMessages = [];
        db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages").get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            prevMessages.push(doc.data)
          });
          currentComponent.setState({
            messages: prevMessages
          })
        });
        console.log(currentComponent.state)
  }


  componentDidMount() {
    let currentComponent = this;
    let curMessage = []
    db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages")
      .onSnapshot(function (querySnapshot) {
        var curMessages = [];
        querySnapshot.forEach(function (doc) {
          curMessages.push(doc.data());
        });
        currentComponent.setState({ messages: curMessages });
      });
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
      text: this.state.message,
      from: this.state.user
    }
    db.collection("users").doc(this.props.user).collection("messages").doc(this.state.otherUser).collection("messages").doc(this.state.messages.length + "").set(nextMessage);
    db.collection("users").doc(this.props.otherUser).collection("messages").doc(this.state.user).collection("messages").doc(this.state.messages.length + "").set(nextMessage);
  }

  render() {
    console.log("this.state.messages", this.state.messages);
    // const currentMessage = {}
    // if (this.state.messages) {
      //  const currentMessage = this.state.messages.map((message, i) => {
      //   return (
      //     <li className={this.state.user === message.from ? "me message-bubble" : "them message-bubble"} key={message.id}>{message.text}</li>
      //   )
      // })
    // }

    return (
      <div className="messenger">
        <h2>{this.state.otherUserName}</h2>
          <ol>
            {this.state.messages ? this.state.messages.map((message, i) => {
         
          <li className={this.state.user === message.from ? "me message-bubble" : "them message-bubble"} key={message.id}>{message.text}</li>
        
      }) : <p>loading</p>}
          </ol>

        <div className="button-input-wrapper">
          <input className="send-text" onChange={this.updateMessage} type="text" placeholder="message" />
          <button className="submit-button" onClick={this.submitMessage}>Send</button>
        </div>
        <br />
      </div>
    );
  }
}

export default Messenger;
