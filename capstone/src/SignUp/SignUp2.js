import React from "react";
import { auth } from "../FirestoreConfig";
import { Link } from "react-router-dom";
import "./SignUp.css";
import next from "../img/next.svg";
import back from "../img/back.svg";

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
    return (
      <div class="signup-page">
        {/* <div className="signup-header">
          <div className="signup-header-welcome"> WELCOME TO </div>
          <div className="signup-header-amp">A M P R</div>
          <div className="tagline">TELL US ABOUT YOURSELF</div>
        </div>
        <img src={next} onClick={this.props.nextStep} className="next" />

        <form className="form ">
           <label className="signup-label" for="name">
            NAME
          </label>
          <input name="name" type="text" className="form-input" />
          <label className="signup-label" for="gender">
            GENDER
          </label>
          <select name="gender" className="form-input custom-select">
            <option select />
            <option value="male">MALE</option>
            <option value="female">FEMALE</option>
          </select>
          <label className="signup-label" for="education">
            EDUCATION
          </label>
          <input name="education" type="text" className="form-input" />
          <label className="signup-label" for="religion">
            RELIGION
          </label>
          <input name="religion" type="text" className="form-input" />
          <label className="signup-label" for="occupation">
            OCCUPATION
          </label>
          <input name="occupation" type="text" className="form-input" />
          <label className="signup-label" for="location">
            LOCATION
          </label>
          <input name="location" type="text" className="form-input" />
        </form> */}
      </div>
    );
  }
}

export default SignUp2;
