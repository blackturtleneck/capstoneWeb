import React from 'react';
import firebase from 'firebase';
import {auth, db, storageRef} from './FirestoreConfig';
import EditProfile from './EditProfile'
import ReactDOM from 'react-dom';
import InlineEdit from 'react-edit-inline'


// import ImageUploader from 'react-firebase-image-uploader';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDoc: ''
        };
        this.dataChanged = this.dataChanged.bind(this);
      }

    componentWillMount() {
        db.collection("users").doc(this.props.userEmail).get().then(doc => {
                if (doc.exists) {
                    this.setState({userDoc: doc.data()});
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
        );
    }

    edit() {
        ReactDOM.render(<EditProfile />, document.getElementById('root'))
      }

      dataChanged(e) {
        e.preventDefault();
      }

  render() {
    return (
        <div className="profile">
            <button user={this.state.userDoc} onClick={this.edit.bind(this)}>Edit Profile</button>
            <p>Name: {this.state.userDoc.fName} {this.state.userDoc.lName}</p>
            <p>Age: {this.state.userDoc.age}</p>
            <p>Gender: {this.state.userDoc.gender}</p>
            <h2>{this.state.message}</h2>
            <span>Edit me: </span>
            <InlineEdit
              validate={this.customValidateText}
              activeClassName="editing"
              text="inlineedittext"
              paramName="message"
              change={this.dataChanged}
            />
        </div>
    );
  }
}

export default Profile;

// TODO write post-install script to update node-modules
// https://github.com/kaivi/ReactInlineEdit/pull/41/files/ef233ff37c6857ff270d4a53f2793330bb1c006b