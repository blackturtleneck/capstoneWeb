import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Routes from './Routes'
// import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
// import Dates from './Dates';

ReactDOM.render( <Routes />, document.getElementById('root'));
registerServiceWorker();
