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
            user: null
        };
    }

    componentDidMount() {
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
                    db
                        .collection('users')
                        .doc(this.state.user.email)
                        .onSnapshot(function (doc) {
                            if (!doc.data().onBoarding) {
                                component.setState({
                                    onBoarding: false
                                });
                            } else {
                                component.setState({
                                    onBoarding: true
                                });
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
        // FB.login(function (response) {
        //     // handle the response
        //     if (response.authResponse) {
        //         console.log('Welcome!  Fetching your information.... ');
        //         FB.api('/me', function (response) {
        //             console.log('Good to see you, ' + response.name + '.');
        //         });
        //     } else {
        //         console.log('User cancelled login or did not fully authorize.');
        //     }
        //     console.log("response with photos", response)

        // }, { scope: 'user_photos' });

        var token = result.credential.accessToken;
        console.log("result", result)
        console.log("token", token)
        const getID = "https://graph.facebook.com/me?access_token=" + token;
        let uid = '';

        fetch(getID)
            .then(function (response) {
                return response.json();
            }).then(function (body) {
                uid = body.id;
                console.log("uid", uid)
                FB.api(
                    "/" + uid + "/photos?access_token=" + token,
                    function (response) {
                        if (response && !response.error) {
                            /* handle the result */
                            console.log("api response", response)
                        }
                    }
                );

            }).catch(function (error) {
                console.log(error)
            })

        this.setState({
            // user: result.user,
            token: token
        });

        /* make the API call */
        // Add a new document in collection "users"
        db
            .collection('users')
            .doc(result.user.email)
            .set({
                name: result.user.displayName,
                uid: result.user.uid,
                fName: result.additionalUserInfo.profile.first_name,
                lName: result.additionalUserInfo.profile.last_name,
                gender: result.additionalUserInfo.profile.gender,
                age: result.additionalUserInfo.profile.age_range.min,
                linkFB: result.additionalUserInfo.profile.link,
                timeZone: result.additionalUserInfo.profile.timezone,
                photoURL: result.user.photoURL
            }, { merge: true })
            .then(function () {
                /*eslint-disable-line no-console*/
                console.log('Document successfully written!');
            })
            .catch(function (error) {
                // eslint-disable-line no-console
                console.error('Error writing document: ', error);
            });
    }

    render() {
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
