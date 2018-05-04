import React from 'react';
import { Redirect } from 'react-router-dom';
import { auth, db } from './FirestoreConfig';
import { Routes, PageContent } from './Enums';
import PageContainer from './PageContainer';
import './Login.css';
import Login from './Login';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            user: null
        };
        console.log('state', this.state);
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
                            console.log('this.state', component.state);

                            console.log('doc', doc.data());
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
        case Routes.EDIT_PROFILE:
            content = PageContent.EDIT_PROFILE;
            break;
        default:
            content = PageContent.MESSENGER;
            break;
        }
        console.log('state', this.state);

        return (
            <div className="">
                {this.state.authenticated ? (
                    this.state.user ? (
                        <div>
                            <PageContainer
                                user={this.state.user}
                                content={content}
                            />
                            {/* {!this.state.onBoarding && (
                                <Redirect to={'/signup'} />
                            )} */}
                            {!path ? <Redirect to={'/messenger'} /> : null}
                        </div>
                    ) : (
                        <div className="login">
                            <Login />
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
