import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import {App} from './App'
import {userProfile} from './App'
import Profile from './Profile'
import EditProfile from './EditProfile'

class Routes extends Component {
    componentDidMount() {
        console.log("routes mounted")
    }
    componentWillMount() {
        console.log("routes will mount")
    }
    render() {
        return (
            <Router>
                {/* Maybe use <Switch></Switch> to group some routes?- chooses first that matches path */}
                <div className="App">
                    {/* exact path="/" is for home page i think */}
                        <Route exact path="/" component={App} />  
                        <Route path="/profile/:userEmail" component={Profile} />
                        <Route path="/edit/:userEmail" component={EditProfile} />
                </div>
            </Router>
        );
    }
}

export default Routes;


