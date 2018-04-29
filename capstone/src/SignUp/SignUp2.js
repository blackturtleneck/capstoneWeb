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
          visible={dragging}
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
          <label className="signup-label" for="match-gender">
            I'M LOOKING FOR...
          </label>
          <select
            className="custom-select"
            name="match-gender"
            value={this.props.fieldValues.matchGender}
          >
            <option selected />
            <option value="male">MALE</option>
            <option value="female">FEAMLE</option>
          </select>

          <label className="signup-label" for="match-age">
            AGE
          </label>
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
          />
        </form>
      </div>
    );
  }
}

export default SignUp2;
