import React from 'react';
import firebase from 'firebase';
import {auth, db, storageRef} from './FirestoreConfig';

// import ImageUploader from 'react-firebase-image-uploader';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bio: '',
            photoRef: ''
        };
    
        this.uploadBio = this.uploadBio.bind(this);
        this.handleBioChange = this.handleBioChange.bind(this);
        this.handlePhotoChange = this.handlePhotoChange.bind(this);
      }

    uploadBio(e) {
        e.preventDefault();
        var users = db.collection("users");
    
        users.doc('newest').set({
          Bio: this.state.bio
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    uploadPhoto(e) {
        e.preventDefault();
        var users = db.collection("users");
        
        users.doc('newest').set({
          photoRef: this.state.photoRef
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    handleBioChange(e) {
        this.setState({bio: e.target.value});
    }

    handlePhotoChange(e) {
        this.setState({photo: e.target.value});
    }


  render() {
    return (
        <div className="messenger">
            <p>EDITPROFILE</p>
            <form onSubmit={this.uploadBio}>
                <label>
                    Bio:
                    <input type="text" value={this.state.bio} onChange={this.handleBioChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>

            <form onSubmit={this.uploadPhoto}>
                <input type="file" 
                        name="pic" 
                        accept="image/*" 
                        value={this.state.photo}
                        onChange={this.handlePhotoChange}/>
                <input type="submit" value="Submit"/>
            </form>
            <p>END PROFILE</p>
        </div>
    );
  }
}

export default EditProfile;
