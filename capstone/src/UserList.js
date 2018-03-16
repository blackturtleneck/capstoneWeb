import React from 'react';
import UserListComponent from './UserListComponent';

class UserList extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.curUserList);
    }
    render() {

        return (
            <div>
                <h1>Friends</h1>
                {
                    this.props.curUserList.map((item, index) => {
                        return <UserListComponent user={this.props.user}name={item.name} email={item.email}/>
                    })
                }
                </div>
        )
    }
}

export default UserList;