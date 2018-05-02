import React from 'react';
import { auth, db } from './FirestoreConfig';
import MessengerPage from './Messenger/MessengerPage';
import './Login.css';
import { PageContent } from './Enums';
import DatesSelection from './DatesSelection';
import Header from './Header';
import Profile from './Profile';
import { Redirect } from 'react-router-dom';

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
                    <Redirect to={'/signup'} />
                ) : (
                    <div>
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
                <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
        );
    }
}

export default PageContainer;
