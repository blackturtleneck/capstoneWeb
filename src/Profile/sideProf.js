import React from 'react';
import { db } from '../FirestoreConfig';
import './Profile.css';
import placeholder from './placeholder.svg'

class SideProf extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDoc: '',
            newProps: ''
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
        console.log(this.state.userDoc.photos.data)
        let images;
        {
            this.state.userDoc.photos.data.map((photo, i) => {
                images.push(
                    <p key={i}>{photo.id}</p>)

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
    }

    render() {
        console.log(this.state.images)
        return (
            <div>

                <p>{this.state.userDoc.name}</p>
                <p> {this.state.userDoc.age}</p>
                <p> {this.state.userDoc.gender}</p>
                <p> {this.state.userDoc.photoURL}</p>
                <img src={placeholder} alt="pic placeholder" />
                {this.state.images}


            </div>
        )
    }
}
export default SideProf;