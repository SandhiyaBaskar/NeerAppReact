import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import MainPage from './MainPage';
import './LoginPage.css';
import { FormErrors } from './FormErrors';

import Aboutus from './Aboutus';
import Billing from './Billing';
import Report from './Report';
import ForgotPassword from './ForgotPassword';
import Receiptpage from './Receiptpage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

class LoginPage extends Component{

	constructor() {
        super()
        this.state = {

            emailId: '',
            password: '',

			formErrors: {emailId: '', password: ''},
			                     emailIdValid: false,
			                     passwordValid: false
			        };
			    }

				handleUserInput = (e) => {
			    const name = e.target.name;
			    const value = e.target.value;
			    this.setState({[name]: value},
			                  () => { this.validateField(name, value) });
			}


			  validateField(fieldName, value) {
			    let fieldValidationErrors = this.state.formErrors;
			    let emailIdValid = this.state.emailIdValid;
			    let passwordValid = this.state.passwordValid;

			    switch(fieldName) {

			      case 'emailId':
			        emailIdValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			        fieldValidationErrors.emailId = emailIdValid ? '' : ' is invalid';
			        break;
			      case 'password':
			        passwordValid = value.length >= 5 && value.match(/^((?=.*[0-9])(?=.*[A-Z])(?=.{8,}))/);
			        fieldValidationErrors.password = passwordValid ? '': ' is too short';
			        break;
			      default:
			        break;
			    }
			    this.setState({formErrors: fieldValidationErrors,
			                    emailIdValid: emailIdValid,
			                    passwordValid: passwordValid
								}, this.validateForm);
			  }

			  validateForm() {
			    this.setState({formValid: this.state.emailIdValid && this.state.passwordValid});
			}

			errorClass(error) {
			    return(error.length === 0 ? '' : 'has-error');
			}



	login() {
				this.setState({
						emailId: this.state.emailId,
						password:  this.state.password,

					});
					  localStorage.setItem('emailL',this.state.emailId);
						alert(this.state.emailId);
						alert(this.state.password);
						alert(JSON.stringify(this.state));
        		var self=this;
							$.ajax({
							  type: 'POST',
							  data:JSON.stringify({
									emailId:this.state.emailId,
								password:this.state.password}
							),
							  url: "http://localhost:8080/RestAPI/rest/login",
							  contentType: "application/json",
							  dataType: 'json',
								async:false,

							  success: function(data,textStatus,jqXHR)

							 {
								  console.log(data);
								  if(data.fillingStationId=="NOT_REGISTERED"){
													alert("please Register");

								  }else if(data.fillingStationId=="PASSWORD_INCORRECT"){
										   alert("Please check your emailId and Password");

										}
										else {
											localStorage.setItem('UserNameL',data.userName);
											localStorage.setItem('fillingStationIdL',data.fillingStationId);
											localStorage.setItem('companyNameL',data.companyName);
											localStorage.setItem('addressL',data.address);
											localStorage.setItem('mobileNoL',data.mobileNo);
											localStorage.setItem('gstPercentageL',data.gst);
											localStorage.setItem('receiptNoL',data.receiptNo);

									 ReactDOM.render(
									<Router>
									 <div>
										 <Route path="/" component={MainPage}/>
										 <Route exact path="/aboutus" component={Aboutus}/>
										 <Route path="/billing"component={Billing}/>
										 <Route path="/Report" component={Report}/>

									 </div>
								 </Router>, document.getElementById('root'));
							 }
										 },


			             error:function(data) {
             					console.log('#####################error:################################'+data);
             					alert('Login Invalid'+ data);

 		     						},
							  });
						 }


	 Fpassword(){
		 ReactDOM.render(<ForgotPassword/>,document.getElementById('root'));

	 }
	handleChangeun(value) {
        this.setState({
            emailId: value
        });
    }

	handleChangePd(value) {
        this.setState({
            password: value
        });
    }

	render(){
		return(

			<div className="loginpage" id="loginpagebg">

				<div className="container" >
				<div className="containerlogin" id="loginpage">

					<div className="form-signin-heading text-muted">
					<h2>LogIn</h2>
					</div>

					<div className="panel panel-default">
						  <FormErrors formErrors={this.state.formErrors} />
						</div>

					  <form className="form-signin">
						<div className={`form-group ${this.errorClass(this.state.formErrors.emailId)}`}>
						{/* <label className="control-label col-sm-2"  htmlFor="emailId">emailId:</label> */}

						  <input type="email" value={this.state.emailId} onChange={this.handleUserInput}
 								name="emailId" id="emailId"  className="form-control"  required="" autoFocus="" placeholder="Enter email" />

						</div>

						<div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
						{ /* <label className="control-label col-sm-2"  htmlFor="password">Password:</label> */}

						 <input type="password" value={this.state.password} onChange={this.handleUserInput} 	name="password" id="password" className="form-control" required="" placeholder="Enter password" />
						</div>


						<div className="checkbox">
						  <button type="button"  onClick={()=> this.Fpassword()}  className="btn btn-link">Forgot Password ?</button>
						</div>

						<button type="submit" disabled={!this.state.formValid} onClick={()=> this.login()} className="btn btn-lg btn-primary btn-block" >Submit</button>
					  </form>
					</div>
					</div>

			</div>

		);
	}

}
/* ReactDOM.render(
 <Router>
	<div>
      <Route path="/mainpage" component={MainPage}/>
	    </div>
  </Router>, document.getElementById('root')); */

export default LoginPage;
