import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth, db, provider } from './FirestoreConfig';
import { Routes, PageContent } from './Enums';
import PageContainer from './PageContainer';
import './Login.css';
import Login from './Login';
import FB from 'fb'

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            user: null,
            newUser: false,
            token: ''
        };
    }

    componentDidMount() {
        // auth.signOut()
        let component = this;
        // check whether user is logged in
        auth
            .onAuthStateChanged(user => {
                if (user) {
                    this.setState({
                        authenticated: true,
                        user: {
                            displayName: user.displayName,
                            email: user.email
                        }
                    });
                } else {
                    this.setState({
                        authenticated: true,
                        user: null
                    });
                }
            })
            .bind(this);
    }

    async login() {
        const result = await auth.signInWithPopup(provider);
        var token = result.credential.accessToken;
        // this.setState({ token: token });
        const getID = "https://graph.facebook.com/me?access_token=" + token;
        let uid = '';
        let photoArray = [];

        db
            .collection('users')
            .doc(result.user.email)
            .set({
                uid: result.user.uid,
                age: result.additionalUserInfo.profile.age_range.min,
                linkFB: result.additionalUserInfo.profile.link,
                photoURL: result.user.photoURL
            }, { merge: true })
            .then(function () {
                // eslint-disable-line no-console
                console.log('Document with first FB successfully written!');

                fetch(getID)
                    .then(function (response) {
                        return response.json();
                    }).then(function (body) {
                        uid = body.id;
                        FB.api(
                            "/" + uid + "/photos?access_token=" + token,
                            function (response) {
                                if (response && !response.error) {
                                    /* handle the result */
                                    // console.log("api response", response)
                                    photoArray = response.data;

                                    /* make the API call */
                                    // Add a new document in collection "users"
                                    db
                                        .collection('users')
                                        .doc(result.user.email)
                                        .set({
                                            photos: photoArray
                                        }, { merge: true })
                                        .then(function () {
                                            /*eslint-disable-line no-console*/
                                            console.log('Document successfully written!');
                                            console.log(token)
                                            photoArray.forEach(function (photo) {
                                                FB.api(
                                                    "/" + photo.id + "?access_token=" + token,
                                                    function (response) {
                                                        if (response && !response.error) {
                                                            /* handle the result */
                                                            console.log("api response", response)
                                                            // photoArray = response.data;
                                                        } else {
                                                            console.log("error", response.error)
                                                        }
                                                        // );
                                                    })
                                            })
                                        })
                                        .catch(function (error) {
                                            // eslint-disable-line no-console
                                            console.error('Error writing document: ', error);
                                        });
                                }
                            }
                        );
                        //     return photoArray;
                        // }).then(function () {
                        //     photoArray.forEach(function (photo) {
                        //         FB.api(
                        //             "/" + photo.id + "?access_token=" + token,
                        //             function (response) {
                        //                 if (response && !response.error) {
                        //                     /* handle the result */
                        //                     console.log("api response", response)
                        //                     // photoArray = response.data;
                        //                 }
                        //                 // );
                        //             })
                        //     })
                    }).catch(function (error) {
                        console.log(error)
                    })
            })
            .catch(function (error) {
                // eslint-disable-line no-console
                console.error('Error writing document: ', error);
            });



        // this.setState({
        //     // user: result.user,
        //     token: token
        // });

    }

    render() {
        // auth.signOut();
        let path = window.location.href.split('/')[3];
        let content = '';
        switch (path) {
            case Routes.PROFILE:
                content = PageContent.PROFILE;
                break;
            case Routes.DATE_SELECTION:
                content = PageContent.DATE_SELECTION;
                break;
            case Routes.SIGN_UP:
                content = PageContent.SIGN_UP;
                break;
            default:
                content = PageContent.MESSENGER;
                break;
        }
        return (
            <div className="">
                {this.state.authenticated ? (
                    this.state.user ? (
                        <div>
                            <PageContainer
                                user={this.state.user}
                                content={content}
                                token={this.state.token}
                            />
                            {/* {!this.state.onBoarding && (
                                <Redirect to={'/signup'} />
                            )} */}
                            {!path ? <Redirect to={'/messenger'} /> : null}
                        </div>
                    ) : (
                            <div className="login">
                                <Login login={this.login} />
                                <Redirect to={'/'} />
                            </div>
                        )
                ) : (
                        // if login hasn't mounted
                        <div />
                    )}
            </div>
        );
    }
}

export default App;
