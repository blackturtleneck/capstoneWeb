import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './client';

class Messenger extends React.Component {
  constructor(props, context){
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      message: '',
      messages: [
        {id:0, text:'first message'},
        {id:1, text:'second message'},
        {id:2, text:'third message'}
      ]
    }
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
    let list = Object.assign([], this.state.messages)
    list.push(nextMessage)
    this.setState({
      messages: list
    })
  }

  render() {
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
        I'm a messenger
        <input onChange={this.updateMessage} type="text" placeholder="message"/>
        <br/>
        <button onClick={this.submitMessage}>Submit Message</button>
      </div>
    );
  }
}

export default Messenger;
