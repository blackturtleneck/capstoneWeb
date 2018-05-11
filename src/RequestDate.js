import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import MultiSelectField from './MultiSelectField'
import "./DatesSelection.css"
import Availability from"./Availability"

class RequestDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          componentTwo: false
        };
        this._onButtonClick = this._onButtonClick.bind(this);
      }
    
      _onButtonClick() {
        this.setState({
          showComponent: true,
          componentTwo: true
        });
      }
    
      render() {
        return (
          <div>
            <Button id = "request" onClick={this._onButtonClick}>Request a Date</Button>
            {this.state.showComponent ?
               <Availability /> :
               null
            }
            {this.state.componentTwo ?
               <MultiSelectField /> :
               null
            }
          </div>
        );
      }
    }

export default RequestDate;
