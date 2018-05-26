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
            ready : false
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

        let dateTimes
            if (this.state.dateDetails.length != 0) {
                dateTimes = this.state.dateDetails[Object.keys(this.state.dateDetails)[data.length-1]].startTime;
            } else {
                dateTimes = null
            }
   //     const listItems = data.map((d) => <li key={d.location}>{d.location}</li>);

    return(
        <div>
           {this.state.ready ?
          <div> <p>
              Hey, want to go to 
               {this.state.dateDetails[Object.keys(this.state.dateDetails)[data.length-1]].location} this week? </p> 
               <p>{dateTimes} </p> </div> :
               null
            }
            <Button id = "submit" onClick={this.test}> Dates </Button>
            <Button id = "submit" onClick={this.datesTest}> </Button>
        </div>
    );
}


}


export default ReceiveRequest;
