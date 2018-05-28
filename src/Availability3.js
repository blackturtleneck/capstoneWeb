import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
//styling
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import './Availability.css'
import { db } from './FirestoreConfig';
const times = ["1000", "1030","1100","1130","1200","1230","1300", "1330", "1400","1430", 
"1500", "1530", "1600", "1630", "1700", "1730", "1800", "1830", "1900", "1930", "2000", "2030", "2100", "2130", "2200", "2230"]

const days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"]

const daysRef = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

class Availability3 extends Component {
    constructor(props){
        super(props);
        this.calculateTimes = this.calculateTimes.bind(this);
        this.userRespondedAvailablity = this.userRespondedAvailablity.bind(this);
        this.populateAvailability = this.populateAvailability.bind(this);
        this.state = {
            cells: [
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [true, false, false, false, false, false, false, false],
                [true, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false]
              ],
              availability: []
          };
    }

    componentWillMount(){
      this.populateAvailability();
    }

    handleChange = cells => {
      this.setState({ cells })
      this.calculateTimes();
    //  this.props.availability(this.state.availability)
    };

    handleClick = () => {
      const cells = 
        [[false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false]
      ]
      
        this.setState({ cells });

    };

    userRespondedAvailablity(arr){
      console.log("CHECKING PROPS PT2", this.props.userEmail)

      var dateInfo = db
        .collection('users')
        .doc(this.props.userEmail)
        .collection('messages')
        .doc(this.props.otherUser)
        .collection('dates').doc(String(this.props.timeStamp))

        return dateInfo.update({
           availability: arr,     
        })

        var dateInfo = db
        .collection('users')
        .doc(this.props.otherUser)
        .collection('messages')
        .doc(this.props.userEmail)
        .collection('dates').doc(String(this.props.timeStamp))

        return dateInfo.update({
           availability: arr,     
        })
    }

    calculateTimes(){ 
      //we can skip 0 because the first row is always going to be false
      let a = []
      for(let i = 1; i <= times.length; i++){
        for(let j = 1; j <= days.length; j++){
          let dayVal = days[j - 1]
          let timeVal = times[i - 1]
          let endTime = (parseInt(timeVal, 10) + 30).toString()
          if (endTime[2] === "6"){
            let end = (parseInt(endTime.substring(0,2), 10) + 1).toString()
            endTime = end + "00"
          }
          if(this.state.cells[i]){
            if(this.state.cells[i][j]){
              let dayExists = false;
              let dayLocation = 0;
              a.forEach((d, i) => {
                if (d.day === dayVal){
                  dayExists = true
                  dayLocation = i
                }
              })
              if (dayExists){
                let currEndTime = a[dayLocation].times[a[dayLocation].times.length - 1].end
                if (currEndTime === timeVal){
                  a[dayLocation].times[a[dayLocation].times.length - 1].end = endTime
                } else { 
                    a[dayLocation].times.push({
                      "start" : timeVal,
                      "end" : endTime
                    })  
                }
              } else {
                a.push({
                  "day" : dayVal,
                  "times" : [{"start" : timeVal, "end": endTime}]
                })
              }
            }
          }
        
        } 
      }
      this.setState({
        availability : a
      })
    }

    populateAvailability = () => {
      let cells = this.state.cells
      
      if (this.props.currAvailability) {
        this.props.currAvailability.map(function(a) {
          let dayIndex = '';
          if(a.day == 'sun') {
            dayIndex = 0;
          }
          if(a.day == 'mon') {
            dayIndex = 1;
          }
          if(a.day == 'tue') {
            dayIndex = 2;
          }
          if(a.day == 'wed') {
            dayIndex = 3;
          }
          if(a.day == 'thu') {
            dayIndex = 4;
          }
          if(a.day == 'fri') {
            dayIndex = 5;
          }
          if(a.day == 'sat') {
            dayIndex = 6;
          }
          if(a.day == 'sun') {
            dayIndex = 7;      
          }
          a.times.forEach(time => {
            let startIndex = times.indexOf(time.start)
           let endIndex = times.indexOf(time.end)
           if (startIndex > -1 && endIndex > -1) { //both times are within our timesRef
          let index = startIndex
             while (index < endIndex) {
              //first row and first value in each row are labels - do not modify
               cells[index + 1][dayIndex + 1] = true
               index++
              }
            }
         })
          console.log(cells);
        });
      }

      //  if (this.props.currAvailability) {
      //    console.log(this.props.currAvailability.index)
      //   if (this.props.currAvailability !== undefined) {//make sure they have an availability
      //     this.props.currAvailability.forEach(day => {
      //       let dayIndex = daysRef.indexOf(day.day)
      //    day.times.forEach(time => {
      //          let startIndex = times.indexOf(time.start)
      //         let endIndex = times.indexOf(time.end)
      //         if (startIndex > -1 && endIndex > -1) { //both times are within our timesRef
      //        let index = startIndex
      //           while (index < endIndex) {
      //            //first row and first value in each row are labels - do not modify
      //             cells[index + 1][dayIndex + 1] = true
      //             index++
      //            }
      //          }
      //       })
      //     })
      //   }
      //  }
       console.log("CELLS", cells)
       this.setState({
         cells : cells
       })
     }

    render() {
        return(
            <div>
                <div className="availabilityTableDragDown">
      <TableDragSelect value={this.state.cells} onChange={this.handleChange}>
        <tr className="availabilityRow">
          <td disabled />
          <td disabled>Sunday</td>
          <td disabled>Monday</td>
          <td disabled>Tuesday</td>
          <td disabled>Wednesday</td>
          <td disabled>Thursday</td>
          <td disabled>Friday</td>
          <td disabled>Saturday</td>
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>10:00AM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>11:00AM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel"></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>12:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>1:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>2:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel"></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>3:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>4:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel"></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>5:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel"></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>6:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>7:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>8:00PM </td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>9:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled></td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr className="availabilityRow">
          <td disabled className="timeLabel" style={{textAlign: "right"}}>10:00PM</td>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
      </TableDragSelect>
      <Button onClick = {this.userRespondedAvailablity}> Send Availability </Button> 
      </div>
    </div>
        );
    };

};

export default Availability3;
