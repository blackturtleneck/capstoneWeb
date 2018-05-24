import React from 'react';
import { db } from '../FirestoreConfig';
import './Profile.css';

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
            let currentComponent = this;
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

    }

    UNSAFE_componentWillMount() {
        let currentComponent = this;
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
        // console.log(this.props.otherUser)
        return (
            <div>
                {
                    this.state.userDoc !== '' ? (
                        <div>{this.state.userDoc.name}</div>
                    ) : (
                            <div>side</div>
                        )
                }
            </div>
        )
    }
}
export default SideProf;