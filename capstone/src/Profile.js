import React from 'react';
import firebase from 'firebase';
import {auth, db, storageRef} from './FirestoreConfig';

// import ImageUploader from 'react-firebase-image-uploader';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.userEmail,
            userDoc: ''
        };
      }

    componentWillMount() {
        db.collection("users").doc(this.state.userEmail).get().then(doc => {
                if (doc.exists) {
                    this.setState({userDoc: doc.data()});
                    console.log("Document data:", doc.data().age);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
        );
    }

  render() {
    return (
        <div className="messenger">
            <p>PROFILE</p>
            <p>{this.state.userDoc.age}</p>
            <p>END PROFILE</p>
        </div>
    );
  }
}

export default Profile;


// import React from 'react';
// import firebase from 'firebase';
// import {auth, db, storageRef} from './FirestoreConfig';

// // import ImageUploader from 'react-firebase-image-uploader';

// class Profile extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             userEmail: this.props.userEmail
//         };
//         this.getUser = this.getUser.bind(this);
//       }

//       componentDidMount(){
//           this.getUser();
//       }

//     getUser() {
//         var docRef =  db.collection("users").doc(this.state.userEmail +"");

//         docRef.get().then(function(doc) {
//             if (doc.exists) {
//                 console.log("Document data:", doc.data());
//             } else {
//                 // doc.data() will be undefined in this case
//                 console.log("No such document!");
//             }
//         }).catch(function(error) {
//             console.log("Error getting document:", error);
//         });
//     }

//   render() {
//     return (
//         <div className="messenger">
//             <p>PROFILE</p>
//             <p>{this.state.userEmail}</p>

//             <p>END PROFILE</p>
//         </div>
//     );
//   }
// }

// export default Profile;
