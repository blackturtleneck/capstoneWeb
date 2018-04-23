import React, { Component } from 'react';
import Messenger from './Messenger';
import './UserList.css';

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        console.log('list componenet props', this.props);
        this.state = {
            user: this.props.user,
            otherUser: this.props.email
        };
    }

    chooseUser = () => {
        let curOtherUser = this.state.otherUser;
        this.props.chooseUser(curOtherUser);
    };

    render() {
        return (
            <div>
                <button
                    className="user-list-component"
                    onClick={this.chooseUser.bind(this)}
                >
                    {this.props.name}
                </button>
                {/* {this.state.otherUser !== undefined ? <Messenger otherUserName={this.props.name} user={this.state.user} otherUser={this.props.email}/>: */}
                <div />
            </div>
        );
    }
}
export default UserListComponent;
