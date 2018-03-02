import React, {Component} from 'react';
import Messenger from './Messenger';

class UserListComponent extends Component {
    constructor(props){
        super(props);
        console.log("list componenet props", this.props)
        this.chooseUser = this.chooseUser.bind(this)
        this.state = {
            user:this.props.user,
        }
    }

    chooseUser(){
        console.log(this.props.email)
        this.setState({
            otherUser:this.props.email
        })
    }
    render() {
        console.log(this.state);
        return (
            <div>
                <button onClick={this.chooseUser}>{this.props.name}</button>
                {this.state.otherUser !== undefined ? <Messenger user={this.state.user} otherUser={this.props.email}/>:
            <div/>}
            </div>
        )
    }
}
export default UserListComponent;