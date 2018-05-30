import React from 'react';
import { db } from '../FirestoreConfig';
import UserList from './UserList';
import Messenger from './Messenger';
import './Messaging.css';
import RequestDate from '../RequestDate';
import ColorMap from '../ColorMap';
import Availability2 from '../Availability2';
import SideProf from '../SignUp/Profile/sideProf'


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
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
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
        this.setState({ otherUser: e }, function () { });
        this.forceUpdate();
    }

    render() {
        return (
            <div className="messenger-page">
                {this.state.userList ? (
                    <UserList
                        chooseUser={this.chooseUser.bind(this)}
                        user={this.state.userEmail}
                        curUserList={this.state.userList}
                    />
                ) : (
                        <div>loading</div>
                    )}
                <Messenger
                    user={this.state.user}
                    userEmail={this.state.userEmail}
                    otherUser={this.state.otherUser}
                />
                {/* <div style={{ marginLeft: "70vw" }}>
                    <SideProf otherUser={this.state.otherUser} />
                </div> */}
            </div>
        );
    }
}

export default MessengerPage;
