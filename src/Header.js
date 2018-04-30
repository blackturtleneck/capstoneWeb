import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper nav">
          <div className="brand-logo center logo">AMPR</div>
          <ul id="nav-mobile">
            <Link to={"/messenger"}>
              <li className="left">
                <i className="medium material-icons">chat_bubble</i>
              </li>
            </Link>
            <Link to={`/profile/${this.props.userEmail}`}>
              <li className="right">
                <i className="medium material-icons">person</i>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    );
  }
}
export default Header;
