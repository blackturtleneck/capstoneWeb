import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MultiSelectField from './MultiSelectField';
import './DatesSelection.css';
import Availability from './Availability';
import DateNames from './DateNames';
import './Messenger/Messaging.css';
import { db } from './FirestoreConfig';

class RequestDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            componentTwo: false,
            textValue: 'Request a Date',
            buttonid: 'request',
            startArr: [],
            location: '',
            userEmail: this.props.userEmail,
            userAvailability: []
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this._submit = this._submit.bind(this);
        this.submitDate = this.submitDate.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentWillReceiveProps() {
        let currentComponent = this;
        var docRef = db
            .collection('users')
            .doc(this.state.userEmail)
            .collection('availability')
            .doc('availability');

        docRef
            .get()
            .then(doc => {
                if (doc.exists) {
                    let data = doc.data();
                    console.log('TEST ', data['available']);
                    currentComponent.setState({
                        userAvailability: data['available']
                    });
                } else {
                    // doc.data() will be undefined in this case
                    this.setState({ userAvailability: null });
                    console.log('No such document!');
                }
            })
            .catch(function(error) {
                this.setState({ data: null });
                console.log('Error getting document:', error);
            });
    }

    componentDidMount() {
        let currentComponent = this;
        var docRef = db
            .collection('users')
            .doc(this.state.userEmail)
            .collection('availability')
            .doc('availability');

        docRef
            .get()
            .then(doc => {
                if (doc.exists) {
                    let data = doc.data();
                    console.log('TEST ', data['available']);
                    currentComponent.setState({
                        userAvailability: data['available']
                    });
                } else {
                    // doc.data() will be undefined in this case
                    this.setState({ userAvailability: null });
                    console.log('No such document!');
                }
            })
            .catch(function(error) {
                this.setState({ data: null });
                console.log('Error getting document:', error);
            });
    }

    _onButtonClick() {
        this.setState(prevState => ({
            showComponent: false,
            componentTwo: true,
            textValue: 'Cancel',
            buttonid: 'dateRequested'
        }));
    }

    _submit() {
        this.setState(prevState => ({
            showComponent: false,
            componentTwo: false,
            textValue: 'Request a Date',
            buttonid: 'request'
        }));

        console.log('USER PROPS', this.state.userEmail);
        console.log('OTHER USER PROPS', this.props.otherUser);
        console.log('START ARR', this.state.startArr);
        console.log('FINAL LOC', this.state.location);

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

        this.props.callBack(timeStamp);
        console.log(timeStamp + 'TIMESTAMP CHEcK');
        const sendDate = {
            id: time,
            startTime: this.state.startArr,
            location: this.state.location,
            sent: true,
            response: false,
            confirm: false,
            timeConfirmed: null
        };
        const receiveDate = {
            id: time,
            startTime: this.state.startArr,
            location: this.state.location,
            sent: false,
            response: false,
            confirm: false,
            timeConfirmed: null
        };
        db
            .collection('users')
            .doc(this.props.userEmail)
            .collection('messages')
            .doc(this.props.otherUser)
            .collection('dates')
            .doc(timeStamp)
            .set(sendDate);

        db
            .collection('users')
            .doc(this.props.otherUser)
            .collection('messages')
            .doc(this.props.userEmail)
            .collection('dates')
            .doc(timeStamp)
            .set(receiveDate);

        this.props.action();
    }

    submitDate() {
        this.setState({
            showComponent: true,
            componentTwo: true,
            textValue: 'Request a Date',
            buttonid: 'dateRequested'
        });
    }

    getData(start, location) {
        console.log('Start FINAL Array', start);
        console.log('LOCATION NAME', location);
        this.setState({
            startArr: start,
            location: location
        });
    }

    render() {
        console.log('AVAILABLE', this.state.userAvailability);
        return (
            <div id="buttons">
                <Button id={this.state.buttonid} onClick={this._onButtonClick}>
                    {this.state.textValue}
                </Button>
                {this.state.componentTwo ? (
                    <DateNames
                        userEmail={this.props.userEmail}
                        submitDate={this.submitDate}
                        sendData={this.getData}
                        availability={this.state.userAvailability}
                    />
                ) : null}
                {this.state.showComponent ? (
                    <Button id="submit" onClick={this._submit}>
                        {' '}
                        Submit{' '}
                    </Button>
                ) : null}
            </div>
        );
    }
}

export default RequestDate;
