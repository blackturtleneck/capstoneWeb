import React from 'react';
import { auth } from '../FirestoreConfig';
import './SignUp.css';
import next from '../img/next.svg';
import back from '../img/back.svg';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';

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
            distance: 10
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
        console.log("state s2", this.state)

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
