import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import { db } from './FirestoreConfig';

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
            userReceiving : false
        };
        this.test = this.test.bind(this);

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
    }


    componentDidMount(){
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

    }

    test() {
        console.log(this.state.dateDetails[Object.keys(this.state.dateDetails)[1]].location);
        console.log(this.state.user);
        }
        


    
    // if user and dates sent equals false then display this component oe way
    // if user and dates sent equals true then display it a different way


    render(){

    
        const data=this.state.dateDetails;
        const dateTimesNumeric = [];
        let dateTimes = [];
        var day = '';
        var days = [];

            if (this.state.dateDetails.length != 0) {
                dateTimes = this.state.dateDetails[Object.keys(this.state.dateDetails)[data.length-1]].startTime;
                console.log("I'm here")
                var finalDateTimes = [];
                var num = '';
                // Monday Dates
                for (var i = 0; i < dateTimes.length; i++) {
                    if(dateTimes[i] <= 660) {
                         day = "Monday"
                         days.push(day)
                         num = dateTimes[i] / 60;
                         finalDateTimes.push([day,num]);     
                    }
                    // Tuesday Dates
                    if(dateTimes[i] > 660 && dateTimes[i] <=2100){
                        day = "Tuesday"
                        days.push(day)
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
                    if(dateTimes[i] > 2100 && dateTimes[i] <= 3540 ){
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
                    if(dateTimes[i] > 3540 && dateTimes[i] <= 4980 ){
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

                    // Friday dates lol
                    if(dateTimes[i]> 4980 && dateTimes[i] <= 6420 ){
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
                        }
                    }

                    }   
                dateTimes = finalDateTimes;
                dateTimes.sort();
                dateTimesNumeric.Times = finalDateTimes;
                dateTimes = dateTimes.filter((elem, index, self) => self.findIndex(
                    (t) => {return (t.x === elem.x && t.y === elem.y)}) === index)
                console.log("finaldatetimes", dateTimes);
            } else {
                dateTimes = null
            }
   

    return(
        <div>
           {this.state.ready ?
          <div> <p>
              Hey, want to go to 
               {" " + this.state.dateDetails[Object.keys(this.state.dateDetails)[data.length-1]].location} this week? </p> 
               <p>
                   Let me know if any of these times work for you!
               {days.map(day => <div> {day} </div>)}     
               {dateTimes.map(time => 
               <Button> {time + "PM"} </Button>)} 
           </p> 
  
            <Button id = "confirm"> Confirm Date </Button>
            <Button id = "diffTime"> Propose another time</Button>
            </div>
                
                :
               null
            }
>
        </div>
    );
}


}


export default ReceiveRequest;
