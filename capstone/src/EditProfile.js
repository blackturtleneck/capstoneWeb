import React from 'react';
import firebase from 'firebase';
import {auth, db, storageRef} from './FirestoreConfig';
import InlineEdit from 'react-edit-inline'

// import ImageUploader from 'react-firebase-image-uploader';

class EditProfile extends React.Component {

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


    render() {
        return (
            <div >
                <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.userDoc.fName}
                paramName="fName"
                change={this.dataChanged}
                />
                <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.userDoc.lName}
                paramName="lName"
                change={this.dataChanged}
                />
                <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.userDoc.age}
                paramName="age"
                change={this.dataChanged}
                />
                <InlineEdit
                validate={this.customValidateText}
                activeClassName="editing"
                text={this.state.userDoc.gender}
                paramName="gender"
                change={this.dataChanged}
                />
            </div>
        );
    }
}

export default EditProfile;

