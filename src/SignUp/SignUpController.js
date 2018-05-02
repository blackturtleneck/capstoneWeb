import React, { Component } from 'react';
import './SignUp.css';
import SignUp1 from './SignUp1';
import SignUp2 from './SignUp2';
import SignUp3 from './SignUp3';

let fieldValues = {
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
    }
};

class SignUpInController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 3
        };
        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
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

    showStep() {
        switch (this.state.step) {
        default:
            return (
                <SignUp1
                    nextStep={this.nextStep}
                    saveValues={this.saveValues}
                    fieldValues={fieldValues}
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
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                    saveValues={this.saveValues}
                    fieldValues={fieldValues}
                />
            );
        }
    }
    render() {
        let progress = this.state.step * 33.333;
        return (
            <div className="signup-wrapper">
                <div
                    style={{ width: progress + 'vw' }}
                    className="progress-bar"
                >
                    {' '}
                </div>
                {this.showStep()}
            </div>
        );
    }
}
export default SignUpInController;
