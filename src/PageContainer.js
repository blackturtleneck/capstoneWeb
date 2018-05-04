import React from 'react';
import { auth, db } from './FirestoreConfig';
import MessengerPage from './Messenger/MessengerPage';
import './Login.css';
import { PageContent } from './Enums';
import { Redirect } from 'react-router-dom';
import DatesSelection from './DatesSelection';
import Header from './navBar/Header';
import Profile from './Profile/Profile';
import SignUpController from './SignUp/SignUpController';

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: this.props.user,
            content: this.props.content
        };
    }

    logout() {
        auth.signOut();
    }

    componentDidMount() {
        let component = this;
        db
            .collection('users')
            .doc(this.state.user.email)
            .get()
            .then(function(doc) {
                // .onSnapshot(function(doc) {
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
    }

    render() {
        console.log('state', this.state);
        return (
            <div>
                {!this.state.onBoarding ? (
                    <div>
                        {/* <Redirect to={'/signup'} /> */}
                        {this.state.content === PageContent.SIGN_UP && (
                            <SignUpController user={this.state.user} />
                        )}
                    </div>
                ) : (
                    <div>
                        {/* <Redirect to={'/messenger'} /> */}
                        <Header userEmail={this.state.user.email} />
                        {this.state.content === PageContent.MESSENGER && (
                            <MessengerPage
                                user={this.state.user.displayName}
                                userEmail={this.state.user.email}
                            />
                        )}

                        {this.state.content === PageContent.DATE_SELECTION && (
                            <DatesSelection />
                        )}

                        {this.state.content === PageContent.PROFILE && (
                            <Profile userEmail={this.state.userEmail} />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default PageContainer;
