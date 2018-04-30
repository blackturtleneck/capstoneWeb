import React from 'react';
import { db } from './FirestoreConfig';
import UserList from './UserList';
import './Messaging.css';

class Messenger extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log('this.props messenger', props);
        this.state = {
            message: '',
            messages: [],
            user: this.props.user,
            userEmail: this.props.userEmail,
            otherUser: this.props.otherUser,
            otherUserName: this.props.otherUserName
        };

        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            otherUser: newProps.otherUser
        });
        console.log('component will receive props');
        console.log('props', this.props);
        console.log('new props are : ', newProps);
        if (newProps.otherUser !== this.props.otherUser) {
            let currentComponent = this;
            let curMessage = [];
            db
                .collection('users')
                .doc(this.props.userEmail)
                .collection('messages')
                .doc(newProps.otherUser)
                .collection('messages')
                .onSnapshot(function(querySnapshot) {
                    var curMessages = [];
                    querySnapshot.forEach(function(doc) {
                        console.log('doc.data', doc.data());
                        curMessages.push(doc.data());
                    });
                    currentComponent.setState({ messages: curMessages });
                    console.log(
                        'this.state.messages',
                        currentComponent.state.messages
                    );
                });
        }
    }

    updateMessage(event) {
        console.log('updateMessage:' + event.target.value);
        this.setState({
            message: event.target.value
        });
    }

    submitMessage(event) {
        console.log('submitMessage: ' + this.state.message);
        console.log('this.state ', this.state);
        console.log('this.props:', this.props);
        const time = new Date();

        let month = time.getMonth();
        let formattedMonth = '';
        if (month < 10) {
            formattedMonth = '0' + (month + 1);
        } else {
            formattedMonth = month + 1 + '';
        }

        let day = time.getDate();
        let formattedDay = '';
        if (day < 10) {
            formattedDay = '0' + day;
        } else {
            formattedDay = day + '';
        }

        let hours = time.getHours();
        let formattedHours = '';
        if (hours < 10) {
            formattedHours = '0' + hours;
        } else {
            formattedHours = hours + '';
        }

        let minutes = time.getMinutes();
        let formattedMinutes = '';
        if (minutes < 10) {
            formattedMinutes = '0' + minutes;
        } else {
            formattedMinutes = minutes + '';
        }

        let seconds = time.getSeconds();
        let formattedSeconds = '';
        if (seconds < 10) {
            formattedSeconds = '0' + seconds;
        } else {
            formattedSeconds = seconds + '';
        }

        const timeStamp =
            time.getFullYear() +
            ':' +
            formattedMonth +
            ':' +
            formattedDay +
            ':' +
            formattedHours +
            ':' +
            formattedMinutes +
            ':' +
            formattedSeconds +
            ':' +
            time.getMilliseconds();
        const nextMessage = {
            id: time,
            text: this.state.message,
            from: this.state.user
        };
        db
            .collection('users')
            .doc(this.props.userEmail)
            .collection('messages')
            .doc(this.state.otherUser)
            .collection('messages')
            .doc(timeStamp)
            .set(nextMessage);
        db
            .collection('users')
            .doc(this.props.otherUser)
            .collection('messages')
            .doc(this.state.userEmail)
            .collection('messages')
            .doc(timeStamp)
            .set(nextMessage);

        document.getElementById('message-box').value = '';
    }

    render() {
        console.log('messenger this.state', this.state);
        const currentMessage = this.state.messages.map((message, i) => {
            return (
                <li
                    className={
                        this.state.user === message.from
                            ? 'me message-bubble'
                            : 'them message-bubble'
                    }
                    key={message.id}
                >
                    {message.text}
                </li>
            );
        });
        // }

        return (
            <div className="messenger">
                <h2>{this.state.otherUserName}</h2>
                <ol>{currentMessage}</ol>

                <div className="button-input-wrapper">
                    <input
                        id="message-box"
                        className="send-text"
                        onChange={this.updateMessage}
                        type="text"
                        placeholder="message"
                    />
                    <button
                        className="submit-button"
                        onClick={this.submitMessage}
                    >
                        Send
                    </button>
                </div>
                <br />
            </div>
        );
    }
}

export default Messenger;
