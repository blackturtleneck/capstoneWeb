import React from 'react';
import firebase from 'firebase';
import {auth, provider, db} from './FirestoreConfig';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bio: ''
        };
    
        this.uploadBio = this.uploadBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

    uploadBio(e) {
        e.preventDefault();
        alert('A bio was submitted: ' + this.state.bio);
        var users = db.collection("users");
    
        users.doc('new').set({
          FName: "sarah",
          LName: "F",
          DOB:'march 5 2020',
          Bio: this.state.bio
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    handleChange(e) {
        this.setState({bio: e.target.value});
    }

  render() {
    return (
        <div className="messenger">
            <form onSubmit={this.uploadBio}>
                <label>
                    Bio:
                    <input type="text" value={this.state.bio} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>




            <form>
                <input type="file" name="pic" accept="image/*"/>
                <input type="submit"/>
            </form>
        </div>
    );
  }
}

export default Profile;
