import React from 'react';
import { db } from './FirestoreConfig';
import UserList from './UserList';
import Messenger from './Messenger';
import './Messaging.css';

class MessengerPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            user: this.props.user,
            userEmail: this.props.userEmail
        };
    }

    componentDidMount() {
        let currentComponent = this;
        let curUserList = [];
        db
            .collection('users')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if (doc.get('name') !== currentComponent.state.user) {
                        curUserList.push({
                            email: doc.id,
                            name: doc.get('name')
                        });
                    }
                });
                currentComponent.setState({ userList: curUserList });
            });
    }

    chooseUser(e) {
        this.setState({ otherUser: e }, function() {
            console.log('state after choose user', this.state);
        });
        this.forceUpdate();
    }

    render() {
        return (
            <div className="messenger-page">
                {this.state.userList ? (
                    <UserList
                        chooseUser={this.chooseUser.bind(this)}
                        user={this.props.userEmail}
                        curUserList={this.state.userList}
                    />
                ) : (
                    <div>loading</div>
                )}
                {this.state.otherUser !== undefined &&
                this.state.otherUser !== null ? (
                        <Messenger
                            user={this.state.user}
                            userEmail={this.state.userEmail}
                            otherUser={this.state.otherUser}
                        />
                    ) : (
                        <p>Choose a match to start chatting</p>
                    )}
            </div>
        );
    }
}

export default MessengerPage;
