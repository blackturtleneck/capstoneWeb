import React from "react";
import { auth } from "./FirestoreConfig";
import MessengerPage from "./MessengerPage";
import "./Login.css";
import { PageContent } from "./Enums";
import MapContainer from "./MapContainer";
import DatesSelection from "./DatesSelection";
import { Link, Redirect } from "react-router-dom";
import Header from "./Header";
import Profile from "./Profile";

class PageContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      user: this.props.user,
      content: this.props.content
    };
  }

  logout() {
    auth.signOut();
  }

  render() {
    return (
      <div>
        {!this.state.user.onBoarded ? (
          <Redirect to={"/signup"} />
        ) : (
          <div>
            <Header userEmail={this.state.user.email} />
            {/* <Link to={`/profile/${this.props.user.email}`}>View My Profile</Link>
        <Link to={`/messenger`}>Messenger</Link> */}

            {this.state.content === PageContent.MESSENGER && (
              <MessengerPage
                user={this.props.user.displayName}
                userEmail={this.props.user.email}
              />
            )}
            {this.state.content === PageContent.DATE_SELECTION && (
              <DatesSelection />
            )}

            {this.state.content === PageContent.PROFILE && (
              <Profile userEmail={this.props.userEmail} />
            )}
            <button onClick={this.logout.bind(this)}>Logout</button>
          </div>
        )}
      </div>
    );
  }
}

export default PageContainer;
