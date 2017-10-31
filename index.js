import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import LoginPage from './LoginPage';
import MainPage from './MainPage';
import Aboutus from './Aboutus';
import Billing from './Billing';
import Report from './Report';
import PrintPage from './PrintPage';


import registerServiceWorker from './registerServiceWorker';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

 ReactDOM.render(<LoginPage/>, document.getElementById("root"));



registerServiceWorker();
