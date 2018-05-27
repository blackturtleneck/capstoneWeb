import React from 'react';
import { auth, db } from './FirestoreConfig';
import MessengerPage from './Messenger/MessengerPage';
import './Login.css';
import { PageContent } from './Enums';
import DatesSelection from './DatesSelection';
import Header from './navBar/Header';
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
            .then(function (doc) {
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
        return (
            <div>

                {this.state.onBoarding && (
                    <div>
                        <Header userEmail={this.state.user.email} />
                        {/* <Redirect to={'/messenger'} /> */}
                    </div>
                )}

                {this.state.content === PageContent.DATE_SELECTION && (
                    <DatesSelection />
                )}
                {this.state.content === PageContent.PROFILE && (
                    <SignUpController user={this.state.user} />
                )}
                {this.state.content === PageContent.SIGN_UP && (
                    <SignUpController user={this.state.user} />
                )}
                <div>
                    {/* <Redirect to={'/messenger'} /> */}
                    {this.state.content === PageContent.MESSENGER && (
                        <MessengerPage
                            user={this.state.user.displayName}
                            userEmail={this.state.user.email}
                            token={this.props.token}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default PageContainer;
