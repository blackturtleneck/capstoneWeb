import React from 'react';
import MessengerPage from './MessengerPage';
import './Login.css';
import { PageContent } from './Enums';
import DatesSelection from './DatesSelection';
import Header from './navBar/Header';
import Profile from './Profile/Profile';

class PageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: this.props.user,
            content: this.props.content
        };
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
                    <Profile user={this.state.user.displayName} userEmail={this.state.user.email} />
                )}
            </div>
        );
    }
}

export default PageContainer;
