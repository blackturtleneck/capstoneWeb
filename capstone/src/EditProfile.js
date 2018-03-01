import React from 'react';
import firebase from 'firebase';
import {auth, db, storageRef} from './FirestoreConfig';

// import ImageUploader from 'react-firebase-image-uploader';

class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userDoc: this.props.userDoc
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    //   handleSubmit(event) {
    //     event.preventDefault();
    //     console.log("val:"+event.target.value);
    //     console.log("name:"+event.target.name);
    //     console.log("type:"+event.target.type);
    //   }


    handleInputChange (e) {
    // const { name, value } = data
    e.preventDefault();
        // console.log("data:"+data);
        console.log("val:"+e.target.value);
        console.log("name:"+e.target.name);
        console.log("type:"+e.target.type);
        // console.log("nameconst:"+name);
        // console.log("valueconst:"+value);
    // ...
  }

  handleSubmit (e) {
    // const { name, value } = data
    e.preventDefault();
        const target = e.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
    
        this.setState({
            userDoc: this.props.userDoc
            // [name]: value
        });
      }

  render() {
    return (
        <div >div
            {/* <p>Name: {this.state.userDoc.fName} {this.state.userDoc.lName}</p>
            <p>Age: {this.state.userDoc.age}</p>
            <p>Gender: {this.state.userDoc.gender}</p> */}
            
            {/* <form>
                <label>
                    Bio:
                    <input
                        name="bio"
                        type="text"
                        value={this.state.numberOfGuests}
                        onChange={this.handleInputChange} />
                </label>

                <input type="submit" value="Submit" />
            </form> */}
            {/* <form onSubmit={this.handleInputChange}> */}
                {/* <input type="text" name="email" value="bio" onChange={}/> */}
            {/* </form> */}


            {/* <form onSubmit={this.uploadPhoto}>
                <input type="file" 
                        name="pic" 
                        accept="image/*" 
                        value={this.state.photo}
                        onChange={this.handlePhotoChange}/>
                <input type="submit" value="Submit"/>
            </form> */}
        </div>
    );
  }
}

export default EditProfile;


// trying to set state of multiple inputs (one for each field in db) by using multiple inputs and on handler function