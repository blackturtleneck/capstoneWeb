import React from 'react';
import { db } from '../FirestoreConfig';
import './Profile.css';

class SideProf extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.forceUpdate();
        let currentComponent = this;
        db
            .collection('users')
            .doc(this.props.otherUser)
            .get()
            .then(doc => {
                if (doc.exists) {
                    console.log("other user doc:", doc.data())
                    this.setState({ userDoc: doc.data() });
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!');
                }
            });
    }

    render() {
        return (<div>{this.props.otherUser.user}</div>)
    }
}
export default SideProf;