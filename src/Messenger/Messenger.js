import React from 'react';
import { db } from '../FirestoreConfig';
import './Messaging.css';
import RequestDate from '../RequestDate';
import ReceiveRequest from '../ReceiveRequest';
import Availability2 from '../Availability2';

class Messenger extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: '',
            messages: [],
            dates:[],
            user: this.props.user,
            userEmail: this.props.userEmail,
            otherUser: this.props.otherUser,
            otherUserName: this.props.otherUserName,
            newDateRequest: null,
            dateRequestTimeStamp : null,
            dateExists : false
        };

        this.updateMessage = this.updateMessage.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
        this.submitMessageEnter = this.submitMessageEnter.bind(this);
        this.dateRequestHandler = this.dateRequestHandler.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        //doesnt werk..?
        if (document.getElementById('message-list') != null) {
            var list = document.getElementById('message-list');
            list.scrollTop = list.scrollHeight;
            list.animate({ scrollTop: list.scrollHeight });
        }


        if (this.props.otherUser != null) {
        let currentComponent = this;
        var currDates = [];
        db
            .collection('users')
            .doc(this.props.userEmail)
            .collection('messages')
            .doc(this.props.otherUser)
            .collection('dates')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.docs.map(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.data());
                    currDates.push(doc.data())
                }); return currDates
            }).then(function(currDates) {
                currentComponent.setState(prevState =>({
                    dates : currDates,
                    dateExists : false
                }));

            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });
        }
        this.testTimeStamp();

    }

    componentWillMount() {
        this.testTimeStamp();
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            otherUser: newProps.otherUser,
            newDateRequest: null
        });
        if (newProps.otherUser !== this.props.otherUser) {
            let currentComponent = this;
            db
                .collection('users')
                .doc(this.props.userEmail)
                .collection('messages')
                .doc(newProps.otherUser)
                .collection('messages')
                .onSnapshot(function (querySnapshot) {
                    var curMessages = [];
                    querySnapshot.forEach(function (doc) {
                        curMessages.push(doc.data());
                    });
                    currentComponent.setState({ messages: curMessages });
                });
        }

        if (newProps.otherUser !== this.props.otherUser) {
            let currentComponent2 = this;
            db
                .collection('users')
                .doc(this.props.userEmail)
                .collection('messages')
                .doc(newProps.otherUser)
                .collection('dates')
                .onSnapshot(function(querySnapshot) {
                    var currDates = [];
                    querySnapshot.forEach(function(doc) {
                        currDates.push(doc.data());
                    });
                    currentComponent2.setState({ dates: currDates
                });
                });
        }
        this.testTimeStamp();


    }

    updateMessage(event) {
        this.setState({
            message: event.target.value
        });
    }

    submitMessageEnter(event) {
        if (event.key === 'Enter') {
            this.submitMessage();
        }
    }

    submitMessage(event) {
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

    dateRequestHandler() {
        this.setState({
            newDateRequest: true
        });
    }

    update(timestamp){
        console.log("update", timestamp)
        this.setState({
            dateRequestTimeStamp: timestamp
        })
    }

    testTimeStamp(){
        console.log(this.state.dates[this.state.dates.length-1])
        const data = this.state.dates[this.state.dates.length-1];
        for (var key in data) {
            if (key == 'id'){
                var fullTimeStamp = data[key]

                    let month = fullTimeStamp.getMonth();
                    let formattedMonth = '';
                    if (month < 10) {
                        formattedMonth = '0' + (month + 1);
                    } else {
                        formattedMonth = month + 1 + '';
                    }

                    let day = fullTimeStamp.getDate();
                    let formattedDay = '';
                    if (day < 10) {
                        formattedDay = '0' + day;
                    } else {
                        formattedDay = day + '';
                    }

                    let hours = fullTimeStamp.getHours();
                    let formattedHours = '';
                    if (hours < 10) {
                        formattedHours = '0' + hours;
                    } else {
                        formattedHours = hours + '';
                    }

                    let minutes = fullTimeStamp.getMinutes();
                    let formattedMinutes = '';
                    if (minutes < 10) {
                        formattedMinutes = '0' + minutes;
                    } else {
                        formattedMinutes = minutes + '';
                    }

                    let seconds = fullTimeStamp.getSeconds();
                    let formattedSeconds = '';
                    if (seconds < 10) {
                        formattedSeconds = '0' + seconds;
                    } else {
                        formattedSeconds = seconds + '';
                    }


                    const timeStampDate =
                    fullTimeStamp.getFullYear() +
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
                    fullTimeStamp.getMilliseconds();

             this.setState({
                dateRequestTimeStamp : timeStampDate
             })
             console.log(data[key]);
            }
        }
        if(this.state.dates.length != 0) {
            this.setState({
                dateExists : true
            })
        } else {
            this.setState({
                dateExists : false
            })
        }
/*         if (this.state.otherUser != null && this.state.timeStampRecovery != null) {
        console.log("TESTING TIME STAMP", this.state.timeStampRecovery)
        var timeString = this.state.timeStampRecovery.toString();
        var docRef =  db.collection('users')
                        .doc(this.state.userEmail)
                        .collection('messages')
                        .doc(this.state.otherUser)
                        .collection('dates').doc();

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        }).catch(function(error) {
                            console.log("Error getting document:", error);
                        });
        } */
    }

    render() {
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

        return (
            <div className="messenger-wrapper">
                {this.state.otherUser !== undefined &&
                    this.state.otherUser !== null ? (
                        <div className="messenger">
                            <h2>{this.state.otherUserName}</h2>
                            <ol className="messages" id="message-list">
                                {currentMessage}
                            </ol>
    
                            <div className="date-button-wrapper">
                            <RequestDate userEmail={this.state.userEmail} otherUser={this.state.otherUser} action={this.dateRequestHandler} callBack={this.update}/>

                            {this.state.newDateRequest != null || this.state.dateExists == true ? (
                           <ReceiveRequest userEmail={this.state.userEmail} user={this.state.user} otherUser={this.state.otherUser} timeStamp = {this.state.dateRequestTimeStamp} otherUserName = {this.props.otherUser}/>
                            ) : null }
                            </div>

                            <div className="button-input-wrapper">
                                <input

                                    id="message-box"
                                    className="send-text"
                                    onChange={this.updateMessage}
                                    type="text"
                                    placeholder="message"
                                    onKeyPress={this.submitMessageEnter}
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
                    ) : (
                        <div className="messenger">
                            <p className="select">
                                Select a match to start messaging!
                            </p>
                        </div>
                    )
                    }
                                    
            </div>
        );
    }
}

export default Messenger;
