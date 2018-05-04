import React from "react";
import { db } from "../FirestoreConfig";
import InlineEdit from "react-edit-inline";
import "./profile.css";
import { Icons } from "../Enums";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDoc: ""
    };

    this.dataChanged = this.dataChanged.bind(this);
    this.addIcon = this.addIcon.bind(this);
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

  dataChanged(data) {
    //update user's field
    var field = Object.keys(data)[0].toString();
    // console.log(typeof(data[field]))

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
    // db
    //   .collection("users")
    //   .doc(this.props.match.params.userEmail)
    //   .update({
    //     [field]: data[field]
    //   })
    //   .then(function() {
    //     console.log("Document successfully written!");
    //   })
    //   .catch(function(error) {
    //     console.error("Error writing document: ", error);
    //   });

    //update state
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
  }

  addIcon() {
    var newIcon = document.getElementsByName("newIcon").text;
    // console.log()
    console.log(
      db
        .collection("users")
        // .doc(this.props.match.params.userEmail)
        .doc("greenrocksjl@hotmail.com")
        .get().icons
    );
    // if(!db.collection("users").doc(this.props.userEmail).collection("icons").get()) {
    db
      .collection("users")
      // .doc(this.props.userEmail)
      .doc("greenrocksjl@hotmail.com")
      .update({
        icons: { newIcon: newIcon }
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
    // }
  }

  render() {
    return (
      <div id="edit-profile">
        <p className="text">Click to edit a field!</p>
        <InlineEdit
          validate={this.customValidateText}
          activeClassName="editing"
          text={this.state.userDoc.fName}
          paramName="fName"
          change={this.dataChanged}
        />
        <br />
        <InlineEdit
          validate={this.customValidateText}
          activeClassName="editing"
          text={this.state.userDoc.lName}
          paramName="lName"
          change={this.dataChanged}
        />
        <br />
        <InlineEdit
          validate={this.customValidateText}
          activeClassName="editing"
          text={this.state.userDoc.age}
          paramName="age"
          change={this.dataChanged}
        />
        <br />
        <InlineEdit
          validate={this.customValidateText}
          activeClassName="editing"
          text={this.state.userDoc.gender}
          paramName="gender"
          change={this.dataChanged}
        />
        <br />
        <button onClick={this.addIcon}>Add icon</button>
        <form>
          <label>
            new icon:
            <input type="text" name="newIcon" />
          </label>
        </form>
      </div>
    );
  }
}

export default EditProfile;
