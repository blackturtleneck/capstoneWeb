import React from 'react';
import firebase from 'firebase';
import { auth, provider, db } from './FirestoreConfig';
import UserList from './UserList';
import './Messaging.css';

class MessengerPage extends React.Component {
    constructor(props, context) {
        console.log("this.props messenger", props);
        super(props, context)
        this.state = {
            user: this.props.user,
            userEmail: this.props.userEmail,
        }
        console.log(this.state);
    }

    componentDidMount() {
        let currentComponent = this;
        let curUserList = [];
        db.collection("users").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                if(doc.get("name") !== currentComponent.state.user){
                    curUserList.push({ "email": doc.id, "name": doc.get("name") });
                }
            });
            currentComponent.setState({ userList: curUserList })
        });
    }

    render() {

        // console.log("this.state", this.state);
        const currentMessage = this.state.messages.map((message, i) => {
            return (
                <li key={message.id}>{message.text}</li>
            )
        })

        return (
            <div className="messenger-page">
                {this.state.userList ? 
                <UserList user={this.props.userEmail} curUserList={this.state.userList} />
                    : 
                    <div>loading</div>}        
            </div>
        );
    }
}

export default MessengerPage;
