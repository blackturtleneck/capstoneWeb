import React from 'react';
import firebase from 'firebase';
import {auth, provider} from './FirestoreConfig';

class Profile extends React.Component {

  render() {
    return (
        <div className="messenger">
            Bio: <input type="text" />
            <form action="/action_page.php">
                <input type="file" name="pic" accept="image/*"/>
                <input type="submit"/>
            </form>
        </div>
    );
  }
}

export default Profile;
