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

// Cool checkboxes here https://codepen.io/valerypatorius/pen/oXGMGL/

class SignUp4 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: true,
            user: this.props.user,
            content: this.props.content,
            priceRange: [this.props.fieldValues.priceMin, this.props.fieldValues.priceMax],
            dietaryPref: this.props.fieldValues.dietaryPref,
            neighborhoods: this.props.fieldValues.neighborhoods,
            foodTypeLIKE: this.props.fieldValues.foodTypeLIKE,
            foodTypeHATE: this.props.fieldValues.foodTypeHATE,
            music: this.props.fieldValues.music
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
            priceMin: this.state.priceRange[0],
            priceMax: this.state.priceRange[1],
            dietaryPref: this.state.dietaryPref,
            neighborhoods: this.state.neighborhoods,
            foodTypeLIKE: this.state.foodTypeLIKE,
            foodTypeHATE: this.state.foodTypeHATE,
            music: this.state.music
        };

        this.props.saveValues(data);
        this.props.submitRegistration();

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

        console.log(this.state)
        const foodPref = ["VEGETARIAN", "GLUTEN-FREE", "VEGAN", "DAIRY-FREE", "NO RED MEAT", "KOSHER", "PALEO", "RAW"];
        const neighborhoods = ["BALLARD", "BELLTOWN", "CAPITOL HILL", "DOWNTOWN", "INTERNATIONAL DISTRICT", "FIRST HILL", "FREMONT", "GEORGETOWN", "PIONEER SQUARE", "QUEEN ANNE", "SODO", "SOUTH LAKE UNION", "WALLINGFORD", "WEST SEATTLE", "UDISTRICT"];
        const foodTypes = ["AMERICAN", "FRENCH", "CHINESE", "DESSERT", "GREEK", "HALAL", "INDIAN", "ITALIAN", "JAPANESE", "KOREAN", "MEDITERRANEAN", "MEXICAN", "PIZZA", "THAI", "MIDDLE EASTERN"]
        const music = ["POP", "COUNTRY", "EDM", "R&B", "LATIN", "HIP HOP", "ALTERNATIVE", "CLASSICAL", "INDIE", "FOLK", "JAZZ", "ROCK", "SOUL", "PUNK", "REGGAE"]
        return (

            <div className="signup-page">
                <div className="tagline-2">TELL US MORE &amp; GET BETTER DATES</div>
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
                    <div className="foodPref-label">
                        <label className="signup-label signup4-header" htmlFor="foodPreferencesAllergies">
                            FOOD PREFERENCES / ALLERGIES
                        </label>
                    </div>
                    <div id="foodAllergies">
                        {foodPref.map((item, index) => {
                            return (
                                <div className="boxes" key={index}>
                                    <input type="checkbox" id={"box" + index} className="pref-checkbox"
                                        onChange={() => {
                                            let foodTemp = this.state.dietaryPref;
                                            if (foodTemp[item]) {
                                                foodTemp[item] = false;
                                            } else {
                                                foodTemp[item] = true;
                                            }
                                            this.setState({ dietaryPref: foodTemp })

                                        }} />
                                    <label htmlFor={"box" + index}>{item}</label>
                                </div>
                            );
                        })}
                    </div>
                    {/* TODO: make range is slider of prices ($$$), not numbers */}
                    <div id="priceRange">
                        <label className="signup-label" htmlFor="datePrice">
                            DATE PRICE PREFERENCE
                        </label>
                        <Range
                            min={1}
                            max={5}
                            defaultValue={this.state.priceRange}
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

                    <div id="neighborhoodLike">
                        <label className="signup-label signup4-header" htmlFor="Neighborhoods">
                            NEIGHBORHOODS I LIKE
                    </label>
                        <br />
                        {neighborhoods.map((neighborhood, index) => {
                            return (
                                <button
                                    className={
                                        this.state.neighborhoods[neighborhood] ? 'pref-button active' : 'pref-button'
                                    }
                                    key={index}
                                    onClick={() => {
                                        let n = this.state.neighborhoods;
                                        if (n[neighborhood]) {
                                            n[neighborhood] = false;
                                        } else {
                                            n[neighborhood] = true;
                                        }
                                        this.setState({ neighborhoods: n })

                                    }}
                                >{neighborhood}</button>);
                        })}
                    </div>
                    <br />
                    <div id="foodLike" >
                        <label className="signup-label signup4-header" htmlFor="CuisinesYes">
                            CUISINES I LIKE
                    </label>
                        <br />
                        {foodTypes.map((food, index) => {
                            return (
                                <button
                                    className={
                                        this.state.foodTypeLIKE[food] ? 'pref-button active' : 'pref-button'
                                    }
                                    key={index}
                                    onClick={() => {
                                        let f = this.state.foodTypeLIKE;
                                        if (f[food]) {
                                            f[food] = false;
                                        } else {
                                            f[food] = true;
                                        }
                                        this.setState({ foodTypeLIKE: f })

                                    }}
                                >{food}</button>);
                        })}
                    </div>
                    <div id="foodHate" >
                        <br />
                        <label className="signup-label signup4-header" htmlFor="CuisinesNo">
                            CUISINES I HATE
                    </label>
                        <br />
                        {foodTypes.map((food, index) => {
                            return (
                                <button
                                    className={
                                        this.state.foodTypeHATE[food] ? 'pref-button active' : 'pref-button'
                                    }
                                    key={index}
                                    onClick={() => {
                                        let f = this.state.foodTypeHATE;
                                        if (f[food]) {
                                            f[food] = false;
                                        } else {
                                            f[food] = true;
                                        }
                                        this.setState({ foodTypeHATE: f })

                                    }}
                                >{food}</button>);
                        })}
                    </div>
                    <div id="musicLike">
                        <br />
                        <label className="signup-label signup4-header" htmlFor="Music">
                            MUSIC PREFERENCES
                    </label>
                        <br />
                        {music.map((genre, index) => {
                            return (
                                <button
                                    className={
                                        this.state.music[genre] ? 'pref-button active' : 'pref-button'
                                    }
                                    key={index}
                                    onClick={() => {
                                        let m = this.state.music;
                                        if (m[genre]) {
                                            m[genre] = false;
                                        } else {
                                            m[genre] = true;
                                        }
                                        this.setState({ music: m })

                                    }}
                                >{genre}</button>);
                        })}
                    </div>
                </div>
                {/* </form> */}
            </div >
        );
    }
}



export default SignUp4;

// try to pass " " in as prop to this, if "", new profile, otherwisse, take from db to edit profile