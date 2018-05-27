import React, { Component } from 'react';
import { db } from '../FirestoreConfig';
import { Redirect } from 'react-router-dom';
import './SignUp.css';
import SignUp1 from './SignUp1';
import SignUp2 from './SignUp2';
import SignUp3 from './SignUp3';
import SignUp4 from './SignUp4';
import SignUpComplete from './SignUpComplete';

let fieldValues = '';

class SignUpInController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            existingUser: false
        };
        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.submitRegistration = this.submitRegistration.bind(this);
    }

    componentWillMount() {
        db
            .collection('users')
            .doc(this.props.user.email)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    fieldValues = {
                        name: null,
                        gender: '',
                        education: null,
                        religion: null,
                        occupation: null,
                        location: null,
                        birthday: {
                            month: null,
                            day: null,
                            year: null
                        },

                        matchGender: null,
                        matchAgeMin: null,
                        matchAgeMax: null,
                        matchDistance: null,

                        availability: {
                            "MORNING": [false, false, false, false, false, false, false],
                            "AFTERNOON": [false, false, false, false, false, false, false],
                            "EVENING": [false, false, false, false, false, false, false]
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

                        dietaryPref: {
                            "VEGETARIAN": false,
                            "GLUTEN-FREE": false,
                            "VEGAN": false,
                            "DAIRY-FREE": false,
                            "NO RED MEAT": false,
                            "KOSHER": false,
                            "PALEO": false,
                            "RAW": false
                        },
                        priceMin: 3,
                        priceMax: 4,
                        neighborhoods: {
                            "BALLARD": false,
                            "BELLTOWN": false,
                            "CAPITOL HILL": false,
                            "DOWNTOWN": false,
                            "INTERNATIONAL DISTRICT": false,
                            "FIRST HILL": false,
                            "FREMONT": false,
                            "GEORGETOWN": false,
                            "PIONEER SQUARE": false,
                            "QUEEN ANNE": false,
                            "SODO": false,
                            "SOUTH LAKE UNION": false,
                            "WALLINGFORD": false,
                            "WEST SEATTLE": false,
                            "UDISTRICT": false
                        },
                        foodTypeLIKE: {
                            "AMERICAN": false,
                            "FRENCH": false,
                            "CHINESE": false,
                            "DESSERT": false,
                            "GREEK": false,
                            "HALAL": false,
                            "INDIAN": false,
                            "ITALIAN": false,
                            "JAPANESE": false,
                            "KOREAN": false,
                            "MEDITERRANEAN": false,
                            "MEXICAN": false,
                            "PIZZA": false,
                            "THAI": false,
                            "MIDDLE EASTERN": false
                        },
                        foodTypeHATE: {
                            "AMERICAN": false,
                            "FRENCH": false,
                            "CHINESE": false,
                            "DESSERT": false,
                            "GREEK": false,
                            "HALAL": false,
                            "INDIAN": false,
                            "ITALIAN": false,
                            "JAPANESE": false,
                            "KOREAN": false,
                            "MEDITERRANEAN": false,
                            "MEXICAN": false,
                            "PIZZA": false,
                            "THAI": false,
                            "MIDDLE EASTERN": false
                        },
                        music: {
                            "POP": false,
                            "COUNTRY": false,
                            "EDM": false,
                            "R&B": false,
                            "LATIN": false,
                            "HIP HOP": false,
                            "ALTERNATIVE": false,
                            "CLASSICAL": false,
                            "INDIE": false,
                            "FOLK": false,
                            "JAZZ": false,
                            "ROCK": false,
                            "SOUL": false,
                            "PUNK": false,
                            "REGGAE": false
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

                        dietaryPref: ref.dietaryPref,
                        priceMin: ref.priceMin,
                        priceMax: ref.priceMax,
                        neighborhoods: ref.neighborhoods,
                        foodTypeLIKE: ref.foodTypeLIKE,
                        foodTypeHATE: ref.foodTypeHATE,
                        music: ref.music
                    };
                    this.setState({ existingUser: true })
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    saveValues(fields) {
        return (function () {
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
        let userRef = db.collection('users');
        userRef.doc(this.props.user.email).set({
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

            onBoarding: true
        });
        this.nextStep();
    }

    showStep() {
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
                return <Redirect to={'/messenger'} />;
        }
    }
    render() {
        let progress = this.state.step * 25;
        return (!this.state.existingUser ? <span>Loading data...</span> : (
            <div className="signup-wrapper">
                <div
                    style={{ width: progress + 'vw' }}
                    className="progress-bar"
                >
                    {' '}
                </div>
                {this.showStep()}
            </div>
        ));
    }
}
export default SignUpInController;
