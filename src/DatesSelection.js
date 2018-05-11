import React from 'react';
import { Card, ListItem, Button } from 'react'
import MapContainer from './MapContainer'
import Slider from 'react-slick'
import MultiSelectField from './MultiSelectField'
import Dates from './Dates'
import "./DatesSelection.css"
import AvailableTimes from 'react-available-times';

class DatesSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          lat: null,
          lon: null,
          isHidden: true
        }
      }
      toggleHidden () {
        this.setState({
          isHidden: !this.state.isHidden
        })
      }

      componentDidMount() {
        navigator.geolocation.getCurrentPosition(function (location) {
          this.setState({
            lat: location.coords.latitude,
            lon: location.coords.longitude 
          })
        }.bind(this));
    }

    render() {


        console.log(this.state.lat);
        console.log(this.state.lon);    
        return (
            <div className="right-side">
         
            <div>
        <button className = "request" onClick={this.toggleHidden.bind(this)} >
            Request a Date
        </button>

        {!this.state.isHidden && <AvailableTimes classname="scheduler"
                    weekStartsOn="monday"
                    calendars={[
                        {
                            id: 'me',
                            title: 'My Schedule',
                            foregroundColor: '#cd0ff',
                            backgroundColor: '#f0f0f0',
                            selected: true,
                        },
                        {
                            id: 'date',
                            title: 'My dates cal',
                            foregroundColor: '#666',
                            backgroundColor: '#f3f3f3',
                        },
                    ]}
                    onChange={(selections) => {
                        selections.forEach(({ start, end }) => {
                            console.log('Start:', start, 'End:', end);
                        })
                    }}
                    onEventsRequested={({ calendarId, start, end, callback }) => {

                    }}
                    height={600}
                    recurring={false}
                    availableDays={['monday', 'tuesday', 'wednesday', 'thursday', 'friday']}
                    availableHourRange={{ start: 9, end: 19 }}
                />}
      </div>

                <MultiSelectField />
                {/* Pass in location into Dates */}
            <div id="test">
                <Dates ref="child" lat = {this.state.lat} lon = {this.state.lon}/>
                </div>
            </div>
        );
    }
}

export default DatesSelection;