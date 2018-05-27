import React from 'react';
import { auth } from '../FirestoreConfig';
import './SignUp.css';
import next from '../img/next.svg';
import back from '../img/back.svg';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import Checkbox from 'muicss/lib/react/checkbox';


// found here http://react-component.github.io/slider/examples/handle.html
const Handle = Slider.Handle;

class SignUp2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: this.props.user,
            content: this.props.content,
            ageRange: [25, 30],
            distance: 10,
            availability: {
                "MORNING": [false, false, false, false, false, false, false],
                "AFTERNOON": [false, false, false, false, false, false, false],
                "EVENING": [false, false, false, false, false, false, false]
            }
        };
        this.onRangeChange = this.onRangeChange.bind(this);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }

    logout() {
        auth.signOut();
    }

    onRangeChange(value) {
        this.setState({
            ageRange: value
        });
    }

    onSliderChange(value) {
        this.setState({
            distance: value
        });
    }

    nextStep(e) {
        e.preventDefault();
        var data = {
            matchGender: e.target.matchGender.value,
            matchAgeMin: this.state.ageRange[0],
            matchAgeMax: this.state.ageRange[1],
            availability: this.state.availability
        };
        this.props.saveValues(data);
        this.props.nextStep();
    }

    render() {
        const handle = props => {
            const { value, dragging, index, ...restProps } = props;
            return (
                <Tooltip
                    prefixCls="rc-slider-tooltip"
                    overlay={value}
                    visible={true}
                    placement="top"
                    key={index}
                >
                    <Handle value={value} {...restProps} />
                </Tooltip>
            );
        };

        const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
        const weekdayRows = ["MORNING", "AFTERNOON", "EVENING"]
        return (
            <div className="signup-page">
                <div className="tagline-2">TELL US WHO YOU'RE LOOKING FOR</div>
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
                    <label className="signup-label" htmlFor="matchGender">
                        I'M LOOKING FOR...
                    </label>
                    <select
                        required
                        className="custom-select margin"
                        name="matchGender"
                        value={this.props.fieldValues.matchGender}
                    >
                        <option selected value="select">select</option>
                        <option value="male">MALE</option>
                        <option value="female">FEMALE</option>
                        <option value="both">BOTH</option>
                    </select>

                    <label className="signup-label" htmlFor="match-age">
                        AGE
                    </label>
                    <div id="ageRange">
                        <Range
                            min={18}
                            max={55}
                            defaultValue={this.state.ageRange}
                            handle={handle}
                            trackStyle={[
                                { backgroundColor: '#828282' },
                                { backgroundColor: '#828282' }
                            ]}
                            handleStyle={[
                                {
                                    backgroundColor: '#9BA2FF',
                                    borderColor: '#9BA2FF'
                                },
                                {
                                    backgroundColor: '#9BA2FF',
                                    borderColor: '#9BA2FF'
                                }
                            ]}
                            onChange={this.onRangeChange}
                        />
                    </div>
                    <label
                        className="signup-label distance-wrapper"
                        htmlFor="distance"
                    >
                        DISTANCE
                    </label>
                    <div id="distance">
                        <Slider
                            min={0}
                            max={50}
                            defaultValue={this.state.distance}
                            handle={handle}
                            trackStyle={[{ backgroundColor: '#828282' }]}
                            handleStyle={[
                                {
                                    backgroundColor: '#9BA2FF',
                                    borderColor: '#9BA2FF'
                                }
                            ]}
                            onChange={this.onSliderChange}
                        />
                    </div>
                    <div id="availability-wrapper">
                        <div className="tagline-2">I'M GENERALLY AVAILABLE...</div>
                        <br />
                        <div className="gen-availability">
                            <div className="avail-left">
                                <br />
                                {weekdayRows.map((time, index) => {
                                    return (
                                        <span className="weekday-time" key={index}>{time}</span>
                                    );
                                })}
                            </div>
                            <div className="avail-right">
                                {weekdays.map((day, index) => {
                                    return (
                                        <span className="weekday-label" key={index}>{day}</span>
                                    );
                                })}
                                <div className="morning">

                                    {this.state.availability.MORNING.map((day, index) => {
                                        return (
                                            <Checkbox
                                                className="avail-checkbox"
                                                time="morning"
                                                key={index}
                                                label="e"
                                                onChange={() => {
                                                    let tempMorn = this.state.availability.MORNING;
                                                    tempMorn[index] = !tempMorn[index];
                                                    let nextState = {
                                                        "MORNING": tempMorn,
                                                        "AFTERNOON": this.state.availability.AFTERNOON,
                                                        "EVENING": this.state.availability.EVENING
                                                    }
                                                    this.setState({ availability: nextState })
                                                    console.log(this.state)
                                                }}
                                            />
                                        );
                                    })}

                                </div>

                                <div className="afternoon">
                                    {this.state.availability.AFTERNOON.map((day, index) => {
                                        return (
                                            <Checkbox
                                                className="avail-checkbox"
                                                time="afternoon"
                                                key={index}
                                                label="e"
                                                onChange={() => {
                                                    let tempAft = this.state.availability.AFTERNOON;
                                                    tempAft[index] = !tempAft[index];
                                                    let nextState = {
                                                        "MORNING": this.state.availability.MORNING,
                                                        "AFTERNOON": tempAft,
                                                        "EVENING": this.state.availability.EVENING
                                                    }
                                                    this.setState({ availability: nextState })
                                                    console.log(this.state)
                                                }}
                                            />

                                        );
                                    })}
                                </div>
                                <div className="evening">
                                    {this.state.availability.EVENING.map((day, index) => {
                                        return (
                                            <Checkbox
                                                className="avail-checkbox"
                                                time="evening"
                                                key={index}
                                                label="e"
                                                onChange={() => {
                                                    let tempEve = this.state.availability.EVENING;
                                                    tempEve[index] = !tempEve[index];
                                                    let nextState = {
                                                        "MORNING": this.state.availability.MORNING,
                                                        "AFTERNOON": this.state.availability.AFTERNOON,
                                                        "EVENING": tempEve
                                                    }
                                                    this.setState({ availability: nextState })
                                                    console.log(this.state)
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}



export default SignUp2;

// try to pass " " in as prop to this, if "", new profile, otherwisse, take from db to edit profile