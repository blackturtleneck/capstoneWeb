import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth, db, provider } from './FirestoreConfig';
import { Routes, PageContent } from './Enums';
import PageContainer from './PageContainer';
import './Login.css';
import Login from './Login';

let path = '';
let newUser = false;
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
                        .onSnapshot(function(doc) {
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
        this.setState({ user: result.user });
        // Add a new document in collection "users"
        db
            .collection('users')
            .doc(result.user.email)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    db
                        .collection('users')
                        .doc(result.user.email)
                        .set(
                            {
                                newUser: true
                            },
                            { merge: true }
                        )
                        .then(function() {
                            newUser = true;
                            // eslint-disable-line no-console
                            console.log('Document successfully written!');
                            db
                                .collection('users')
                                .doc(result.user.email)
                                .set(
                                    {
                                        uid: result.user.uid,
                                        age:
                                            result.additionalUserInfo.profile
                                                .age_range.min,
                                        linkFB:
                                            result.additionalUserInfo.profile
                                                .link,
                                        photoURL: result.user.photoURL
                                    },
                                    { merge: true }
                                )
                                .then(function() {
                                    // eslint-disable-line no-console
                                    console.log(
                                        'Document successfully written!'
                                    );
                                })
                                .catch(function(error) {
                                    // eslint-disable-line no-console
                                    console.error(
                                        'Error writing document: ',
                                        error
                                    );
                                });
                        })
                        .catch(function(error) {
                            // eslint-disable-line no-console
                            console.error('Error writing document: ', error);
                        });
                } else {
                    db
                        .collection('users')
                        .doc(result.user.email)
                        .set(
                            {
                                uid: result.user.uid,
                                age:
                                    result.additionalUserInfo.profile.age_range
                                        .min,
                                linkFB: result.additionalUserInfo.profile.link,
                                photoURL: result.user.photoURL
                            },
                            { merge: true }
                        )
                        .then(function() {
                            // eslint-disable-line no-console
                            console.log('Document successfully written!');
                        })
                        .catch(function(error) {
                            // eslint-disable-line no-console
                            console.error('Error writing document: ', error);
                        });
                }
            });
    }

    render() {
        let path = window.location.href.split('/')[3];
        let content = '';
        // if (newUser) {
        //     path = Routes.SIGN_UP;
        // }

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
                                newUser={newUser}
                            />
                            {!path ? <Redirect to={'/messenger'} /> : null}
                        </div>
                    ) : (
                        <div className="login">
                            <button
                                className="facebook"
                                onClick={this.login.bind(this)}
                            >
                                Login with Facebook
                            </button>
                            );
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
