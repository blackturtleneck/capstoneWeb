import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './FirestoreConfig';
import Messenger from './Messenger';
import Login from './Login';
import Profile from './Profile'
import Dates from './Dates'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Login user="null"> </Login>
        <Messenger></Messenger>
        <Profile></Profile>
        <Dates></Dates>
      </div>
    );
  }
}

export default App;
