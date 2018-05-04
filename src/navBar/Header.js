import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { auth } from '../FirestoreConfig';

class Header extends Component {
    logout() {
        auth.signOut();
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper nav">
                    <div className="brand-logo center logo">AMPR</div>
                    <ul id="nav-mobile">
                        <Link to={'/messenger'}>
                            <li className="left">
                                <i className="medium material-icons">
                                    chat_bubble
                                </i>
                            </li>
                        </Link>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                id="navbarDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <li className="right">
                                    <i className="medium material-icons">
                                        person
                                    </i>
                                </li>
                            </a>

                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown"
                            >
                                <Link to={'/profile'}>
                                    <a className="dropdown-item">
                                        View My Profile
                                    </a>
                                </Link>
                                {/* <div className="dropdown-divider" /> */}
                                <a
                                    className="dropdown-item"
                                    onClick={this.logout.bind(this)}
                                >
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
export default Header;

/**
 * TODO
 * - add link to edit profile through content in pagecontainer
 */
