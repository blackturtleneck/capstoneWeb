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
                    } else {
                        // doc.data() will be undefined in this case
                        console.log('No such document!');
                    }
                });
        }
        let images = [];
        {
            this.state.userDoc.photos.data.forEach(function (photo) {
                images.push(photo);
            })
        }
        this.setState({ images: images });
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
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            });
        if (this.state.userDoc !== '') {
            let images = [];
            {
                this.state.userDoc.photos.data.forEach(function (photo) {
                    images.push(photo);
                })
            }
            this.setState({ images: images });
        }
    }

    render() {
        return (
            <div className="otherProfile">
                <p>{this.state.userDoc.name}</p>
                <p> {this.state.userDoc.age}</p>
                <p> {this.state.userDoc.gender}</p>
                <p> {this.state.userDoc.photoURL}</p>
                <img src={placeholder} alt="pic placeholder" />
                {this.state.images !== '' ? (
                    this.state.images.map((photo, i) => {
                        return (
                            // <p key={i}>{photo.id}</p>
                            <div><img src={placeholder} alt="pic placeholder" /></div>);
                    })
                ) : (
                        <p>no images</p>
                    )}


            </div>
        )
    }
}
export default SideProf;