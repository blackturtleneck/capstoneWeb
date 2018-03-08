import React from 'react';
import { Card, ListItem, Button } from 'react'
import MapContainer from './MapContainer'
import Slider from 'react-slick'
import MultiSelectField from './MultiSelectField'
import Dates from './Dates'
import Scheduler from './Scheduler'

class DatesSelection extends React.Component {

    render(){
    return (
        <div>
        <MultiSelectField/>
        <Scheduler/>
        <form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
        </div>
    );
    }
}

export default DatesSelection;