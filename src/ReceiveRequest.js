import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { db } from './FirestoreConfig';
import "./DatesSelection.css";

class ReceiveRequest extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: '',
            dateDetails: [],
            user: this.props.user,
            userEmail: this.props.userEmail,
            otherUser: this.props.otherUser,
            otherUserName: this.props.otherUserName,
            ready : false,
            userReceiving : false,
            finalDateArray: [],
            finalLocation: '',
            dateConfirmed : false,
            timeStampFinal : null
        };
        this.test = this.test.bind(this);
        this.confirmDate = this.confirmDate.bind(this);
        this.otherUserConfirm = this.otherUserConfirm.bind(this);
        this.respond = this.respond.bind(this);
        this.otherUserRespond = this.otherUserRespond.bind(this);
        this.timeConfirm = this.timeConfirm.bind(this);
    } 

   componentWillMount(){
        console.log(this.props.otherUser)
        let currentComponent = this;
        var currDates = [];
        db
            .collection('users')
            .doc(this.props.userEmail)
            .collection('messages')
            .doc(this.props.otherUser)
            .collection('dates')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.docs.map(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.data());
                    currDates.push(doc.data());
                    ready : true
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        const data=this.state.dateDetails[this.state.dateDetails.length-1];
            console.log(typeof data)
            for (var key in data) {
               if (key == 'id'){
                   this.setState({
                    timeStampFinal : data[key]
                   });             
               }
            }

    }

    componentWillReceiveProps(newProps) {
        this.setState({ newProps: newProps })
        if (newProps.otherUser !== this.props.otherUser) {
            console.log(this.props.otherUser)
            let currentComponent = this;
            var currDates = [];
            db
                .collection('users')
                .doc(this.props.userEmail)
                .collection('messages')
                .doc(this.props.otherUser)
                .collection('dates')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.docs.map(function(doc) {
                        console.log(doc.id, " => ", doc.data());
                        console.log(doc.data());
                        currDates.push(doc.data())
                        console.log("IMPORTANT CURR DATES", currDates)
                    }); return currDates
                }).then(function(currDates) {
                    currentComponent.setState(prevState =>({
                        dateDetails : currDates,
                        ready : !prevState
                    }));
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });
        }
        this.componentDidMount();

        const data=this.state.dateDetails[this.state.dateDetails.length-1];
        console.log(typeof data)
        for (var key in data) {
           if (key == 'id'){
               this.setState({
                timeStampFinal : data[key]
               });             
           }
        }

    }


    componentDidMount(){
        console.log(this.props.timeStamp, "time props")
        let currentComponent = this;
        var currDates = [];
        db
            .collection('users')
            .doc(this.props.userEmail)
            .collection('messages')
            .doc(this.props.otherUser)
            .collection('dates')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.docs.map(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.data());
                    currDates.push(doc.data())
                }); return currDates
            }).then(function(currDates) {
                currentComponent.setState(prevState =>({
                    dateDetails : currDates,
                    ready : true
                }));
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

            const data=this.state.dateDetails[this.state.dateDetails.length-1];
            console.log(typeof data)
            for (var key in data) {
               if (key == 'id'){
                   this.setState({
                    timeStampFinal : data[key]
                   });             
               }
            }

    }

    timeConfirm(event){
        console.log("ID TEST", event.target.value)

        this.setState({
            timeConfirmed : event.target.value
        })
    }

    test() {
        console.log(this.state.dateDetails[Object.keys(this.state.dateDetails)[1]].location);
        console.log(this.state.user);
        }
        
    confirmDate(){
        console.log(this.props.timeStamp + "DOUBLE CHECKING")
        this.otherUserConfirm();
        var dateInfo = db
        .collection('users')
        .doc(this.props.userEmail)
        .collection('messages')
        .doc(this.props.otherUser)
        .collection('dates').doc(String(this.props.timeStamp))

        return dateInfo.update({
            confirm: true,
            timeConfirmed : this.state.timeConfirmed
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        this.setState({
            dateConfirmed : true
        })
    }

    otherUserConfirm(){
        console.log(this.state.timeStampFinal)
        var dateInfo = db
        .collection('users')
        .doc(this.props.otherUser)
        .collection('messages')
        .doc(this.props.userEmail)
        .collection('dates').doc(String(this.props.timeStamp))
        return dateInfo.update({
            confirm: true,
            timeConfirmed : this.state.timeConfirmed
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    respond(){
        console.log(this.props.timeStamp + "DOUBLE CHECKING")
        this.otherUserConfirm();
        var dateInfo = db
        .collection('users')
        .doc(this.props.userEmail)
        .collection('messages')
        .doc(this.props.otherUser)
        .collection('dates').doc(String(this.props.timeStamp))

        return dateInfo.update({
            confirm: false,
            response: true
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    otherUserRespond(){
        var dateInfo = db
        .collection('users')
        .doc(this.props.otherUser)
        .collection('messages')
        .doc(this.props.userEmail)
        .collection('dates').doc(String(this.props.timeStamp))

        return dateInfo.update({
            confirm: false,
            response: true
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }

    render(){
        var startTimeArr = [];
        var locationArr = '';
        var finalDateButton = [];
        console.log(this.state.dateDetails[this.state.dateDetails.length-1]);
        const data=this.state.dateDetails[this.state.dateDetails.length-1];
        console.log(typeof data)
        for (var key in data) {
           if (key == 'location'){
            locationArr = data[key]
            console.log(locationArr);
           }
           if (key == 'startTime'){
           startTimeArr = data['startTime'];
                startTimeArr.map(function(a) {
                    let dayName = '';
                    let time = '';
                    if(a.day == 'sun') {
                        dayName = "Sunday";
                    }
                    if(a.day == 'mon') {
                        dayName = "Monday";
                    }
                    if(a.day == 'tues') {
                        dayName = "Tuesday";
                    }
                    if(a.day == 'wed') {
                        dayName = "Wednesday";
                    }
                    if(a.day == 'thurs') {
                        dayName = "Thursday";
                    }
                    if(a.day == 'fri') {
                        dayName = "Friday";
                    }
                    if(a.day == 'sat') {
                        dayName = "Saturday";
                    }
                    if(a.day == 'sun') {
                        dayName = "Sunday";      
                    }

                    a.times.forEach(time => {
                        console.log(a.times)
                        console.log(dayName)
                        if (time.start == 1000){
                            time = "10AM"
                        }
                        if (time.start == 1030){
                            time = "10:30AM"
                        }
                        if (time.start == 1100){
                            time = "11AM"
                        }
                        if (time.start == 1130){
                            time = "11:30AM"
                        }
                        if (time.start == 1200){
                            time = "12PM"
                        }
                        if (time.start == 1230){
                            time = "12:30PM"
                        }
                        if (time.start == 1300){
                            time = "1PM"
                        }
                        if (time.start == 1330){
                            time = "1:30PM"
                        }
                        if (time.start == 1400){
                            time = "2PM"
                        }
                        if (time.start == 1430){
                            time = "2:30PM"
                        }
                        if (time.start == 1500){
                            time = "3PM"
                        }
                        if (time.start == 1530){
                            time = "3:30PM"
                        }
                        if (time.start == 1600){
                            time = "4PM"
                        }
                        if (time.start == 1630){
                            time = "4:30PM"
                        }
                        if (time.start == 1700){
                            time = "5PM"
                        }
                        if (time.start == 1730){
                            time = "5:30PM"
                        }
                        if (time.start == 1800){
                            time = "6PM"
                        }
                        if (time.start == 1830){
                            time = "6:30PM"
                        }
                        if (time.start == 1900){
                            time = "7PM"
                        }
                        if (time.start == 1930){
                            time = "7:30PM"
                        }
                        if (time.start == 2000){
                            time = "8PM"
                        }
                        if (time.start == 2030){
                            time = "8:30PM"
                        }
                        if (time.start == 2100){
                            time = "9PM"
                        }
                        if (time.start == 2130){
                            time = "9:30PM"
                        }
                        if (time.start == 2200){
                            time = "10PM"
                        }
                        if (time.start == 2230){
                            time = "10:30PM"
                        }
                        finalDateButton.push(dayName + ", " + time);
                    });

                 });
                 console.log(finalDateButton);
          }
        }

       /*  const dateTimesNumeric = [];
        let dateTimes = [];
        let dateOg = [];
        var day = '';
        var days = [];

            if (this.state.dateDetails.length != 0) {
                dateOg = this.state.dateDetails[Object.keys(this.state.dateDetails)[data.length-1]].startTime;
                console.log("I'm here", dateOg)
                 dateTimes = dateOg.filter(function(elem, index, self) {
                    return index === self.indexOf(elem);
                })
                console.log("I'm here again", dateTimes);
                dateTimes.sort();
                var finalDateTimes = [];
                var num = '';
                // Monday Dates
                for (var i = 0; i < dateTimes.length; i++) {
                    if(dateTimes[i] <= 660) {
                         day = "Monday"
                         num = dateTimes[i] / 60;
                         finalDateTimes.push([day,num]);     
                    }
                    // Tuesday Dates
                   else if(dateTimes[i] > 660 && dateTimes[i] <=2100){
                        day = "Tuesday"

                        if(dateTimes[i] == 1620){
                            num = 3;
                            finalDateTimes.push([day,num]);
                        }
                        else if(dateTimes[i] <= 1680){
                            num = 4;
                            finalDateTimes.push([day,num]);
                        }
                        else if(dateTimes[i] <= 1740){
                            num = 5;
                            finalDateTimes.push([day,num]);
                        }
                        else if(dateTimes[i] <= 1800){
                            num = 6;
                            finalDateTimes.push([day,num]);
                        }
                        else if(dateTimes[i] <= 1860){
                            num = 7;
                            finalDateTimes.push([day,num]);
                        }
                        else if(dateTimes[i] <= 1920){
                            num = 8;
                            finalDateTimes.push([day,num]);
                        }
                        else if(dateTimes[i] <= 1980){
                            num = 9;
                            finalDateTimes.push([day,num]);
                        }   
                        else if(dateTimes[i] >= 2040){
                            num = 10;
                            finalDateTimes.push([day,num]);
                        }
                    }

                    // Wednesday Dates
                    else if(dateTimes[i] > 2100 && dateTimes[i] <= 3540 ){
                        day = "Wednesday"
                        days.push(day)

                        if(dateTimes[i] == 4500){
                            num = 3;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4560){
                            num = 4;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4620){
                            num = 5;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4680){
                            num = 6;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4740){
                            num = 7;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4800){
                            num = 8;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4860){
                            num = 9;
                            finalDateTimes.push([day,num]);
                        }   
                        if(dateTimes[i] == 4920){
                            num = 10;
                            finalDateTimes.push([day,num]);
                        }
                    }

                    // This is so inefficient but Thursday Dates
                    else if(dateTimes[i] > 3540 && dateTimes[i] <= 4980 ){
                        day = "Thursday"
                        days.push(day)

                        if(dateTimes[i] == 4500){
                            num = 3;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4650){
                            num = 4;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4680){
                            num = 5;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4740){
                            num = 6;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4800){
                            num = 7;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4860){
                            num = 8;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 4920){
                            num = 9;
                            finalDateTimes.push([day,num]);
                        }   
                        if(dateTimes[i] == 4980){
                            num = 10;
                            finalDateTimes.push([day,num]);
                        }
                    }
 */
                  /*   // Friday dates lol
                   else if(dateTimes[i]> 4980 && dateTimes[i] <= 6420 ){
                        day = "Friday"
                        days.push(day)

                        if(dateTimes[i] == 5940){
                            num = 3;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 6000){
                            num = 4;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 6060){
                            num = 5;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 6120){
                            num = 6;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 6180){
                            num = 7;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 6240){
                            num = 8;
                            finalDateTimes.push([day,num]);
                        }
                        if(dateTimes[i] == 6300){
                            num = 9;
                            finalDateTimes.push([day,num]);
                        }   
                        if(dateTimes[i] == 6360){
                            num = 10;
                            finalDateTimes.push([day,num]);
                        } */
                   // }
     /*                console.log("ARRAY CHECK", finalDateTimes);
                    }   
                dateTimes = finalDateTimes;
                
                console.log("finaldatetimes", dateTimes);
            } else {
                dateTimes = null
            }
    */

    return(
        <div>
           {this.state.ready  ?
                <div id = "datebackground">
                    {this.state.userReceiving == false && this.state.dateDetails != null ?           
                    <div>                       
                        <h3 id = "halfwayText">
                            Hey, want to go to {locationArr+ " "}
                            this week? </h3> 
                            <p>
                            It's got inventive cocktails and small plates in a warm, eco-friendly setting with regular tastings and classes. <br/>
                            <Button id ="locview">Here's where it is.</Button> <br/>
                            
                            Let me know if any of these times work for you! 
                            {finalDateButton.map(time => 
                            <Button id = {time} value={time} onClick ={(event)=>this.timeConfirm(event)}>  {time} </Button>)} 
                        </p> 

                        <Button id = "confirm" onClick = {this.confirmDate}> Confirm Date </Button>
                        <Button id = "confirm" onClick = {this.respond}> Another Time?</Button>
                      </div>
                    
              
                            :
                            <div>  <h3 id = "halfwayText">
                            Hey, want to go to 
                            {" " + locationArr+ " "} this week? </h3> 
                            <p>
                            It's got inventive cocktails and small plates in a warm, eco-friendly setting with regular tastings and classes. Let me know which of these times work best for you!
                            {finalDateButton.map(time => 
                            <Button id = {time}>  </Button>)} 
                        </p> 

                        <Button id = "confirm" onClick = {this.confirmDate}> Waiting for {this.props.otherUserName} to respond </Button>
                        </div>
                            

                        }
                        </div>
                :
               null
            }
        </div>
    );
}


}


export default ReceiveRequest;
