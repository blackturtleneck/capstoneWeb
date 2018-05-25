import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        {/* Maybe use <Switch></Switch> to group some routes?- chooses first that matches path */}
        <div className="App">
            {/* exact path="/" is for home page i think */}
            {/* <Route exact path="/" component={App} /> */}
            <Route exact path="/" component={App} />{' '}
            <Route path="/messenger" component={App} />
            <Route path="/profile" component={App} />
            <Route path="/date-selection" component={App} />
            <Route path="/signup" component={App} />
            {/* <Route path="/edit/:userEmail" component={App} />
            <Route path="/signup" component={App} /> */}
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
