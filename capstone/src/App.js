import React from 'react';
import firebase from 'firebase';
import {auth, provider, db} from './FirestoreConfig';
import Messenger from './Messenger';
import Dates from './Dates'
import Profile from './Profile'
import './Login.css';
// import Dates from './Dates'

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: null
        };
    }

    async login() {
      const result = await auth().signInWithPopup(provider)
      this.setState({ user: result.user });
      // Add a new document in collection "cities"n
      db.collection("users").doc(result.user.email).set({
        name: result.user.displayName,
        fName: result.additionalUserInfo.profile.first_name,
        lName: result.additionalUserInfo.profile.last_name,
        gender: result.additionalUserInfo.profile.gender,
        age: result.additionalUserInfo.profile.age_range.min,
        linkFB: result.additionalUserInfo.profile.link,
        timeZone: result.additionalUserInfo.profile.timezone,
        photoURL: result.user.photoURL
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
      const {user} = this.state;

        return (
            <div className="">
                {this.state.authenticated ?
                    (this.state.user ?
                        <div>
                          <Profile userEmail={this.state.user.email}/>
                          <Messenger/>
                          <Dates/>
                          <button onClick={this.logout.bind(this)}>
                            Logout
                          </button>
                        </div>
                    :
                        <div className="login">
                        <p>{user ? `Hi, ${user.displayName}!` : 'Hi!'}</p>
                        <button className="facebook" onClick={this.login.bind(this)}>
                          Login with Facebook
                        </button>
                      </div> 
                    )
                :
                <div></div>
                }        
                
            </div>
        );
    }
}

export default App;
