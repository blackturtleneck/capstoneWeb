import React, { Component } from "react"; // eslint-disable-line no-use-before-define
import { Button } from "react-bootstrap"; // eslint-disable-line no-use-before-define
import { db } from "./FirestoreConfig";
import "./DatesSelection.css";
import ColorMap from "./ColorMap.js"; // eslint-disable-line no-use-before-define
import Availability2 from "./Availability2.js"; // eslint-disable-line no-use-before-define

class DateConfirmed extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            message: "",
            dateDetails: [],
            user: this.props.user,
            userEmail: this.props.userEmail,
            otherUser: this.props.otherUser,
            otherUserName: this.props.otherUserName,
            ready: false,
            finalDateArray: [],
            finalLocation: "",
            dateConfirmed: false,
            timeStampFinal: null,
            mapShowing: false
        };
        this.test = this.test.bind(this);
        this.confirmDate = this.confirmDate.bind(this);
        this.otherUserConfirm = this.otherUserConfirm.bind(this);
        this.respond = this.respond.bind(this);
        this.otherUserRespond = this.otherUserRespond.bind(this);
        this.timeConfirm = this.timeConfirm.bind(this);
        this.showMap = this.showMap.bind(this);
    }

    componentWillMount() {
        let currentComponent = this; // eslint-disable-line no-use-before-define
        var currDates = [];
        db
            .collection("users")
            .doc(this.props.userEmail)
            .collection("messages")
            .doc(this.props.otherUser)
            .collection("dates")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.docs.map(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    // console.log(doc.id, " => ", doc.data());
                    // console.log(doc.data());
                    currDates.push(doc.data());
                    // ready: !currDates[0].confirm;
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

        const data = this.state.dateDetails[this.state.dateDetails.length - 1];
        // console.log(typeof data);
        for (var key in data) {
            if (key === "id") {
                this.setState({
                    timeStampFinal: data[key]
                });
            }
            if (key === "sent") {
                this.setState({
                    sent: data[key]
                });
                // console.log("SENT", this.state.sent);
            }
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ newProps: newProps });
        if (newProps.otherUser !== this.props.otherUser) {
            // console.log(this.props.otherUser);
            let currentComponent = this;
            var currDates = [];
            db
                .collection("users")
                .doc(this.props.userEmail)
                .collection("messages")
                .doc(this.props.otherUser)
                .collection("dates")
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.docs.map(function(doc) {
                        // console.log(doc.id, " => ", doc.data());
                        // console.log(doc.data());
                        currDates.push(doc.data());
                        // console.log("IMPORTANT CURR DATES", currDates);
                    });
                    return currDates;
                })
                .then(function(currDates) {
                    currentComponent.setState(prevState => ({
                        dateDetails: currDates,
                        ready: !currDates[0].confirm,
                        timeConfirmed: currDates[0].timeConfirmed
                    }));
                })
                .catch(function(error) {
                    // console.log("Error getting documents: ", error);
                });
        }
        this.componentDidMount();

        const data = this.state.dateDetails[this.state.dateDetails.length - 1];
        // console.log(typeof data);
        for (var key in data) {
            if (key === "id") {
                this.setState({
                    timeStampFinal: data[key]
                });
            }
            if (key === "sent") {
                this.setState({
                    sent: data[key]
                });
                // console.log("SENT", this.state.sent, this.state.otherUser);
            }
        }
    }

    componentDidMount() {
        // console.log(this.props.timeStamp, "time props");
        let currentComponent = this;
        var currDates = [];
        db
            .collection("users")
            .doc(this.props.userEmail)
            .collection("messages")
            .doc(this.props.otherUser)
            .collection("dates")
            .get()
            .then(function(querySnapshot) {
                querySnapshot.docs.map(function(doc) {
                    // console.log(doc.id, " => ", doc.data());
                    // console.log(doc.data());
                    currDates.push(doc.data());
                    // console.log("IMPORTANT CURR DATES", currDates[0].confirm);
                });
                return currDates;
            })
            .then(function(currDates) {
                currentComponent.setState(prevState => ({
                    dateDetails: currDates,
                    ready: !currDates[0].confirm,
                    timeConfirmed: currDates[0].timeConfirmed
                }));
            })
            .catch(function(error) {
                // console.log("Error getting documents: ", error);
            });

        const data = this.state.dateDetails[this.state.dateDetails.length - 1];
        // console.log(typeof data);
        for (var key in data) {
            if (key === "id") {
                this.setState({
                    timeStampFinal: data[key]
                });
            }
            if (key === "sent") {
                this.setState({
                    sent: data[key]
                });
                // console.log("SENT", this.state.sent);
            }
        }
    }

    timeConfirm(event) {
        // console.log("ID TEST", event.target.value);

        this.setState({
            timeConfirmed: event.target.value
        });
    }

    test() {
        // console.log(
        //     this.state.dateDetails[Object.keys(this.state.dateDetails)[1]]
        //         .location
        // );
        // console.log(this.state.user);
    }

    confirmDate() {
        this.setState({
            dateConfirmed: true
        });
        // console.log(this.state.dateConfirmed, "UGH");

        this.otherUserConfirm();
        var dateInfo = db
            .collection("users")
            .doc(this.props.userEmail)
            .collection("messages")
            .doc(this.props.otherUser)
            .collection("dates")
            .doc(String(this.props.timeStamp));

        return dateInfo
            .update({
                confirm: true,
                timeConfirmed: this.state.timeConfirmed
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }

    showMap() {
        // console.log(this.state.mapShowing);
        this.setState(prevState => ({
            mapShowing: !prevState.mapShowing
        }));
    }

    otherUserConfirm() {
        // console.log(this.state.timeStampFinal);
        var dateInfo = db
            .collection("users")
            .doc(this.props.otherUser)
            .collection("messages")
            .doc(this.props.userEmail)
            .collection("dates")
            .doc(String(this.props.timeStamp));
        return dateInfo
            .update({
                confirm: true,
                timeConfirmed: this.state.timeConfirmed
            })
            .then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        // this.setState({
        //     dateConfirmed: true
        // });
        // console.log("DOES THIS WORK", this.state.dateConfirmed);
    }

    respond() {
        this.setState({
            availabilityCalendar: true
        });
        this.setState({
            dateConfirmed: true
        });
        console.log(this.props.timeStamp + "DOUBLE CHECKING");
        this.otherUserRespond();
        var dateInfo = db
            .collection("users")
            .doc(this.props.userEmail)
            .collection("messages")
            .doc(this.props.otherUser)
            .collection("dates")
            .doc(String(this.props.timeStamp));

        return dateInfo
            .update({
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

    otherUserRespond() {
        var dateInfo = db
            .collection("users")
            .doc(this.props.otherUser)
            .collection("messages")
            .doc(this.props.userEmail)
            .collection("dates")
            .doc(String(this.props.timeStamp));

        return dateInfo
            .update({
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

    render() {
        var startTimeArr = [];
        var locationArr = "";
        var finalDateButton = [];
        console.log(this.state.dateDetails[this.state.dateDetails.length - 1]);
        const data = this.state.dateDetails[this.state.dateDetails.length - 1];
        console.log(typeof data);
        for (var key in data) {
            if (key === "location") {
                locationArr = data[key];
                console.log(locationArr);
            }
            if (key === "startTime") {
                startTimeArr = data["startTime"];
                startTimeArr.map(function(a) {
                    let dayName = ""; // eslint-disable-line no-use-before-define
                    let time = ""; // eslint-disable-line no-use-before-define
                    if (a.day === "sun") {
                        dayName = "Sunday";
                    }
                    if (a.day === "mon") {
                        dayName = "Monday";
                    }
                    if (a.day === "tues") {
                        dayName = "Tuesday";
                    }
                    if (a.day === "wed") {
                        dayName = "Wednesday";
                    }
                    if (a.day === "thurs") {
                        dayName = "Thursday";
                    }
                    if (a.day === "fri") {
                        dayName = "Friday";
                    }
                    if (a.day === "sat") {
                        dayName = "Saturday";
                    }
                    if (a.day === "sun") {
                        dayName = "Sunday";
                    }

                    a.times.forEach(time => {
                        console.log(a.times);
                        console.log(dayName);
                        if (time.start === 1000) {
                            time = "10AM";
                        }
                        if (time.start === 1030) {
                            time = "10:30AM";
                        }
                        if (time.start === 1100) {
                            time = "11AM";
                        }
                        if (time.start === 1130) {
                            time = "11:30AM";
                        }
                        if (time.start === 1200) {
                            time = "12PM";
                        }
                        if (time.start === 1230) {
                            time = "12:30PM";
                        }
                        if (time.start === 1300) {
                            time = "1PM";
                        }
                        if (time.start === 1330) {
                            time = "1:30PM";
                        }
                        if (time.start === 1400) {
                            time = "2PM";
                        }
                        if (time.start === 1430) {
                            time = "2:30PM";
                        }
                        if (time.start === 1500) {
                            time = "3PM";
                        }
                        if (time.start === 1530) {
                            time = "3:30PM";
                        }
                        if (time.start === 1600) {
                            time = "4PM";
                        }
                        if (time.start === 1630) {
                            time = "4:30PM";
                        }
                        if (time.start === 1700) {
                            time = "5PM";
                        }
                        if (time.start === 1730) {
                            time = "5:30PM";
                        }
                        if (time.start === 1800) {
                            time = "6PM";
                        }
                        if (time.start === 1830) {
                            time = "6:30PM";
                        }
                        if (time.start === 1900) {
                            time = "7PM";
                        }
                        if (time.start === 1930) {
                            time = "7:30PM";
                        }
                        if (time.start === 2000) {
                            time = "8PM";
                        }
                        if (time.start === 2030) {
                            time = "8:30PM";
                        }
                        if (time.start === 2100) {
                            time = "9PM";
                        }
                        if (time.start === 2130) {
                            time = "9:30PM";
                        }
                        if (time.start === 2200) {
                            time = "10PM";
                        }
                        if (time.start === 2230) {
                            time = "10:30PM";
                        }
                        finalDateButton.push(dayName + ", " + time);
                    });
                });
                console.log(finalDateButton);
            }
        }
        return (
            <div id="datebackground">
                <h3 id="letsdate">
                    {" "}
                    You have an upcoming date at {locationArr} at{" "}
                    {this.state.timeConfirmed}{" "}
                </h3>
            </div>
        );
    }
}

export default DateConfirmed;
