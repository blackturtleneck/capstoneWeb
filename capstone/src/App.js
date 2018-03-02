import React from 'react';
import {auth, provider, db} from './FirestoreConfig';
import MessengerPage from './MessengerPage';
// import Dates from './Dates'
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
            <div className="">
                {this.state.authenticated ?
                    (this.state.user ?
                        <div>
                          <MessengerPage user={this.state.user.displayName} userEmail={this.state.user.email}/>
                          {/* <Dates/> */}
                          <button onClick={this.logout.bind(this)}>
                          Logout
                        </button>
                        </div>
                    :
                        <div className="login">
                        {/* <p>{user ? `Hi, ${user.displayName}!` : 'Welcome to our unamed app'}</p> */}
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
