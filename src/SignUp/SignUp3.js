import React from 'react';
import { auth } from '../FirestoreConfig';
import './SignUp.css';
import next from '../img/next.svg';
import back from '../img/back.svg';
import Tooltip from 'rc-tooltip';
import { Icons } from '../Enums'

class SignUp3 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: this.props.user,
            content: this.props.content
        };
        this.nextStep = this.nextStep.bind(this);
    }

    logout() {
        auth.signOut();
    }

    nextStep(e) {
        e.preventDefault();
        var data = {
            matchGender: e.target.matchGender.value,
            ageRange: this.state.ageRange,
            distance: this.state.distance
        };
        this.props.saveValues(data);
        this.props.nextStep();
    }

    render() {
        const dateicons = ["COFFEE", "DRINKS", "DINNER", "MUSEUM", "SHOW", "PARK"]
        const talkToMeIcons = ["ANIMALS", "TRAVEL", "FOOD", "MUSIC", "SPORTS", "MOVIES", "TECH", "GAMING", "NATURE"]
        return (
            <div className="signup-page">

                <div className="tagline-2">PICK YOUR DATE PREFERENCES</div>
                <img
                    src={back}
                    className="back back-2"
                    onClick={this.props.previousStep}
                    alt="back"
                />
                <form className="form" onSubmit={this.nextStep}>
                    <div className="next-step next">
                        <input
                            type="image"
                            className="next next-2"
                            src={next}
                            alt="next"
                        />
                    </div>

                </form>
                <div className="tagline-3">ON A FIRST DATE, I LIKE TO...</div>
                {dateicons.map((icon, index) => {
                    return (
                        <div>
                            <i key={index} className={Icons[icon]} />
                            <p>{icon}</p>
                        </div>
                    );
                })}
                <div className="tagline-3">TALK TO ME ABOUT...</div>

                {talkToMeIcons.map((icon, index) => {
                    return (
                        <div>
                            <i key={index} className={Icons[icon]} />
                            <p>{icon}</p>
                        </div>
                    );
                })}




            </div>
        );
    }
}

export default SignUp3;

// try to pass " " in as prop to this, if "", new profile, otherwisse, take from db to edit profile