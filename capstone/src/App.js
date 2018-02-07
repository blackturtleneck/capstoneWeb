import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './client';
import Messenger from './Messenger';
import Login from './Login';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Login user="null"> </Login>
        <Messenger></Messenger>
      </div>
    );
  }
}

export default App;
