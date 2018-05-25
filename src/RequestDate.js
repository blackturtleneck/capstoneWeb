import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import MultiSelectField from './MultiSelectField'
import "./DatesSelection.css"
import Availability from"./Availability"
import DateNames from './DateNames'
import './Messaging.css';

class RequestDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          componentTwo: false,
          textValue: "Request a Date",
          buttonid: "request"
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this._submit = this._submit.bind(this);
        this.submitDate = this.submitDate.bind(this);
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
      }

      submitDate() {
        this.setState({
          showComponent: true,
          componentTwo: true,
          textValue:"Request a Date",
          buttonid: "dateRequested"
        });
      }
    
      render() {
        return (
          <div>
            <Button id = {this.state.buttonid} onClick={this._onButtonClick}>{this.state.textValue}</Button>
            {this.state.componentTwo ?
               <DateNames submitDate={this.submitDate} /> :
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
