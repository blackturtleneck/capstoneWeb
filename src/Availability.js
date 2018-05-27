import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import MultiSelectField from './MultiSelectField'
import "./DatesSelection.css"
import AvailableTimes from 'react-available-times';

class Availability extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false,
          start: this.props.initialStart,
          end: []
        };
        this.baseState
        this._onButtonClick = this._onButtonClick.bind(this);
        this.demoMethod = this.demoMethod.bind(this);
        this.reset = this.reset.bind(this);
      }
    
      _onButtonClick() {
        this.setState({
          showComponent: true,
        });
      }

      demoMethod(start, end) {
        this.props.sendData(start, end);
      }

      reset(){
          this.setState({
              start: [],
              end: []
          })
      }
      render() {
        return (
          <div>
              <h4 id = "timeFrame"> Pick a few times you'd like to go on the date. </h4>
            <AvailableTimes
            weekStartsOn="monday"
            calendars={[
                {
                id: 'work',
                title: 'Work',
                foregroundColor: '#ff00ff',
                backgroundColor: '#f0f0f0',
                selected: true,
                }
            ]}
            onChange={(selections) => {
                selections.forEach(({ start, end }) => {
                    this.reset();
                    this.setState({
                        start: this.state.start.concat(start),
                        end: this.state.end.concat(end)
                    }) 
                    console.log('Start:', start, 'End:', end);
                    console.log("START ARR IN AVAILA", this.state.start)
                    console.log(this.state.end)
                })
                this.demoMethod(this.state.start, this.state.end)  
            }
        }
            
            onEventsRequested={({ calendarId, start, end, callback }) => {
            }}
            initialSelections={[
                { start: 3060, end: 3400 },
                { start: 3360, end: 3240},
                { start: 6240, end: 6300}
                
            ]}
            height={400}
            recurring={true}
            availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
            availableHourRange={{ start: 3, end: 11 }}
            />
            </div>
        );
      }
    }

export default Availability;

