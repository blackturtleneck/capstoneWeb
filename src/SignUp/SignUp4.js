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

// Cool checkboxes here https://codepen.io/valerypatorius/pen/oXGMGL/

class SignUp4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            datePrice: this.props.fieldValues.datePrice,
            foodPreferences: this.props.fieldValues.foodPreferences,
            // neighborhoodPreferences: this.props.fieldValues.neighborhoodPreferences,
            cuisinePreferences: this.props.fieldValues.cuisinePreferences,
            cuisineDislikes: this.props.fieldValues.cuisineDislikes,
            musicPreferences: this.props.fieldValues.musicPreferences,
            bio: this.props.fieldValues.bio
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
            priceRange: value
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
            datePrice: this.state.datePrice,
            foodPreferences: this.state.foodPreferences,
            cuisinePreferences: this.state.cuisinePreferences,
            cuisineDislikes: this.state.cuisineDislikes,
            musicPreferences: this.state.musicPreferences,
            bio: this.state.bio
            // neighborhoodPreferences: this.state.neighborhoodPreferences
        };
        console.log("4", data)

        this.props.saveValues(data);
        this.props.submitRegistration();
    }
    bioChange(e) {
        this.setState({ bio: e.target.value })
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
        console.log("4 render", this.state)

        return (
            <div className="signup-page">
                <div className="tagline-2">
                    TELL US MORE &amp; GET BETTER DATES
                </div>
                <img
                    src={back}
                    className="back back-2"
                    onClick={this.props.previousStep}
                    alt="back"
                />
                <img
                    className="next next-3"
                    src={next}
                    alt="next"
                    onClick={this.nextStep}
                />
                <div id="signup4" >

                    <div className="bio-label">
                        <label className="signup-label signup4-header" htmlFor="bio">
                            ABOUT ME
                        </label>
                    </div>
                    <div className="bio">
                        <textarea value={this.state.bio} onChange={this.bioChange.bind(this)} />
                    </div>

                    <div className="foodPref-label">
                        <label
                            className="signup-label signup4-header"
                            htmlFor="foodPreferencesAllergies"
                        >
                            FOOD PREFERENCES / ALLERGIES
                        </label>
                    </div>
                    <div id="foodAllergies">
                        {Object.keys(this.props.fieldValues.foodPreferences).map((item, index) => {
                            return (
                                <div className="boxes" key={index}>
                                    <input
                                        type="checkbox"
                                        id={"box" + index}
                                        className="pref-checkbox"
                                        checked={this.state.foodPreferences[item]}
                                        onChange={() => {
                                            let foodTemp = this.state.foodPreferences;
                                            if (foodTemp[item]) {
                                                foodTemp[item] = false;
                                            } else {
                                                foodTemp[item] = true;
                                            }
                                            this.setState({ foodPreferences: foodTemp })

                                        }} />
                                    <label htmlFor={"box" + index}>{item}</label>
                                </div>
                            );
                        })}
                    </div>
                    {/* TODO signup: 
                    - make range is slider of prices ($$$), not numbers 
                    - fix next arrows to be consistent
                    - month doesnt render from firebase 
                    - signup3 bottom section shouldnt need to scroll down*/}
                    <div id="priceRange">
                        <label className="signup-label" htmlFor="datePrice">
                            DATE PRICE PREFERENCE
                        </label>
                        <Slider
                            min={1}
                            max={3}
                            defaultValue={this.state.datePrice}
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

                    <br />
                    <div id="foodLike">
                        <label
                            className="signup-label signup4-header"
                            htmlFor="CuisinesYes"
                        >
                            CUISINES I LIKE
                        </label>
                        <br />
                        {Object.keys(this.props.fieldValues.cuisinePreferences).map((food, index) => {
                            return (
                                <button
                                    className={
                                        this.state.cuisinePreferences[food] ? 'pref-button active' : 'pref-button'
                                    }
                                    key={index}
                                    onClick={() => {
                                        let f = this.state.cuisinePreferences;
                                        if (f[food]) {
                                            f[food] = false;
                                        } else {
                                            f[food] = true;
                                        }
                                        this.setState({ cuisinePreferences: f })

                                    }}
                                >{food}</button>);
                        })}
                    </div>
                    <div id="foodHate">
                        <br />
                        <label
                            className="signup-label signup4-header"
                            htmlFor="CuisinesNo"
                        >
                            CUISINES I HATE
                        </label>
                        <br />
                        {Object.keys(this.props.fieldValues.cuisineDislikes).map((food, index) => {
                            return (
                                <button
                                    className={
                                        this.state.cuisineDislikes[food] ? 'pref-button active' : 'pref-button'
                                    }
                                    key={index}
                                    onClick={() => {
                                        let f = this.state.cuisineDislikes;
                                        if (f[food]) {
                                            f[food] = false;
                                        } else {
                                            f[food] = true;
                                        }
                                        this.setState({ cuisineDislikes: f })

                                    }}
                                >{food}</button>);
                        })}
                    </div>
                    <div id="musicLike">
                        <br />
                        <label
                            className="signup-label signup4-header"
                            htmlFor="Music"
                        >
                            MUSIC PREFERENCES
                        </label>
                        <br />
                        {Object.keys(this.props.fieldValues.musicPreferences).map((genre, index) => {
                            return (
                                <button
                                    className={
                                        this.state.musicPreferences[genre] ? 'pref-button active' : 'pref-button'
                                    }
                                    key={index}
                                    onClick={() => {
                                        let m = this.state.musicPreferences;
                                        if (m[genre]) {
                                            m[genre] = false;
                                        } else {
                                            m[genre] = true;
                                        }
                                        this.setState({ musicPreferences: m })

                                    }}
                                >{genre}</button>);
                        })}
                    </div>
                </div>
            </div >
        );
    }
}

export default SignUp4;

// try to pass " " in as prop to this, if "", new profile, otherwisse, take from db to edit profile
