import React from "react";
import { db } from "../FirestoreConfig";
import { Link } from "react-router-dom";
import "./Profile.css";

class ProfileItem extends React.Component {
  render() {
    return (
      <div className="profile-item">
        <button
          type="button"
          class="close"
          aria-label="Close"
          onClick={this.props.delete}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="labelPI">{this.props.label}</div>
        <div className="contentPI">{this.props.content}</div>
      </div>
    );
  }
}

export default ProfileItem;

//TODO add array of questions from user profile
