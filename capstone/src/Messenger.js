import React from 'react';

import firebase from 'firebase';
import {auth, provider, db} from './FirestoreConfig';
import ChatInput from './ChatInput';
import Login from './Login';

class Messenger extends React.Component {
  constructor(props, context){
    super(props, context)
    console.log("this.props", this.props);
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      messages: [],
      user: this.props.user
    }
  }

  componentDidMount(){
    console.log("componentDidMout")
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const currentMessages = snapshot.val()

      if(currentMessages != null){
        this.setState({
          messages: currentMessages
        })
      }
    })
  }

  updateMessage(event){
    console.log('updateMessage:' + event.target.value);
    this.setState({
      message: event.target.value
    })
  }

  submitMessage(event){
    console.log('submitMessage: ' + this.state.message)
    const nextMessage = {
      id: this.state.messages.length,
      text: this.state.message
    }
    firebase.database().ref('messages/' + nextMessage.id).set(nextMessage)
  }

  render() {
    const currentMessage = this.state.messages.map((message, i) => {
      return (
        <li key={message.id}>{message.text}</li>
      )
    })
    return (
      <div className="messenger">
      <ChatInput/>
      <ol>
        {currentMessage}
        </ol>
        <input onChange={this.updateMessage} type="text" placeholder="message"/>
        <br/>
        <button onClick={this.submitMessage}>Submit Message</button>
      </div>
    );
  }
}

export default Messenger;
