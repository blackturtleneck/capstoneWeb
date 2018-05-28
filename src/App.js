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
        var token = result.credential.accessToken;
        console.log("result", result)
        console.log("token", token)
        const getID = "https://graph.facebook.com/me?access_token=" + token;
        let uid = '';
        let photoArray = [];

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
                            photoArray = response.data;

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
                                    photoURL: result.user.photoURL,
                                    photos: photoArray
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
                    }
                );

            }).catch(function (error) {
                console.log(error)
            })

        this.setState({
            // user: result.user,
            token: token
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
