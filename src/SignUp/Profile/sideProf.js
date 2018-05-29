import React from 'react';
import { db } from '../../FirestoreConfig';
import placeholder from './placeholder.svg'
import './sideProf.css'
import { Joycie, Jess, Zhan, Sarah } from '../../Enums'

class SideProf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDoc: '',
            newProps: '',
            images: ''
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({ newProps: newProps })
        if (newProps.otherUser !== this.props.otherUser) {
            db
                .collection('users')
                .doc(newProps.otherUser)
                .get()
                .then(doc => {
                    if (doc.exists) {
                        this.setState({ userDoc: doc.data() });
                        let images = [];
                        // {
                        //     this.state.userDoc.photos.data.forEach(function (photo) {
                        //         images.push(photo);
                        //     })
                        // }
                        // this.setState({ images: images });
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                });


        }
    }

    UNSAFE_componentWillMount() {
        db
            .collection('users')
            .doc(this.props.otherUser)
            .get()
            .then(doc => {
                if (doc.exists) {
                    this.setState({ userDoc: doc.data() });
                    let images = [];
                    // {
                    //     this.state.userDoc.photos.data.forEach(function (photo) {
                    //         images.push(photo);
                    //     })
                    // }
                    this.setState({ images: images });
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            });
    }

    render() {
        console.log(Joycie)
        return (
            <div className="otherProfile-container">
                <h4 className="other-header">{this.state.userDoc.name} </h4>
                <p>{this.state.userDoc.age}</p>
                <img className="otherProfile-img" src={placeholder} alt="pic placeholder" />
                <p className="otherProfile-info-type" >Occupation</p>
                <p className="otherProfile-info" >job title</p>
                <p className="otherProfile-info-type" >Education</p>
                <p className="otherProfile-info" >school </p>
                <p className="otherProfile-info-type" >Religion</p>
                <p className="otherProfile-info" >type of religion</p>

                <img
                    className="otherProfile-img" src={"https://www.googledrive.com/host/1CllNqteJL2uMvkkjZtb4bzPGI9nRF48S"} alt="pic placeholder" />
                {/* {Joycie.forEach((photo) => {
                    return <img
                        className="otherProfile-img" src={"https://drive.google.com/a/uw.edu/file/d/1CllNqteJL2uMvkkjZtb4bzPGI9nRF48S/view?usp=sharing"} alt="pic placeholder" />
                })} */}
                {/* <p> {this.state.userDoc.photoURL}</p> */}
                {/* {this.state.images !== '' ? (
                    this.state.images.map((photo, i) => {
                        return (
                            <div key={i}>
                                <img
                                    className="otherProfile-img" src={placeholder} alt="pic placeholder" />
                                <p className="otherProfile-info" >some text or question</p>
                            </div>);
                    })
                ) : (
                        <p>no images</p>
                    )} */}
            </div>
        )
    }
}
export default SideProf;