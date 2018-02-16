import React from 'react';
// import firebase from 'firebase';
// import {auth, provider} from './FirestoreConfig';
import Messenger from './Messenger';
import Login from './Login';
import Dates from './Dates'
import Profile from './Profile'

class App extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.updateMessage = this.updateMessage.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.state = {
      user: null,
      userList: [],
      message: '',
      messages: []
    }
  }
  componentDidMount() {
    console.log("componentDidMout")
    firebase.database().ref('messages/').on('value', (snapshot) => {
      const currentMessages = snapshot.val()

      if (currentMessages != null) {
        this.setState({
          messages: currentMessages
        })
      }
    })
    let users = [];
    db.collection("users").get().then(function (querySnapshot){
      querySnapshot.forEach(function(doc) {
        users.push(doc.data().name);
    })
  });
  console.log("users", users)
  this.setState({userList : users});
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

  // getUsers(){
  //   let users = [];
  //   db.collection("users").get().then(function (querySnapshot){
  //     querySnapshot.forEach(function(doc) {
  //       // doc.data() is never undefined for query doc snapshots
  //       let id = doc.id;
  //       users.push(id.name);
  //       console.log(doc.name, " => ", doc.data());
  //   })
  // });
  // }

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
  render() {  
    return (
      <div className="App">
        <div id="showResult"> </div>
        <Login user="null"> </Login>
        <Messenger></Messenger>
        <Profile></Profile>
        <Dates></Dates>
      </div>
    );
  }
}

export default App;
