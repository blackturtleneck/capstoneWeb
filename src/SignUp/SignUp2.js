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
            ageRange: [this.props.fieldValues.matchAgeMin, this.props.fieldValues.matchAgeMax],
            matchDistance: this.props.fieldValues.matchDistance,
            availability: this.props.fieldValues.availability
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

    render() {
        console.log(this.state.availability)
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
        const dataDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
        // console.log("this", this.state.availability.mon.morning)

        // let tempAvailability = this.state.availability;

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
                    <input
                        type="image"
                        className="next next-2"
                        src={next}
                        alt="next"
                    />
                    <label className="signup-label" for="matchGender">
                        I'M LOOKING FOR...
                    </label>
                    <select
                        required
                        className="custom-select margin"
                        name="matchGender"
                        value={this.props.fieldValues.matchGender}
                    >
                        <option selected />
                        <option value="male">MALE</option>
                        <option value="female">FEMALE</option>
                        <option value="both">BOTH</option>
                    </select>

                    <label className="signup-label" for="match-age">
                        AGE
                    </label>
                    <div id="ageRange">
                        <Range
                            min={18}
                            max={55}
                            defaultValue={[this.props.fieldValues.matchAgeMin, this.props.fieldValues.matchAgeMax]}
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
                        for="distance"
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



                    {/* <div id="availability-wrapper"> */}
                    <div className="tagline-2">I'M GENERALLY AVAILABLE...</div>
                    <br />
                    {/* <div className="gen-availability">
                            <div className="avail-left"> */}
                    <div className="weekday-wrapper">
                        {weekdays.map((day, index) => {
                            return (
                                <span className="weekday-label" key={index}>{day}</span>
                            );
                        })}
                    </div>
                    <br />
                    {/* {weekdayRows.map((time, index) => {
                        return (
                            <span className="weekday-time" key={index}>{time}</span>
                        );
                    })} */}
                    {/* </div> */}
                    <div className="weekday-time-morning">MORNING</div>
                    <div className="avail-row">
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.mon.morning}
                            onChange={() => {
                                let days = this.state.availability;
                                days.mon.morning = !days.mon.morning
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.tue.morning}
                            onChange={() => {
                                let days = this.state.availability;
                                days.tue.morning = !days.tue.morning
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.wed.morning}
                            onChange={() => {
                                let days = this.state.availability;
                                days.wed.morning = !days.wed.morning
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.thu.morning}
                            onChange={() => {
                                let days = this.state.availability;
                                days.thu.morning = !days.thu.morning
                                this.setState({ availability: days })
                            }}

                        />

                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.fri.morning}
                            onChange={() => {
                                let days = this.state.availability;
                                days.fri.morning = !days.fri.morning
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.sat.morning}
                            onChange={() => {
                                let days = this.state.availability;
                                days.sat.morning = !days.sat.morning
                                this.setState({ availability: days })
                            }}
                        />

                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.sun.morning}
                            onChange={() => {
                                let days = this.state.availability;
                                days.sun.morning = !days.sun.morning
                                this.setState({ availability: days })
                            }}
                        />
                    </div>
                    <br />
                    <div className="weekday-time-afternoon">AFTERNOON</div>
                    <div className="avail-row">
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.mon.afternoon}
                            onChange={() => {
                                let days = this.state.availability;
                                days.mon.afternoon = !days.mon.afternoon
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.tue.afternoon}
                            onChange={() => {
                                let days = this.state.availability;
                                days.tue.afternoon = !days.tue.afternoon
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.wed.afternoon}
                            onChange={() => {
                                let days = this.state.availability;
                                days.wed.afternoon = !days.wed.afternoon
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.thu.afternoon}
                            onChange={() => {
                                let days = this.state.availability;
                                days.thu.afternoon = !days.thu.afternoon
                                this.setState({ availability: days })
                            }}

                        />

                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.fri.afternoon}
                            onChange={() => {
                                let days = this.state.availability;
                                days.fri.afternoon = !days.fri.afternoon
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.sat.afternoon}
                            onChange={() => {
                                let days = this.state.availability;
                                days.sat.afternoon = !days.sat.afternoon
                                this.setState({ availability: days })
                            }}
                        />

                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.sun.afternoon}
                            onChange={() => {
                                let days = this.state.availability;
                                days.sun.afternoon = !days.sun.afternoon
                                this.setState({ availability: days })
                            }}
                        />
                    </div>
                    <br />
                    <div className="weekday-time-evening">EVENING</div>
                    <div className="avail-row">
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.mon.evening}
                            onChange={() => {
                                let days = this.state.availability;
                                days.mon.evening = !days.mon.evening
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.tue.evening}
                            onChange={() => {
                                let days = this.state.availability;
                                days.tue.evening = !days.tue.evening
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.wed.evening}
                            onChange={() => {
                                let days = this.state.availability;
                                days.wed.evening = !days.wed.evening
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.thu.evening}
                            onChange={() => {
                                let days = this.state.availability;
                                days.thu.evening = !days.thu.evening
                                this.setState({ availability: days })
                            }}

                        />

                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.fri.evening}
                            onChange={() => {
                                let days = this.state.availability;
                                days.fri.evening = !days.fri.evening
                                this.setState({ availability: days })
                            }}
                        />
                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.sat.evening}
                            onChange={() => {
                                let days = this.state.availability;
                                days.sat.evening = !days.sat.evening
                                this.setState({ availability: days })
                            }}
                        />

                        <Checkbox
                            className="avail-checkbox"
                            label="e"
                            checked={this.state.availability.sun.evening}
                            onChange={() => {
                                let days = this.state.availability;
                                days.sun.evening = !days.sun.evening
                                this.setState({ availability: days })
                            }}
                        />
                    </div>
                    {/* <Checkbox
                                className="avail-checkbox"
                                label="e"
                                checked={this.state.availability.mon.morning}
                                onChange={() => {
                                    let days = this.state.availability;
                                    days.mon.morning = !days.mon.morning
                                    if (days.mon.morning) {
                                        days.mon.morning = false;
                                    } else {
                                        days.mon.morning = true;
                                    }
                                    this.setState({ availability: days })
                                }}
                            /> */}

                    {/*}  //             < div className = "boxes" >
                                    //                 <input
                                    //                     type="checkbox"
                                    //                     id={"monMorn"}
                                    //                     className="pref-checkbox"
                                    //                     checked={this.state.availability.mon.morning}
                                    //                     onClick={(e) => {
                                    //                         console.log(e)
                                    // let days = this.state.availability;
                                    // days.mon.morning = !days.mon.morning
                                    // if (days.mon.morning) {
                                    //     days.mon.morning = false;
                                    // } else {
                                    //     days.mon.morning = true;
                                    // }
                                    //                         this.setState({ availability: days })

                                    //                     }} />
                                    //                 <label htmlFor={"box"}>{' '}</label>
                                    // </div>
                                    {/* <div className="boxes">
                                <input
                                    type="checkbox"
                                    id={"tueMorn"}
                                    className="pref-checkbox"
                                    checked={true}
                                    onChange={() => {
                                        console.log(this)
                                        // let days = this.state.availability;
                                        // days[day][time] = !days[day][time];
                                        // this.setState({ availability: days })

                                    }} />
                                <label htmlFor={"box"}>{' '}</label>
                            </div> */}

                    <div className="avail-right">
                        {/* {weekdayRows.map(function (time) {
                                    dataDays.map((day, dayIndex) => {
                                        return (
                                            <div className="boxes" key={dayIndex}>
                                                <input
                                                    type="checkbox"
                                                    id={"box" + dayIndex}
                                                    className="pref-checkbox"
                                                    checked={tempAvailability[day][time]}
                                                    onChange={() => {
                                                        console.log("HI")
                                                        // let days = tempAvailability;
                                                        // days[day][time] = !days[day][time];
                                                        // this.setState({ availability: days })
                                                    }} />
                                                <label htmlFor={"box" + dayIndex}>{' '}</label>
                                            </div>
                                        )
                                    })

                                })} */}


                        {/* <div className="morning">

                                    {this.state.availability["MORNING"].map((day, index) => {
                                        return (
                                            <Checkbox
                                                className="avail-checkbox"
                                                time="morning"
                                                key={index}
                                                label="e"
                                                checked={this.state.availability.MORNING[index]}
                                                onChange={() => {
                                                    let tempMorn = this.state.availability.MORNING;
                                                    tempMorn[index] = !tempMorn[index];
                                                    let nextState = {
                                                        "MORNING": tempMorn,
                                                        "AFTERNOON": this.state.availability.AFTERNOON,
                                                        "EVENING": this.state.availability.EVENING
                                                    }
                                                    this.setState({ availability: nextState })
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
                                                checked={this.state.availability.AFTERNOON[index]}
                                                onChange={() => {
                                                    let tempAft = this.state.availability.AFTERNOON;
                                                    tempAft[index] = !tempAft[index];
                                                    let nextState = {
                                                        "MORNING": this.state.availability.MORNING,
                                                        "AFTERNOON": tempAft,
                                                        "EVENING": this.state.availability.EVENING
                                                    }
                                                    this.setState({ availability: nextState })
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
                                                checked={this.state.availability.EVENING[index]}
                                                onChange={() => {
                                                    let tempEve = this.state.availability.EVENING;
                                                    tempEve[index] = !tempEve[index];
                                                    let nextState = {
                                                        "MORNING": this.state.availability.MORNING,
                                                        "AFTERNOON": this.state.availability.AFTERNOON,
                                                        "EVENING": tempEve
                                                    }
                                                    this.setState({ availability: nextState })
                                                }}
                                            />
                                        );
                                    })} */}
                        {/* </div> */}
                    </div>
                    {/* </div> */}
                    {/* </div> */}
                </form>
            </div>
        );
    }

    nextStep(e) {
        e.preventDefault();
        var data = {
            matchGender: e.target.matchGender.value,
            matchAgeMin: this.state.ageRange[0],
            matchAgeMax: this.state.ageRange[1],
            matchDistance: this.state.distance
        };
        console.log('data', data);
        this.props.saveValues(data);
        this.props.nextStep();
    }
}

export default SignUp2;
