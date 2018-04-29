import React from "react";
import { auth } from "../FirestoreConfig";
import { Link } from "react-router-dom";
import "./SignUp.css";
import next from "../img/next.svg";
import back from "../img/back.svg";

class SignUp1 extends React.Component {
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

  render() {
    return (
      <div class="signup-page">
        <div className="signup-header">
          <div className="signup-header-welcome"> WELCOME TO </div>
          <div className="signup-header-amp">A M P R</div>
          <div className="tagline">TELL US ABOUT YOURSELF</div>
        </div>

        <form className="form" onSubmit={this.nextStep}>
          <div className="next-step next">
            <input type="image" className="next" src={next} />
          </div>
          <label className="signup-label" for="name">
            NAME
          </label>
          <input
            defaultValue={this.props.fieldValues.name}
            name="name"
            type="text"
            className="form-input"
            required
          />
          <label className="signup-label" for="gender">
            GENDER
          </label>
          <select
            defaultValue={this.props.fieldValues.gender}
            name="gender"
            className="form-input custom-select"
            required
          >
            <option selected />
            <option value="male">MALE</option>
            <option value="female">FEMALE</option>
          </select>
          <label className="signup-label" for="education">
            EDUCATION
          </label>
          <input
            defaultValue={this.props.fieldValues.education}
            name="education"
            type="text"
            className="form-input"
          />
          <label className="signup-label" for="religion">
            RELIGION
          </label>
          <input
            defaultValue={this.props.fieldValues.religion}
            name="religion"
            type="text"
            className="form-input"
          />
          <label className="signup-label" for="occupation">
            OCCUPATION
          </label>
          <input
            defaultValue={this.props.fieldValues.occupation}
            name="occupation"
            type="text"
            className="form-input"
          />
          <label className="signup-label" for="location">
            LOCATION
          </label>
          <input
            defaultValue={this.props.fieldValues.location}
            name="location"
            type="text"
            className="form-input"
          />
        </form>
      </div>
    );
  }

  nextStep(e) {
    e.preventDefault();
    var data = {
      name: e.target.name.value,
      gender: e.target.gender.value,
      occupation: e.target.occupation.value,
      education: e.target.education.value,
      religion: e.target.religion.value,
      location: e.target.location.value
    };

    this.props.saveValues(data);
    this.props.nextStep();
  }
}

export default SignUp1;
