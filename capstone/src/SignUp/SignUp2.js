import React from "react";
import { auth } from "../FirestoreConfig";
import { Link } from "react-router-dom";
import "./SignUp.css";
import next from "../img/next.svg";
import back from "../img/back.svg";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";

// found here http://react-component.github.io/slider/examples/handle.html
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const RangeConst = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

class SignUp2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      user: this.props.user,
      content: this.props.content
    };
  }

  logout() {
    auth.signOut();
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

    return (
      <div class="signup-page">
        <div className="tagline-2">TELL US WHO YOU'RE LOOKING FOR</div>
        <img
          src={back}
          className="back back-2"
          onClick={this.props.previousStep}
        />
        <form className="form" onSubmit={this.nextStep}>
          <div className="next-step next">
            <input type="image" className="next next-2" src={next} />
          </div>
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
          </select>

          <label className="signup-label" for="match-age">
            AGE
          </label>
          <div id="ageRange">
            <Range
              min={18}
              max={55}
              defaultValue={[25, 30]}
              handle={handle}
              trackStyle={[
                { backgroundColor: "#828282" },
                { backgroundColor: "#828282" }
              ]}
              handleStyle={[
                { backgroundColor: "#9BA2FF", borderColor: "#9BA2FF" },
                { backgroundColor: "#9BA2FF", borderColor: "#9BA2FF" }
              ]}
              //   onChange={v => this.handleChange("name", v)}
              //   //     console.log(this.state.maxValue);
              //   //   }
            />
          </div>
          <label className="signup-label distance-wrapper" for="distance">
            DISTANCE
          </label>
          <div id="distance">
            <Slider
              min={0}
              max={50}
              defaultValue={10}
              handle={handle}
              trackStyle={[{ backgroundColor: "#828282" }]}
              handleStyle={[
                { backgroundColor: "#9BA2FF", borderColor: "#9BA2FF" }
              ]}
              onChange={v => this.handleChange("name", v)}
            />
          </div>
        </form>
      </div>
    );
  }

  nextStep(e) {
    let currentComponent = this;
    e.preventDefault();
    console.log("document.getelemnt", document.getElementsByTagName("Range"));
    var data = {
      matchGender: e.target.matchGender.value,
      ageRange: e.target.ageRange.value,
      distance: e.target.distance.value
    };
    console.log("data", data);
    currentComponent.props.saveValues(data);
    currentComponent.props.nextStep();
  }
}

export default SignUp2;
