import React from 'react';
import { db } from '../../FirestoreConfig';
import './sideProf.css'
// import FirstDates from '../../Enums'
let dateArray = []; //firstDates
let topicArray = []; //interests
class SideProf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUser: this.props.otherUser
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
                    console.log("dates", doc.data().dates)

                    dateArray = [];
                    topicArray = [];

                    Object.keys(doc.data().dates).forEach((date) => {
                        if (doc.data().dates[date]) {
                            Object.keys(firstDates).forEach((cName) => {
                                if (date == cName) {
                                    dateArray.push(firstDates[cName])
                                }
                            })
                        }
                    })
                    component.setState({ dateArray: dateArray })

                    console.log(dateArray)

                    Object.keys(doc.data().topics).forEach((topic) => {
                        if (doc.data().topics[topic]) {
                            console.log(topic)

                            Object.keys(interests).forEach((cName) => {
                                if (topic == cName) {
                                    topicArray.push(interests[cName])
                                }
                            })
                        }
                    })
                    component.setState({ topicArray: topicArray })

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
                        console.log("dates", doc.data().dates)
                        dateArray = [];
                        topicArray = [];

                        Object.keys(doc.data().dates).forEach((date) => {
                            if (doc.data().dates[date]) {
                                Object.keys(firstDates).forEach((cName) => {
                                    if (date == cName) {
                                        dateArray.push(firstDates[cName])
                                    }
                                })
                            }
                        })
                        component.setState({ dateArray: dateArray })
                        Object.keys(doc.data().topics).forEach((topic) => {
                            if (doc.data().topics[topic]) {
                                console.log(topic)

                                Object.keys(interests).forEach((cName) => {
                                    if (topic == cName) {
                                        topicArray.push(interests[cName])
                                    }
                                })
                            }
                        })
                        component.setState({ topicArray: topicArray })

                        this.setState({ dateArray: dateArray })
                        console.log("DATEDATE", this.state)
                    }

                    // console.log("in call", this.state)
                    component.forceUpdate();
                })

        }
        // console.log("receive befere force", this.state)

        // this.forceUpdate();
        // console.log("receive after force", this.state)

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
        // console.log("render", Object.keys(this.state.otherDoc.dates))
        // let age = '';
        // if(this.state.otherDoc.birthday) {
        // age = this.calcAge(this.state.otherDoc.birthday).bind(this)
        // }
        // // let dates = []
        // Object.keys(this.state.otherDoc.dates).forEach((date) => {
        //         dates.push(this.state.otherDoc.dates[date])
        //     })
        // console.log(Object.keys(this.state.otherDoc.dates))
        return (
            <div className="otherProfile-container" >
                {this.state.otherDoc &&
                    <div>
                        <h4 className="other-header" > {this.state.otherDoc.name} </h4 >
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
                        <div className="icon-container">
                            {dateArray.map((date, index) => {
                                return (<i key={index} className={date}>{''}</i>)
                            })}
                        </div>
                        <img className="sideProf-img" src={this.state.otherDoc.imgProfile[2]} alt={this.state.otherDoc.name} />
                        <p className="otherProfile-info-type">MY INTERESTS</p>
                        <div className="icon-container">
                            {topicArray.map((topic, index) => {
                                return (<i key={index} className={topic}>{''}</i>)
                            })}
                        </div>
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
const interests = {
    ANIMALS: "fas fa-paw fa-3x",
    TRAVEL: "fas fa-plane fa-3x",
    FOOD: "fas fa-utensils fa-3x",
    MUSIC: "fas fa-music fa-3x",
    SPORTS: "fas fa-futbol fa-3x",
    MOVIES: "fas fa-film fa-3x",
    TECH: "fas fa-mobile fa-3x",
    GAMING: "fas fa-gamepad fa-3x",
    NATURE: "fas fa-tree fa-3x",
    COFFEE: "fas fa-coffee fa-3x",
    DRINKS: "fas fa-glass-martini fa-3x",
    DINNER: "fas fa-utensils fa-3x",
    MUSEUM: "fas fa-institution fa-3x",
    SHOW: "fas fa-ticket fa-3x",
    PARK: "fas fa-tree fa-3x"
};

const firstDates = {
    coffee: "fas fa-coffee fa-3x",
    drinks: "fas fa-glass-martini fa-3x",
    dinner: "fas fa-utensils fa-3x",
    museum: "fas fa-university fa-3x",
    show: "fas fa-ticket-alt fa-3x",
    park: "fas fa-tree fa-3x"
}
export default SideProf;