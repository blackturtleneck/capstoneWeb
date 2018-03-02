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
            }
        );
    }
    //   handleSubmit(event) {
    //     event.preventDefault();
    //     console.log("val:"+event.target.value);
    //     console.log("name:"+event.target.name);
    //     console.log("type:"+event.target.type);
    //   }


//     handleInputChange (e) {
//     // const { name, value } = data
//     e.preventDefault();
//         // console.log("data:"+data);
//         console.log("val:"+e.target.value);
//         console.log("name:"+e.target.name);
//         console.log("type:"+e.target.type);
//         // console.log("nameconst:"+name);
//         // console.log("valueconst:"+value);
//     // ...
//   }

  dataChanged(data) {
    console.log(Object.keys(data)[0]);
  //   console.log(instanceof dic)
  // e.preventDefault();
  // db.collection("users").doc(this.props.userEmail).set({
  //     [e]: result.user.displayName,
      
  //   })
  //     .then(function () {
  //       console.log("Document successfully written!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error writing document: ", error);
  //     });

}

//   handleSubmit (e) {
//     // const { name, value } = data
//     e.preventDefault();
//         const target = e.target;
//         // const value = target.type === 'checkbox' ? target.checked : target.value;
//         // const name = target.name;
    
//         this.setState({
//             userDoc: this.props.userDoc
//             // [name]: value
//         });
//       }

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


// trying to set state of multiple inputs (one for each field in db) by using multiple inputs and on handler function