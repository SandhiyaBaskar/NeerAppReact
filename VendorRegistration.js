import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Receiptpage from './Receiptpage';
import $ from "jquery";
import { FormErrors } from './FormErrors';
import Aboutus from './Aboutus';
import Billing from './Billing';
import Report from './Report';
import MainPage from './MainPage';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';

class VendorRegistration extends Component{

	constructor(data) {

        super(data)
        this.state = {

						fillingStationId:'',
						emailId:'',
						vendorName: '',
						vendorCode: '',
						companyName:'',
						address:'',
						mobileNo:'',
						userName:'',

						vendorFullName:'',
						vendorMobileNo:'',
						vendorAddress:'',

           formErrors: {vendorFullName: '',
						vendorMobileNo: '',
						vendorAddress: '',
						},

					 vendorFullNameValid: false,
					 vendorMobileNoValid: false,
					 vendorAddressValid: false,

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
    let vendorFullNameValid = this.state.vendorFullNameValid;
    let vendorMobileNoValid = this.state.vendorMobileNoValid;
    let vendorAddressValid = this.state.vendorAddressValid;

    switch(fieldName) {

      case 'vendorFullName':
        vendorFullNameValid =value.length >=1 && value.match(/^[a-zA-Z\s]*$/);
        fieldValidationErrors.vendorFullName = vendorFullNameValid ? '' : ' is invalid';
    break;
	
      case 'vendorMobileNo':
        vendorMobileNoValid = value.length <=10 && value.match(/^()+]*([0-9][ ()+]*){10}$/);
        fieldValidationErrors.vendorMobileNo = vendorMobileNoValid ? '': 'is invalid';
        break;
		
		case 'vendorAddress':
        vendorAddressValid = value.length >1 && value.match(/^[#.0-9a-zA-Z\s,:,-]+$/);
        fieldValidationErrors.vendorAddress = vendorAddressValid ? '': 'is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    vendorFullNameValid: vendorFullNameValid,
                    vendorMobileNoValid: vendorMobileNoValid,
					vendorAddressValid:vendorAddressValid,
					}, this.validateForm);
  }

validateForm() {
    this.setState({formValid: this.state.vendorFullNameValid && this.state.vendorFullNameValid && this.state.vendorAddressValid});
}

errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
}


		/* handleChangeCODE(value) {



				 this.setState({

						 vendorCode: value
				 });
		 }

	 handleChangeVN(value) {
				 this.setState({
						 vendorName: value
				 });
		 }


	 handleChangeNBT(value) {
					 this.setState({
						 noOfBubbleTops: value
				 });
		 }

		 handleChangeEPBR(value) {
					 this.setState({
							 perBubbleTopRate: value
					 });
			 }
 */

	 componentDidMount() {
				alert('vendor registration');
				alert(this.props.emailId);
				var companyNameProps=this.props.companyName;
				var vendorFullNameProps=this.props.vendorFullName;
				var vendorCodeProps=this.props.vendorCode;
				var noOfBubbleTopsProps=this.props.noOfBubbleTops;

				 console.log(this.props.emailId);
				var fillingStationIdProps=this.props.fillingStationId;
				var addressProps=this.props.address;
				var mobileNoProps=this.props.mobileNo;
				 console.log(companyNameProps);
				 this.setState({
					 emailId:this.props.emailId,
					 fillingStationId:fillingStationIdProps,
					 address:addressProps,
					 companyName:companyNameProps,
					 mobileNo:mobileNoProps,
					 vendorCode:vendorCodeProps,

				 });
	 }



	Submit(){
		this.setState({
						fillingStationId:this.state.fillingStationId,
						vendorFullName: this.state.vendorFullName,
						vendorMobileNo:  this.state.vendorMobileNo,
						vendorAddress:  this.state.vendorAddress,


					});
						alert(this.state.vendorFullName);
						alert(this.state.vendorMobileNo);
						alert(this.state.vendorAddress);
						alert(JSON.stringify(this.state));

						var self=this;
						$.ajax({
							  type: 'POST',
							  data:JSON.stringify({
								vendorName:this.state.vendorFullName,
								vendorMobileNo:this.state.vendorMobileNo,
								vendorAddress:  this.state.vendorAddress,
								}),
							  url: "http://localhost:8080/RestAPI/rest/registervendor",
							  contentType: "application/json",
							  dataType: 'json',
							  async:false,
		 success:function(data,textStatus,jqXHR){
		   alert("user vendor code is"+data.vendorCode);
		    alert("user vendor name is"+data.vendorName);
			 ReactDOM.render(
									<Router>
									 <div>
										 <Route path="/" component={MainPage}/>
										 <Route exact path="/aboutus" component={Aboutus}/>
										 <Route path="/billing"component={Billing}/>
										 <Route path="/Report" component={Report}/>

									 </div>
								 </Router>, document.getElementById('root'));



		},
			error:function(data,textStatus,jqXHR){
		   alert("error ");
		   ReactDOM.render(<Receiptpage/>, document.getElementById('root'));
	   						},

      });
	 }

	render(){

		return(

		<div className="container">
			<div className="jumbotron">
			<h2>{localStorage.getItem('companyNameL')}</h2>

			</div>
			<h3>Vendor Registration Form</h3>
			<div className="panel panel-default">
	          <FormErrors formErrors={this.state.formErrors} />
	</div>
			<form>

				<div className={`form-group ${this.errorClass(this.state.formErrors.vendorFullName)}`}>
					  <label htmlFor="vendorFullName">Vendor Full Name:</label>
					  <input
						type="text"
						value={this.state.vendorFullName}
						maxLength="20"
						onChange={this.handleUserInput}
						required
						name="vendorFullName"
						className="form-control"
						id="vendorFullName"
						placeholder="Enter Vendor Full Name"/>
					</div>

					<div className={`form-group ${this.errorClass(this.state.formErrors.vendorMobileNo)}`}>
					  <label htmlFor="vendorMobileNo">Mobile No:</label>
					  <input type="number"
						value={this.state.vendorMobileNo}
						 onChange={this.handleUserInput}
						 required
						 maxLength="10"
						 name="vendorMobileNo"
						 className="form-control"
						 id="vendorMobileNo"
						 placeholder="Enter Mobile No" />
						</div>


						<div className={`form-group ${this.errorClass(this.state.formErrors.vendorAddress)}`}>

						<label htmlFor="vendorAddress">Address:</label>
						<textarea type="text"
						value={this.state.vendorAddress}
						required
						name="vendorAddress"
						rows="4"
						onChange={this.handleUserInput}
						className="form-control"
						id="vendorAddress"
						placeholder="Enter Vendor Address">
						</textarea>
						</div>


					<button type="submit" className="btn btn-info" disabled={!this.state.formValid} onClick={() => this.Submit()}>Next</button>
				   </form>

				</div>

		);
	}

}

export default VendorRegistration;
