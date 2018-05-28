import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth, db, provider } from './FirestoreConfig';
import { Routes, PageContent } from './Enums';
import PageContainer from './PageContainer';
import './Login.css';
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

    updateState() {
        //causes no render
        db
            .collection('users')
            .doc(this.state.user.email)
            .get()
            .then(doc => {
                if (doc.exists) {
                    if (doc.data().newUser) {
                        this.setState({ newUser: true })
                    }
                }
                console.log("update state", this.state)
            })
    }

    async login() {
        const result = await auth.signInWithPopup(provider);
        const token = result.credential.accessToken;
        this.setState({ token: token });
        const getID = "https://graph.facebook.com/me?access_token=" + token;
        let uid = '';
        let photoArray = [];
        let component = this;

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
                            photoArray = response.data;
                            db
                                .collection('users')
                                .doc(result.user.email)
                                .get()
                                .then(doc => {
                                    if (!doc.exists) {
                                        db
                                            .collection('users')
                                            .doc(result.user.email)
                                            .set({
                                                newUser: true,
                                                photos: photoArray
                                            })
                                        component.updateState();
                                    }
                                })

                            /* make the API call */
                            // Add a new document in collection "users"
                            // db
                            //     .collection('users')
                            //     .doc(result.user.email)
                            //     .set({
                            //         photos: photoArray
                            //     }, { merge: true })
                            //     .then(function () {
                            //         /*eslint-disable-line no-console*/
                            //         console.log('Document successfully written!');
                            //     })
                            //     .catch(function (error) {
                            //         // eslint-disable-line no-console
                            //         console.error('Error writing document: ', error);
                            //     });
                        }
                    }
                );
            }).catch(function (error) {
                console.log(error)
            })

    }

    render() {
        // auth.signOut();
        let content = '';
        let path = window.location.href.split('/')[3];
        console.log(this.state)
        // if (path !== PageContent.SIGN_UP && this.state.newUser) {
        if (this.state.newUser) {
            //     return <Redirect to={'/signup'} />
            //     // }

            //     // if (this.state.newUser) {
            //     //     content = PageContent.SIGN_UP;
            //     //     return <Redirect to={'/signup'} />
            // } else if (path === PageContent.SIGN_UP && this.state.newUser) {
            content = PageContent.PROFILE;
        } else {
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

            console.log(content)
            return (
                <div className="">
                    {this.state.authenticated ? (
                        this.state.user ? (
                            <div>
                                {/* {this.state.new && <Redirect to={'/signup'} />} */}

                                <PageContainer
                                    user={this.state.user}
                                    content={content}
                                    token={this.state.token}
                                    signup={this.state.newUser}
                                />
                            </div>
                        ) : (
                                <div className="login">
                                    <button className="facebook" onClick={this.login.bind(this)}>
                                        Login with Facebook
                                </button>
                                    <Redirect to={'/'} />
                                </div>
                            )
                    ) : (
                            // if login hasn't mounted
                            <div>Loading data... </div>
                        )}
                </div>
            );
        }
    }
}


export default App;
