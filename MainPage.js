import React,{Component} from 'react';
import Aboutus from './Aboutus';
import Billing from './Billing';
import Report from './Report';
import PrintPage from './PrintPage';
import ReactDOM from 'react-dom';
import './MainPage.css';
import $ from 'jquery';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import LoginPage from './LoginPage';
import VendorRegistration from './VendorRegistration';

class MainPage extends Component{

LogoutPage()
{
	 alert("Logging Out");
	 localStorage.clear();
	 ReactDOM.render(<LoginPage />,document.getElementById('root'));
}
vendorRegistrationFunc()
{
	 alert(" vendor Registration page");

	 ReactDOM.render(<VendorRegistration />,document.getElementById('root'));
}

	render(){


		return(
		<div className="container">


	<nav className="navbar navbar-default">
		  <div className="container">
			<div className="header">
			 <ul className="nav navbar-nav navbar-left">
				<li>
			  <a className="navbar-brand" id="neertitle"href="#">Neer</a>
					</li>
				</ul>
			</div>
   <div  className="collapse navbar-collapse" id= "usernameid">
    <ul className="nav navbar-nav navbar-right" id="usernameidright">

		<button className="dropdown" id="usernametoggle" type="button" data-toggle="dropdown">

		<span className="glyphicon glyphicon-user"></span>{localStorage.getItem('UserNameL')}
			<span className="caret"></span></button>
				<ul className="dropdown-menu" id="dropdownmenu">
								<li><NavLink to="/LogoutPage" onClick={()=>this.LogoutPage()}>Logout</NavLink></li>
								<li><NavLink to="/VendorRegistration" onClick={()=>this.vendorRegistrationFunc()}>Vendor Registration</NavLink></li>
								<li><a href="#">Printer Settings</a></li>
								<li><a href="#">Terms & Conditions</a></li>
								<li><a href="#">Help</a></li>


							  </ul>

								</ul>
					</div>
		</div>
	</nav>

 <nav className="navbar navbar-light">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle" id="menutoggle" data-toggle="collapse" data-target="#myNavbar">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
	  </div>

	   <div className="collapse navbar-collapse " id="myNavbar">
		  <ul className="nav nav-pills nav-justified">
			  <li><NavLink  to="/aboutus"  className="active" >Aboutus</NavLink></li>
			   <li><NavLink to="/billing" >Billing</NavLink></li>
			   <li><NavLink to ="/Report">Report</NavLink></li>

				</ul>
				</div>
			</div>
	</nav>

	</div>	);
	}

}

export default MainPage;
