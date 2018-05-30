import React from 'react';
import { db } from '../../FirestoreConfig';
import './sideProf.css'
import RequestDate from '../../RequestDate'
import ReceiveRequest from '../../ReceiveRequest.js'
import DateConfirmed from '../../DateConfirmed.js'
import SentRequest from '../../SentRequest.js'
import Availability3 from '../../Availability3.js'

import '../../DatesSelection.css'
import { Button } from "react-bootstrap";

class SideProf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUser: this.props.otherUser,
            userEmail: this.props.userEmail
        };
    }

    componentWillMount() {
        let component = this;
        db
            .collection("users")
            .doc(this.state.otherUser)
            .get()
            .then(doc => {
                if (doc.exists) {
                    component.setState({ otherDoc: doc.data() })
                }
            })
        console.log("willmount", this.state)
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            otherUser: newProps.otherUser
        });
        if (newProps.otherUser !== this.state.otherUser) {
            let component = this;
            db
                .collection("users")
                .doc(newProps.otherUser)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        component.setState({ otherDoc: doc.data() })
                    }
                    console.log("in call", this.state)
                    component.forceUpdate();
                })
        }
        console.log("receive befere force", this.state)

        // this.forceUpdate();
        console.log("receive after force", this.state)

    }

    calcAge(birthday) {
        const months = {
            JANUARY: "01",
            FEBRUARY: "02",
            MARCH: "03",
            APRIL: "04",
            MAY: "05",
            JUNE: "06",
            JULY: "07",
            AUGUST: "08",
            SEPTEMBER: "09",
            OCTOBER: "10",
            NOVEMBER: "11",
            DECEMBER: "12"
        };

        console.log("birthday", birthday);
        let birthYear = birthday.year;
        let year = new Date().getFullYear();
        let years = year - birthYear;

        let month = new Date().getMonth();
        if (month < 10) {
            month = 0 + "" + month;
        }
        let birthMonth = months[birthday.month];

        let day = new Date().getDate();
        if (day < 10) {
            day = 0 + "" + day;
        }
        let birthDay = birthday.day;

        if (birthMonth > month) {
            years--;
        } else if (birthMonth === month) {
            if (birthDay > day) {
                years--;
            }
        }
        this.setState({ age: years });
    }

    render() {
        console.log("render", this)
        // let age = '';
        // if(this.state.otherDoc.birthday) {
        // age = this.calcAge(this.state.otherDoc.birthday).bind(this)
        // }
        return (
            <div className="otherProfile-container" >

                {this.state.otherDoc &&
         
                    <div>
                        <h4 className="other-header" > {this.state.otherDoc.name} 
                      
                      </h4 >
             
                        <p className="otherProfile-info">{this.state.age}</p>
                        <p className="otherProfile-info">{this.state.otherDoc.location}</p>
                        <img className="sideProf-img" src={this.state.otherDoc.imgProfile[0]} alt={this.state.otherDoc.name} />
                        <p className="otherProfile-info-type">OCCUPATION</p>
                        <p className="otherProfile-info">{this.state.otherDoc.occupation}</p>
                        <p className="otherProfile-info-type">EDUCATION</p>
                        <p className="otherProfile-info">{this.state.otherDoc.education}</p>
                        <p className="otherProfile-info-type">RELIGION</p>
                        <p className="otherProfile-info">{this.state.otherDoc.religion}</p>
                        <img className="sideProf-img" src={this.state.otherDoc.imgProfile[1]} alt={this.state.otherDoc.name} />
                        <p className="otherProfile-info-type">MY FAVORITE FIRST DATES</p>
                        <div>firstdateicons</div>
                        <img className="sideProf-img" src={this.state.otherDoc.imgProfile[2]} alt={this.state.otherDoc.name} />
                        <p className="otherProfile-info-type">MY INTERESTS</p>
                        <div>interesticons</div>
                        <img className="sideProf-img" src={this.state.otherDoc.imgProfile[3]} alt={this.state.otherDoc.name} />
                        <p className="otherProfile-info-type">BIO</p>
                        <p className="otherProfile-info">{this.state.otherDoc.bio}</p>
                        <div>block</div>
                        <div>unmatch</div>
                    </div>
                }

            </div>

        );
    }
}
export default SideProf;