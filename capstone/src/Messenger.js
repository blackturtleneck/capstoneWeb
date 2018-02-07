import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './client';

class Messenger extends React.Component {

  render() {
    return (
      <div className="messenger">
        I'm a messenger
      </div>
    );
  }
}

export default Messenger;
