import React from 'react';
import UserListComponent from './UserListComponent';
import './UserList.css';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    chooseUser(curOtherUser) {
        this.props.chooseUser(curOtherUser);
    }

    render() {
        return (
            <div className="user-list-wrapper">
                {this.props.curUserList.map((item, index) => {
                    return (
                        <UserListComponent
                            chooseUser={this.chooseUser.bind(this)}
                            user={this.props.user}
                            name={item.name}
                            email={item.email}
                            key={index}
                        />
                    );
                })}
            </div>
        );
    }
}

export default UserList;
