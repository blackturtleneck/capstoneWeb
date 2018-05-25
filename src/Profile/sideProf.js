import React from 'react';
import { db } from '../FirestoreConfig';
import './Profile.css';
import placeholder from './placeholder.svg'
import './sideProf.css'

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
                        // console.log("other user doc:", doc.data())
                        this.setState({ userDoc: doc.data() });
                        let images = [];
                        {
                            this.state.userDoc.photos.data.forEach(function (photo) {
                                images.push(photo);
                            })
                        }
                        this.setState({ images: images });
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
                    // console.log("other user doc:", doc.data())
                    this.setState({ userDoc: doc.data() });
                    let images = [];
                    {
                        this.state.userDoc.photos.data.forEach(function (photo) {
                            images.push(photo);
                        })
                    }
                    this.setState({ images: images });
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            });
        // if (this.state.userDoc !== '') {

        // }
    }

    render() {
        return (
            <div className="otherProfile-container">
                <h3 className="other-header">{this.state.userDoc.name} </h3>
                <p>{this.state.userDoc.age}</p>
                <img className="otherProfile-img" src={placeholder} alt="pic placeholder" />
                <p className="otherProfile-info-type" >Occupation</p>
                <p className="otherProfile-info" >job title</p>
                <p className="otherProfile-info-type" >Education</p>
                <p className="otherProfile-info" >school </p>
                <p className="otherProfile-info-type" >Religion</p>
                <p className="otherProfile-info" >type of religion</p>

                <p> {this.state.userDoc.photoURL}</p>
                {this.state.images !== '' ? (
                    this.state.images.map((photo, i) => {
                        return (
                            // <p key={i}>{photo.id}</p>
                            <div>
                                <img className="otherProfile-img" src={placeholder} alt="pic placeholder" />
                                <p className="otherProfile-info" >some text or question</p>
                            </div>);
                    })
                ) : (
                        <p>no images</p>
                    )}


            </div>
        )
    }
}
export default SideProf;