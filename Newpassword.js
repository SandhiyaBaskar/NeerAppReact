import React,{Component} from 'react';
import LoginPage from './LoginPage';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';



class Newpassword extends Component{
	constructor() {
        super()
        this.state = {
			 password: '',
			  emailId:'',

        };
    }

	handleChangepassword(value){
        this.setState({
            password: value

		});
    }


		componentDidMount() {
			alert('componentDidMount');
			console.log(this.props.emailId);
		 var emailIdProps=this.props.emailId;
			this.setState({
				emailId:emailIdProps
			});
}
Passwordverify(){

			var password = document.getElementById("password");
			var confirmpassword = document.getElementById("confirmpassword");


			if(password.value==confirmpassword.value){
			alert("Password Matched");
			this.setState({
				password: this.state.password,
        emailId: this.state.emailId,
			});
							  $.ajax({
							  type: 'POST',
							  data:JSON.stringify(this.state),
							  url: "http://localhost:8080/RestAPI/rest/updatePassword",
							  contentType: "application/json",
							  dataType: 'json',


							  success: function(data,textStatus,jqXHR)
							  {

									ReactDOM.render(<LoginPage/>, document.getElementById("root"));

								}



	});
}
else{	alert("Incorrect password");
	 return false;

 ReactDOM.render(<Newpassword/>, document.getElementById("root"));
	 }
}

	render(){
		return(

			<div>
			<div className="form-group">
						  <label htmlFor="password">New Password:</label>
						  <input type="password" id="password"  value={this.state.password} onChange={(e) =>this.handleChangepassword(e.target.value)} className="form-control" placeholder="Enter your valid email" />
						</div>

						<div className="form-group">
						  <label htmlFor="confirmpassword">Confirm Password:</label>
						  <input type="password" id="confirmpassword"  className="form-control" placeholder="Enter your valid email" />
						</div>
						 <button type="button" onClick={()=> this.Passwordverify()} class="btn btn-primary">Set Password</button>

			</div>


		);
	}

}
export default Newpassword;
