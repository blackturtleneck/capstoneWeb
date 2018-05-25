import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import MultiSelectField from './MultiSelectField'
import "./DatesSelection.css"
import Availability from"./Availability"
import DateNames from './DateNames'

class RequestDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          componentTwo: false,
          textValue: "Request a Date"
        };
        this._onButtonClick = this._onButtonClick.bind(this);
        this._submit = this._submit.bind(this);
      }
    
      _onButtonClick() {
        this.setState(prevState => ({
          showComponent: true,
          componentTwo: true,
          textValue:""
        }));
      }

      _submit() {
        this.setState(prevState => ({
          showComponent: false,
          componentTwo: false,
          textValue:"Request a Date"
        }));
      }
    
      render() {
        return (
          <div>
            <Button id = "request" onClick={this._onButtonClick}>{this.state.textValue}</Button>
            {this.state.componentTwo ?
               <DateNames /> :
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
