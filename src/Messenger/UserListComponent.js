import React, { Component } from 'react';
import './UserList.css';

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            otherUser: this.props.email
        };
    }

    chooseUser() {
        let curOtherUser = this.state.otherUser;
        this.props.chooseUser(curOtherUser);
    }

    render() {
        return (
            <div>
                {this.state.user !== this.state.otherUser && (
                    <button
                        className="user-list-component"
                        onClick={this.chooseUser.bind(this)}
                    >
                        {this.props.name}
                    </button>
                )}
                <div />
            </div>
        );
    }
}
export default UserListComponent;
