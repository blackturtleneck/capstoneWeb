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
          arr: []
        };
        this._onButtonClick = this._onButtonClick.bind(this);
      }
    
      _onButtonClick() {
        this.setState({
          showComponent: true,
        });
      }

      render() {
        return (
          <div>
              <p> Finalize the times that you'd want to go on a date this week. </p>
            <AvailableTimes
            weekStartsOn="monday"
            calendars={[
                {
                id: 'work',
                title: 'Work',
                foregroundColor: '#ff00ff',
                backgroundColor: '#f0f0f0',
                selected: true,
                },
                {
                id: 'private',
                title: 'My private cal',
                foregroundColor: '#666',
                backgroundColor: '#f3f3f3',
                },
            ]}
            onChange={(selections) => {
                selections.forEach(({ start, end }) => {
                    this.setState({
                        arr: this.state.arr.concat(start)
                    }) 
                    console.log('Start:', start, 'End:', end);
                    console.log(this.state.arr)
                })
            }}
            onEventsRequested={({ calendarId, start, end, callback }) => {
            }}
            initialSelections={[
                { start: 1980, end: 2040 },
                { start: 540, end: 795}
                
            ]}
            height={400}
            recurring={true}
            availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']}
            availableHourRange={{ start: 9, end: 19 }}
            />
            </div>
        );
      }
    }

export default Availability;

