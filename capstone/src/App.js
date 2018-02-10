import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './FirestoreConfig';
import Messenger from './Messenger';
import Login from './Login';
import Profile from './Profile'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Login user="null"> </Login>
        <Messenger></Messenger>
        <Profile></Profile>
      </div>
    );
  }
}

export default App;
