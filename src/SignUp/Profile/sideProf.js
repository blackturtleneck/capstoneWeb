import React from 'react';
import { db } from '../../FirestoreConfig';
import './sideProf.css'
// import FirstDates from '../../Enums'
let usersDates = []; //allDates
let usersTopics = []; //allTopics
let userAge = '';
class SideProf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otherUser: this.props.otherUser
        };
        this.calcAge = this.calcAge.bind(this);
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
                    usersDates = [];
                    usersTopics = [];

                    Object.keys(doc.data().dates).forEach((date) => {
                        if (doc.data().dates[date]) {
                            Object.keys(allDates).forEach((cName) => {
                                if (date == cName) {
                                    usersDates.push(allDates[cName])
                                }
                            })
                        }
                    })
                    component.setState({ usersDates: usersDates })

                    Object.keys(doc.data().topics).forEach((topic) => {
                        if (doc.data().topics[topic]) {
                            console.log("all topic", topic)

                            Object.keys(allTopics).forEach((cName) => {
                                if (topic == cName) {
                                    console.log("user topics", topic)
                                    usersTopics.push(allTopics[cName])
                                }
                            })
                        }
                    })
                    console.log("all users topics", usersTopics)
                    this.setState({ usersTopics: usersTopics })
                    userAge = this.calcAge.bind(this, doc.data().birthday)
                    console.log(userAge)
                }
            })
        console.log("topics outside function", usersTopics)
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
                        // console.log("dates", doc.data().dates)
                        usersDates = [];
                        usersTopics = [];

                        Object.keys(doc.data().dates).forEach((date) => {
                            if (doc.data().dates[date]) {
                                Object.keys(allDates).forEach((cName) => {
                                    if (date == cName) {
                                        usersDates.push(allDates[cName])
                                    }
                                })
                            }
                        })
                        component.setState({ usersDates: usersDates })
                        Object.keys(doc.data().topics).forEach((topic) => {
                            if (doc.data().topics[topic]) {
                                console.log("all topic", topic)

                                Object.keys(allTopics).forEach((cName) => {
                                    if (topic == cName) {
                                        console.log("user topics", topic)

                                        usersTopics.push(allTopics[cName])
                                    }
                                })
                            }
                        })
                        component.setState({ usersTopics: usersTopics })
                        userAge = this.calcAge.bind(this, doc.data().birthday)
                        // () => this.calcAge(doc.data().birthday)
                        console.log(userAge)
                    }
                    component.forceUpdate();
                })
        }
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
        userAge = years;
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
                        <p className="otherProfile-info">{userAge}</p>
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
                            {usersDates.map((date, index) => {
                                return (<i key={index} className={date}>{''}</i>)
                            })}
                        </div>

                        <img className="sideProf-img" src={this.state.otherDoc.imgProfile[2]} alt={this.state.otherDoc.name} />

                        <p className="otherProfile-info-type">MY TOPICS</p>
                        <div className="icon-container">
                            {usersTopics.map((topic, index) => {
                                return (<i key={index} className={topic}>{''}</i>)
                            })}
                        </div>

                        <img className="sideProf-img" src={this.state.otherDoc.imgProfile[3]} alt={this.state.otherDoc.name} />
                        <p className="otherProfile-info-type">BIO</p>
                        <p className="otherProfile-info">{this.state.otherDoc.bio}</p>
                        <button className="block-button">BLOCK</button>
                        <button className="unmatch-button">UNMATCH</button>
                    </div>
                }
            </div>
        );
    }
}
const allTopics = {
    animals: "fas fa-paw fa-3x",
    travel: "fas fa-plane fa-3x",
    food: "fas fa-utensils fa-3x",
    music: "fas fa-music fa-3x",
    sports: "fas fa-futbol fa-3x",
    movies: "fas fa-film fa-3x",
    tech: "fas fa-mobile fa-3x",
    gaming: "fas fa-gamepad fa-3x",
    nature: "fas fa-tree fa-3x",
    coffee: "fas fa-coffee fa-3x",
    drinks: "fas fa-glass-martini fa-3x",
    dinner: "fas fa-utensils fa-3x",
    museum: "fas fa-institution fa-3x",
    show: "fas fa-ticket fa-3x",
    park: "fas fa-tree fa-3x"
};

const allDates = {
    coffee: "fas fa-coffee fa-3x",
    drinks: "fas fa-glass-martini fa-3x",
    dinner: "fas fa-utensils fa-3x",
    museum: "fas fa-university fa-3x",
    show: "fas fa-ticket-alt fa-3x",
    park: "fas fa-tree fa-3x"
}
export default SideProf;