import React from "react";
import { db } from "../FirestoreConfig";
import { Link } from "react-router-dom";
import "./Profile.css";
import ProfileItem from "./ProfileItem";
// import
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDoc: ""
    };
    // this.delete = this.delete.bind(this);
  }

  componentWillMount() {
    db
      .collection("users")
      .doc("greenrocksjl@hotmail.com")
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ userDoc: doc.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
  }

  delete(e) {
    e.preventDefault();
    console.log("rm this" + e);
  }

  chandddge(e) {
    e.preventDefault();
    // console.log(e);
    this.setState({ age: e.value });

    // var field = Object.keys(data)[0].toString();

    // console.log(this);
  }

  change(data) {
    data.preventDefault();
    //update user's field
    // console.log();
    var field = Object.keys(data)[0].toString();
    // console.log(typeof(data[field]))
    db
      .collection("users")
      .doc("greenrocksjl@hotmail.com")
      .update({
        [field]: data[field]
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });

    db
      .collection("users")
      .doc("greenrocksjl@hotmail.com")
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ userDoc: doc.data() });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
  }

  render() {
    return (
      <div id="profile">
        {/* <Link to={`/edit/${this.props.match.params.userEmail}`}>
          <button>Edit Profile</button>
        </Link> */}

        <p>
          {this.state.userDoc.fName} {this.state.userDoc.lName}
        </p>
        <div className="user-photos">PHOTOS</div>
        <div className="user-icons">ICONS </div>
        <ProfileItem
          label="question"
          content="answer"
          delete={this.delete.bind(this)}
        />
        <ProfileItem
          label="question"
          content="answer"
          delete={this.delete.bind(this)}
        />
        <ProfileItem
          label="question"
          content="answer"
          delete={this.delete.bind(this)}
        />
        <ProfileItem
          label="question"
          content="answer"
          delete={this.delete.bind(this)}
        />
        <ProfileItem
          label="question"
          content="answer"
          delete={this.delete.bind(this)}
        />

        <form className="user-info-form">
          <div className="form-group">
            <label>Age</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.age}
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.gender}
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Occupation</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.occupation}
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.company}
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Education</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.education}
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Religion</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.religion}
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Ethnicity</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.ethnicity}
              onChange={this.change.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Politics</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              value={this.state.userDoc.politics}
              onChange={this.change.bind(this)}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default Profile;

// TODO write post-install script to update node-modules
// https://github.com/kaivi/ReactInlineEdit/pull/41/files/ef233ff37c6857ff270d4a53f2793330bb1c006b
