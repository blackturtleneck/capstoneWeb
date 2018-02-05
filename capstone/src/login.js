import React, { Component } from 'react';
import logo from './logo.svg'; // <--- remove this line
import './App.css';
import firebase from './firebase.js'; // <--- add this line

class Login extends Component {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
return {
    render() {
        <div>

            <form onSubmit={this.handleSubmit}>
                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} value={this.state.username} />
                <input type="text" name="currentItem" placeholder="What are you bringing ?" onChange={this.handleChange} value={this.state.currentItem} />
                <button>Add Item</button>
            </form>
        </div>
    }
}
export default Login;




// class Login extends React.Component {

//     render() {
//         return (   
//             <div className="col-sm-6">         
//             <form id="login-form" onSubmit={(e) => this.login(e)}>
//                 <legend id="login-legend">Login</legend>

//                 <ul className="list-unstyled">
//                     <li className="form-group">
//                         <input 
//                             type="email" 
//                             id="login-email" 
//                             className="form-control" placeholder="Email Address"
//                             ref="email"/>
//                     </li>

//                     <li className="form-group">
//                         <input 
//                             type="password"
//                             id="login-password" 
//                             className="form-control" 
//                             placeholder="Password"
//                             ref="password" />
//                     </li>

//                     <li className="form-group">
//                         <button
//                             id="login-button"
//                             type="submit"
//                             className="btn btn-success btn-lg">Login</button>
//                     </li>
//                 </ul>
//             </form>
//             <div id="signup-error" className="alert alert-danger" role="alert" ref="login"></div>
//             </div>
//         );
//     }

//     login(e) {
//         e.preventDefault();
//         var loginError = this.refs.login;
//         var email = this.refs.email.value;
//         var password = this.refs.password.value;

//         firebase.auth().signInWithEmailAndPassword(email, password)
//         .then(function() {
//         })
//         .catch(function (error) {
//             console.log(error);
//             loginError.textContent = error.message;
//             loginError.classList.add('active');
//         });
//     }

// }