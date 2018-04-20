import React from "react";
import { auth, provider, db } from "./FirestoreConfig";
import MessengerPage from "./MessengerPage";
import "./Login.css";
import MapContainer from "./MapContainer";
import DatesSelection from "./DatesSelection";
import { Link } from "react-router-dom";
import Routes from "./Routes";

class PageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      user: null
    };
  }

  logout() {
    auth().signOut();
    this.setState({ user: null });
  }

  render() {
    console.log("in page container");
    return (
      <div>
        {/* <Link to={`/profile/${this.props.user.email}`}>View My Profile</Link>
        <Link to={`/messenger`}>Messenger</Link> */}
        <Routes />
        <MessengerPage
          user={this.props.user.displayName}
          userEmail={this.props.user.email}
        />
        <DatesSelection />
        <button onClick={this.logout.bind(this)}>Logout</button>
      </div>
    );
  }
}

export default PageContainer;
