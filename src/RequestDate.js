import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import MultiSelectField from './MultiSelectField'
import "./DatesSelection.css"
import Availability from"./Availability"
import DateNames from './DateNames'
import './Messaging.css';
import { db } from './FirestoreConfig';

class RequestDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          componentTwo: false,
          textValue: "Request a Date",
          buttonid: "request",
          startArr: []
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this._submit = this._submit.bind(this);
        this.submitDate = this.submitDate.bind(this);
        this.getData = this.getData.bind(this);
      }
    
      _onButtonClick() {
        this.setState(prevState => ({
          showComponent: false,
          componentTwo: true,
          textValue:"",
          buttonid: "dateRequested"
        }));
      }

      _submit() {
        this.setState(prevState => ({
          showComponent: false,
          componentTwo: false,
          textValue:"Request a Date",
          buttonid: "request"
        }));

        console.log("USER PROPS", this.props.user)
        console.log("OTHER USER PROPS", this.props.otherUser)
        console.log("START ARR", this.state.startArr)


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

      const nextDate = {
          id: time,
          startTime: this.state.startArr
      };
      db
          .collection('users')
          .doc(this.props.user)
          .collection('messages')
          .doc(this.props.otherUser)
          .collection('dates')
          .doc(timeStamp)
          .set(nextDate);
      }

      submitDate() {
        this.setState({
          showComponent: true,
          componentTwo: true,
          textValue:"Request a Date",
          buttonid: "dateRequested"
        });
      }
    
      getData(start){
        console.log("Start FINAL Array", start);
        this.setState({
          startArr :  start
        });
      }

      render() {
        return (
          <div>
            <Button id = {this.state.buttonid} onClick={this._onButtonClick}>{this.state.textValue}</Button>
            {this.state.componentTwo ?
               <DateNames submitDate={this.submitDate} sendData={this.getData} /> :
               null
            }
            {this.state.showComponent ?
               <Button id = "submit" onClick={this._submit}> Submit </Button> :
               null
            }

          </div>
        );
      }
    }

export default RequestDate;
