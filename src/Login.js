import React, { Component } from 'react';
import { auth, provider, db } from './FirestoreConfig';

class Login extends Component {
    // async login() {
    //     const result = await auth.signInWithPopup(provider);
    //     this.setState({ user: result.user });
    //     // Add a new document in collection "users"
    //     db
    //         .collection('users')
    //         .doc(result.user.email)
    //         .get()
    //         .then(doc => {
    //             if (!doc.exists) {
    //                 db
    //                     .collection('users')
    //                     .doc(result.user.email)
    //                     .set({
    //                         newUser: true
    //                     }, { merge: true })
    //                     .then(function () {
    //                         // eslint-disable-line no-console
    //                         console.log('Document successfully written!');
    //                         db
    //                             .collection('users')
    //                             .doc(result.user.email)
    //                             .set({
    //                                 uid: result.user.uid,
    //                                 age: result.additionalUserInfo.profile.age_range.min,
    //                                 linkFB: result.additionalUserInfo.profile.link,
    //                                 photoURL: result.user.photoURL
    //                             }, { merge: true })
    //                             .then(function () {
    //                                 // eslint-disable-line no-console
    //                                 console.log('Document successfully written!');
    //                             })
    //                             .catch(function (error) {
    //                                 // eslint-disable-line no-console
    //                                 console.error('Error writing document: ', error);
    //                             });

    //                     })
    //                     .catch(function (error) {
    //                         // eslint-disable-line no-console
    //                         console.error('Error writing document: ', error);
    //                         //                     db
    //                         // .collection('users')
    //                         // .doc(result.user.email)
    //                         // .set({
    //                         //     uid: result.user.uid,
    //                         //     age: result.additionalUserInfo.profile.age_range.min,
    //                         //     linkFB: result.additionalUserInfo.profile.link,
    //                         //     photoURL: result.user.photoURL
    //                         // }, { merge: true })
    //                         // .then(function () {
    //                         //     // eslint-disable-line no-console
    //                         //     console.log('Document successfully written!');
    //                         // })
    //                         // .catch(function (error) {
    //                         //     // eslint-disable-line no-console
    //                         //     console.error('Error writing document: ', error);
    //                         // });

    //                     });

    //             } else {
    //                 db
    //                     .collection('users')
    //                     .doc(result.user.email)
    //                     .set({
    //                         uid: result.user.uid,
    //                         age: result.additionalUserInfo.profile.age_range.min,
    //                         linkFB: result.additionalUserInfo.profile.link,
    //                         photoURL: result.user.photoURL
    //                     }, { merge: true })
    //                     .then(function () {
    //                         // eslint-disable-line no-console
    //                         console.log('Document successfully written!');
    //                     })
    //                     .catch(function (error) {
    //                         // eslint-disable-line no-console
    //                         console.error('Error writing document: ', error);
    //                     });

    //             }
    //         });
    // }

    render() {
        return (
            <button className="facebook" onClick={this.login.bind(this)}>
                Login with Facebook
            </button>
        );
    }
}

export default Login;
