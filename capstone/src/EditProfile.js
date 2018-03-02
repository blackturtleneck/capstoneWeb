import React from 'react';
// import firebase from 'firebase';
import { db } from './FirestoreConfig';
// import {auth, db, storageRef} from './FirestoreConfig';
import InlineEdit from 'react-edit-inline'

// import ImageUploader from 'react-firebase-image-uploader';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDoc: ''
        };

        this.dataChanged = this.dataChanged.bind(this);
        this.addIcon = this.addIcon.bind(this);
    }

    componentWillMount() {
        db.collection("users").doc(this.props.userEmail).get().then(doc => {
            if (doc.exists) {
                this.setState({userDoc: doc.data()});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        });
    }

    dataChanged(data) {
        //update user's field
        console.log();
        var field = Object.keys(data)[0].toString();
        // console.log(typeof(data[field]))
        db.collection("users").doc(this.props.userEmail).update({
            [field]: data[field]
        })
        .then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

        //update state
        db.collection("users").doc(this.props.userEmail).get().then(doc => {
            if (doc.exists) {
                this.setState({userDoc: doc.data()});
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        });
    }

    addIcon(){
        // console.log()
        console.log(db.collection("users").doc(this.props.userEmail).get().icons)
        // if(!db.collection("users").doc(this.props.userEmail).collection("icons").get()) {
            db.collection("users").doc(this.props.userEmail).update({
                "icons": {"new":"nextChosenIcon"}
            })
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        // }
    }

    render() {
        return (
            <div >
                <p>Click to edit a field!</p>
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
                {/* <button onClick={this.addIcon}>Add icon</button> */}
            </div>
        );
    }
}

export default EditProfile;

