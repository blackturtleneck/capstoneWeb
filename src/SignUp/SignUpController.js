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
                        name: this.props.user.displayName,
                        gender: null, //this.props.user.gender,
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
