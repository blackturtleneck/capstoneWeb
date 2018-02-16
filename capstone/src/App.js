import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './FirestoreConfig';
import Messenger from './Messenger';
import Login from './Login';
import Dates from './Dates'
import Profile from './Profile'

class App extends React.Component {

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
