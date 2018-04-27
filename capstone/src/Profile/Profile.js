import React from "react";
import { db } from "../FirestoreConfig";
import { Link } from "react-router-dom";
import "./profile.css";
import { Icons } from "../Enums";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDoc: ""
    };
  }

  componentWillMount() {
    // db
    //   .collection("users")
    //   .doc(this.props.match.params.userEmail)
    //   .get()
    //   .then(doc => {
    //     if (doc.exists) {
    //       this.setState({ userDoc: doc.data() });
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   });
    console.log(db.collection("users")); //state authenticated: undefined
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
    const a = "ANIMALS";

    return (
      <div id="profile">
        {/* <Link to={`/edit/${this.props.match.params.userEmail}`}>
          <button>Edit Profile</button>
        </Link> */}
        <Link to={`/edit/greenrocksjl@hotmail.com`}>
          <button>Edit Profile</button>
        </Link>

        <p>
          Name: {this.state.userDoc.fName} {this.state.userDoc.lName}
        </p>
        <p>Age: {this.state.userDoc.age}</p>
        <p>Gender: {this.state.userDoc.gender}</p>
        <div id="my-availability">availability</div>
        <div id="my-icons">
          <i className={Icons[a]} />
        </div>
      </div>
    );
  }
}

export default Profile;

// TODO write post-install script to update node-modules
// https://github.com/kaivi/ReactInlineEdit/pull/41/files/ef233ff37c6857ff270d4a53f2793330bb1c006b
