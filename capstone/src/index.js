import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Profile from "./Profile/Profile";
import MessengerPage from "./MessengerPage";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
    <div className="App">
      {/* exact path="/" is for home page i think */}
      {/* <Route exact path="/" component={App} /> */}
      <Route exact path="/" component={App} />{" "}
      <Route path="/messenger" component={App} />
      <Route path="/profile" component={App} />
      <Route path="/date-selection" component={App} />
      {/* <Route path="/edit" component={App} /> */}
    </div>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
