import React, { Component } from "react"; // eslint-disable-line no-use-before-define
import { db } from "../FirestoreConfig";
import { Redirect } from "react-router-dom"; // eslint-disable-line no-use-before-define
import "./SignUp.css";
import SignUp1 from "./SignUp1"; // eslint-disable-line no-use-before-define
import SignUp2 from "./SignUp2"; // eslint-disable-line no-use-before-define
import SignUp3 from "./SignUp3"; // eslint-disable-line no-use-before-define
import SignUp4 from "./SignUp4"; // eslint-disable-line no-use-before-define
import SignUpComplete from "./SignUpComplete"; // eslint-disable-line no-use-before-define

<<<<<<< HEAD
let fieldValues = "";
// let existingUser = false;
=======
let fieldValues = '';
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d

class SignUpInController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 2,
            existingUser: false
        };
        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    componentWillMount() {
        db
            .collection("users")
            .doc(this.props.user.email)
            .get()
            .then(doc => {
<<<<<<< HEAD
                console.log("doc", doc.data());
                // if (doc.exists) {
                if (!doc.data().newUser) {
                    // existingUser = true;

                    console.log("in if cwm", doc.data());
                    let ref = doc.data();
                    fieldValues = {
                        name: ref.name,
                        gender: ref.gender,
                        education: ref.education,
                        religion: ref.religion,
                        occupation: ref.occupation,
                        location: ref.location,
                        birthday: {
                            month: ref.birthday.month,
                            day: ref.birthday.day,
                            year: ref.birthday.year
                        },

                        matchGender: ref.matchGender,
                        matchAgeMin: ref.matchAgeMin,
                        matchAgeMax: ref.matchAgeMax,
                        matchDistance: ref.matchDistance,
                        availability: ref.availability,

                        dates: ref.dates,
                        topics: ref.topics,

                        dietaryPref: ref.dietaryPref,
                        priceMin: ref.priceMin,
                        priceMax: ref.priceMax,
                        neighborhoods: ref.neighborhoods,
                        foodTypeLIKE: ref.foodTypeLIKE,
                        foodTypeHATE: ref.foodTypeHATE,
                        music: ref.music
                    };
                    console.log("fv in cwm", fieldValues);
                    // this.setState({ existingUser: true })
                    // }
                } else {
                    console.log("in else cwm", fieldValues);
                    fieldValues = {
                        name: null,
                        gender: "",
=======
                if (!doc.exists) {
                    fieldValues = {
                        name: this.props.user.displayName,
                        gender: null, //this.props.user.gender,
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d
                        education: null,
                        religion: null,
                        occupation: null,
                        location: null, //this.props.user.location,
                        birthday: null, //this.props.user.birthday,

                        matchGender: null,
                        matchAgeMin: null,
                        matchAgeMax: null,
                        matchDistance: null,

                        availability: {
<<<<<<< HEAD
                            MORNING: [
                                false,
                                false,
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            AFTERNOON: [
                                false,
                                false,
                                false,
                                false,
                                false,
                                false,
                                false
                            ],
                            EVENING: [
                                false,
                                false,
                                false,
                                false,
                                false,
                                false,
                                false
                            ]
=======
                            sun: {
                                morning: null,
                                afternoon: null,
                                evening: null
                            },
                            mon: {
                                morning: null,
                                afternoon: null,
                                evening: null
                            },
                            tue: {
                                morning: null,
                                afternoon: null,
                                evening: null
                            },
                            wed: {
                                morning: null,
                                afternoon: null,
                                evening: null
                            },
                            thu: {
                                morning: null,
                                afternoon: null,
                                evening: null
                            },
                            fri: {
                                morning: null,
                                afternoon: null,
                                evening: null
                            },
                            sat: {
                                morning: null,
                                afternoon: null,
                                evening: null
                            }
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d
                        },

                        dates: {
                            coffee: null,
                            dinner: null,
                            drinks: null,
                            museum: null,
                            show: null,
                            park: null
                        },
                        topics: {
                            travel: null,
                            food: null,
                            music: null,
                            sports: null,
                            movies: null,
                            gaming: null,
                            nature: null,
                            animals: null,
                            tech: null
                        },

<<<<<<< HEAD
                        dietaryPref: {
                            VEGETARIAN: false,
                            "GLUTEN-FREE": false,
                            VEGAN: false,
                            "DAIRY-FREE": false,
                            "NO RED MEAT": false,
                            KOSHER: false,
                            PALEO: false,
                            RAW: false
                        },
                        priceMin: 3,
                        priceMax: 4,
                        neighborhoods: {
                            BALLARD: false,
                            BELLTOWN: false,
                            "CAPITOL HILL": false,
                            DOWNTOWN: false,
                            "INTERNATIONAL DISTRICT": false,
                            "FIRST HILL": false,
                            FREMONT: false,
                            GEORGETOWN: false,
                            "PIONEER SQUARE": false,
                            "QUEEN ANNE": false,
                            SODO: false,
                            "SOUTH LAKE UNION": false,
                            WALLINGFORD: false,
                            "WEST SEATTLE": false,
                            UDISTRICT: false
                        },
                        foodTypeLIKE: {
                            AMERICAN: false,
                            FRENCH: false,
                            CHINESE: false,
                            DESSERT: false,
                            GREEK: false,
                            HALAL: false,
                            INDIAN: false,
                            ITALIAN: false,
                            JAPANESE: false,
                            KOREAN: false,
                            MEDITERRANEAN: false,
                            MEXICAN: false,
                            PIZZA: false,
                            THAI: false,
                            "MIDDLE EASTERN": false
                        },
                        foodTypeHATE: {
                            AMERICAN: false,
                            FRENCH: false,
                            CHINESE: false,
                            DESSERT: false,
                            GREEK: false,
                            HALAL: false,
                            INDIAN: false,
                            ITALIAN: false,
                            JAPANESE: false,
                            KOREAN: false,
                            MEDITERRANEAN: false,
                            MEXICAN: false,
                            PIZZA: false,
                            THAI: false,
                            "MIDDLE EASTERN": false
                        },
                        music: {
                            POP: false,
                            COUNTRY: false,
                            EDM: false,
                            "R&B": false,
                            LATIN: false,
                            "HIP HOP": false,
                            ALTERNATIVE: false,
                            CLASSICAL: false,
                            INDIE: false,
                            FOLK: false,
                            JAZZ: false,
                            ROCK: false,
                            SOUL: false,
                            PUNK: false,
                            REGGAE: false
=======
                        foodPreferences: {
                            vegetarian: null,
                            glutenFree: null,
                            vegan: null,
                            dairyFree: null,
                            noRedMeat: null,
                            kosher: null,
                            paleo: null,
                            raw: null
                        },
                        datePrice: 1,
                        // neighborhoodPreferences: {
                        //     ballard: null,
                        //     belltown: null,
                        //     capitolHill: null,
                        //     downtown: null,
                        //     eastside: null,
                        //     firstHill: null,
                        //     fremont: null,
                        //     georgetown: null,
                        //     pioneerSquare: null,
                        //     queenAnne: null,
                        //     sodo: null,
                        //     slu: null,
                        //     uDistrict: null,
                        //     wallingford: null,
                        //     westSeattle: null
                        // },
                        cuisinePreferences: {
                            american: null,
                            french: null,
                            chinese: null,
                            dessert: null,
                            greek: null,
                            halal: null,
                            indian: null,
                            italian: null,
                            japanese: null,
                            korean: null,
                            mediterranean: null,
                            mexican: null,
                            middleEastern: null,
                            pizza: null,
                            thai: null
                        },
                        cuisineDislikes: {
                            american: null,
                            french: null,
                            chinese: null,
                            dessert: null,
                            greek: null,
                            halal: null,
                            indian: null,
                            italian: null,
                            japanese: null,
                            korean: null,
                            mediterranean: null,
                            mexican: null,
                            middleEastern: null,
                            pizza: null,
                            thai: null
                        },
                        musicPreferences: {
                            hiphop: null,
                            pop: null,
                            country: null,
                            latin: null,
                            edm: null,
                            rb: null,
                            rock: null,
                            alternative: null,
                            classical: null,
                            jazz: null,
                            indie: null,
                            folk: null,
                            reggae: null,
                            soul: null,
                            punk: null
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d
                        }
                    };

                } else {
                    let ref = doc.data();
                    fieldValues = {
                        name: ref.name,
                        gender: ref.gender,
                        education: ref.education,
                        religion: ref.religion,
                        occupation: ref.occupation,
                        location: ref.location,
                        birthday: {
                            month: ref.birthday.month,
                            day: ref.birthday.day,
                            year: ref.birthday.year
                        },

                        matchGender: ref.matchGender,
                        matchAgeMin: ref.matchAgeMin,
                        matchAgeMax: ref.matchAgeMax,
                        matchDistance: ref.matchDistance,
                        availability: ref.availability,

                        dates: ref.dates,
                        topics: ref.topics,

                        foodPreferences: ref.foodPreferences,
                        datePrice: ref.datePrice,
                        // neighborhoodPreferences: ref.neighborhoodPreferences,
                        cuisinePreferences: ref.cuisinePreferences,
                        cuisineDislikes: ref.cuisineDislikes,
                        musicPreferences: ref.musicPreferences
                    };
                    this.setState({ existingUser: true })
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
            });
    }

    saveValues(fields) {
        return (function() {
            fieldValues = Object.assign({}, fieldValues, fields);
        })();
    }

    nextStep() {
        this.setState(prevState => {
            return { step: prevState.step + 1 };
        });
    }

    previousStep() {
        this.setState(prevState => {
            return { step: prevState.step - 1 };
        });
    }

    submitRegistration() {
<<<<<<< HEAD
        let userRef = db.collection("users");
        userRef.doc(this.props.user.email).set(
            {
                name: fieldValues.name,
                gender: fieldValues.gender,
                education: fieldValues.education,
                religion: fieldValues.religion,
                occupation: fieldValues.occupation,
                location: fieldValues.location,
                birthday: {
                    month: fieldValues.birthday.month,
                    day: fieldValues.birthday.day,
                    year: fieldValues.birthday.year
                },
                matchGender: fieldValues.matchGender,
                matchAgeMin: fieldValues.matchAgeMin,
                matchAgeMax: fieldValues.matchAgeMax,
                matchDistance: fieldValues.matchDistance,
                availability: fieldValues.availability,

                dates: fieldValues.dates,
                topics: fieldValues.topics,
                dietaryPref: fieldValues.dietaryPref,
                priceMin: fieldValues.priceMin,
                priceMax: fieldValues.priceMax,
                neighborhoods: fieldValues.neighborhoods,
                foodTypeLIKE: fieldValues.foodTypeLIKE,
                foodTypeHATE: fieldValues.foodTypeHATE,
                music: fieldValues.music,

                newUser: false
            },
            { merge: true }
        );
=======
        console.log("Fv in submit", fieldValues)
        let userRef = db.collection('users');
        userRef.doc(this.props.user.email).set({
            name: fieldValues.name,
            gender: fieldValues.gender,
            education: fieldValues.education,
            religion: fieldValues.religion,
            occupation: fieldValues.occupation,
            location: fieldValues.location,
            birthday: fieldValues.birthday,
            matchGender: fieldValues.matchGender,
            matchAgeMin: fieldValues.matchAgeMin,
            matchAgeMax: fieldValues.matchAgeMax,
            matchDistance: fieldValues.matchDistance,

            availability: fieldValues.availability,
            foodPreferences: fieldValues.foodPreferences,
            cuisineDislikes: fieldValues.cuisineDislikes,
            cuisinePreferences: fieldValues.cuisinePreferences,
            datePrice: fieldValues.datePrice,
            musicPreferences: fieldValues.musicPreferences,
            dates: fieldValues.dates,
            topics: fieldValues.topics,
            onBoarding: true
        });
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d
        this.nextStep();
    }

    showStep() {
<<<<<<< HEAD
        console.log("FV in showstep", fieldValues);
=======
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d
        switch (this.state.step) {
            default:
                return (
                    <SignUp1
                        nextStep={this.nextStep}
                        saveValues={this.saveValues}
                        fieldValues={fieldValues}
                        existingUser={this.state.existingUser}
                    />
                );
            case 2:
                return (
                    <SignUp2
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        saveValues={this.saveValues}
                        fieldValues={fieldValues}
                    />
                );
            case 3:
                return (
                    <SignUp3
                        previousStep={this.previousStep}
                        nextStep={this.nextStep}
                        saveValues={this.saveValues}
                        fieldValues={fieldValues}
                    />
                );
            case 4:
                return (
                    <SignUp4
                        previousStep={this.previousStep}
                        saveValues={this.saveValues}
                        fieldValues={fieldValues}
                        submitRegistration={this.submitRegistration}
                    />
                );
            case 5:
                return <SignUpComplete nextStep={this.nextStep} />;
            case 6:
                return <Redirect to={"/messenger"} />;
        }
    }
    render() {
        let progress = this.state.step * 25;
<<<<<<< HEAD
        return (
            // return !this.state.existingUser ? (
            //     <span>Loading data...</span>
            // ) : (
=======
        return (!this.state.existingUser ? <span>Loading data...</span> : (
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d
            <div className="signup-wrapper">
                <div
                    style={{ width: progress + "vw" }}
                    className="progress-bar"
                >
                    {" "}
                </div>
                {this.showStep()}
            </div>
<<<<<<< HEAD
            // )
        );
=======
        ));
>>>>>>> 4cf581a2e3e9c36fde6b3745879c648a2b39cf0d
    }
}
export default SignUpInController;