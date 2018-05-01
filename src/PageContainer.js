import React from 'react';
import { auth } from './FirestoreConfig';
import MessengerPage from './MessengerPage';
import './Login.css';
import { PageContent } from './Enums';
import DatesSelection from './DatesSelection';
import Header from './Header';
import Profile from './Profile';

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

    render() {
        return (
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
                <button onClick={this.logout.bind(this)}>Logout</button>
            </div>
        );
    }
}

export default PageContainer;
