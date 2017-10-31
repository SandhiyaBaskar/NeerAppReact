import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Receiptpage from './Receiptpage';
import $ from "jquery";
import { FormErrors } from './FormErrors';

class Billing extends Component{

	constructor(data) {

        super(data)
        this.state = {
					 fillingStationId:'',
					 receiptNo:'',
            vendorName: '',
            vendorCode: '',
						noOfBubbleTops:'',
						perBubbleTopRate:'',
						billingAmount:'',
						gstPercentage:'',
						gstAmount:'',
						cgstAmount:'',
						sgstAmount:'',
						totalAmount:'',

						   formErrors: {noOfBubbleTops: '', perBubbleTopRate: ''},
					 noOfBubbleTopsValid: false,
					 perBubbleTopRateValid: false
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
    let noOfBubbleTopsValid = this.state.noOfBubbleTopsValid;
    let perBubbleTopRateValid = this.state.perBubbleTopRateValid;

    switch(fieldName) {
      case 'noOfBubbleTops':
        noOfBubbleTopsValid =value.length <=3 && value.match(/^[1-9][0-9]*$/);
        fieldValidationErrors.noOfBubbleTops = noOfBubbleTopsValid ? '' : ' is invalid';
    break;
      case 'perBubbleTopRate':
        perBubbleTopRateValid = value.length <3 && value.match(/^[1-9][0-9]*$/);
        fieldValidationErrors.perBubbleTopRate = perBubbleTopRateValid ? '': 'is invalid';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    noOfBubbleTopsValid: noOfBubbleTopsValid,
                    perBubbleTopRateValid: perBubbleTopRateValid  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.noOfBubbleTopsValid && this.state.perBubbleTopRateValid});
}

errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
}


		handleChangeCODE(value) {



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

	Next(){


		alert(this.state.fillingStationId);
		alert(this.state.vendorName);
		alert(this.state.vendorCode);
		alert(this.state.noOfBubbleTops);
		alert(this.state.perBubbleTopRate);
		alert(JSON.stringify(this.state));

			var noOfBubbleTopsProps=this.state.noOfBubbleTops;

			var perBubbleTopRateProps=this.state.perBubbleTopRate;
       var gstProps=localStorage.getItem('gstPercentageL');
			 this.state.billingAmount=(noOfBubbleTopsProps*perBubbleTopRateProps).toFixed(2);
			 this.state.gstAmount=(this.state.billingAmount*(gstProps/100)).toFixed(2);
	    this.state.cgstAmount=this.state.gstAmount/2;
      this.state.sgstAmount=this.state.cgstAmount;
			 this.state.totalAmount= Number(this.state.billingAmount) + Number( this.state.gstAmount);
			 this.setState({

						vendorName: this.state.vendorName,
						vendorCode:  this.state.vendorCode,
						noOfBubbleTops:  this.state.noOfBubbleTops,
						perBubbleTopRate:  this.state.perBubbleTopRate,
					});

     alert(this.state.billingAmount);
					ReactDOM.render(
								 React.createElement(Receiptpage, this.state),
									 document.getElementById("root"));
					}


	render(){

		return(

			<div className="container">
			<div className="jumbotron">
			<h2>{localStorage.getItem('companyNameL')}</h2>

			</div>
			<h3>Billing</h3>
			<div className="panel panel-default">
	          <FormErrors formErrors={this.state.formErrors} />
	</div>
			<form>

				<div className="form-group">
					  <label htmlFor="vendorIdid">Vendor Code:</label>
					  <input
						type="text"
						value={this.state.vendorCode}
						maxLength="9"
						onChange={(e) =>this.handleChangeCODE(e.target.value)}
						className="form-control"
						id="vendorIdid"
						placeholder="Enter Vendor Code"/>
					</div>

					<div className="form-group">
					  <label htmlFor="vendorNameid">Vendor Name:</label>
					  <input type="text"
						 value={this.state.vendorName}
						 onChange={(e) =>this.handleChangeVN(e.target.value)}
						 className="form-control"
						 id="vendorNameid"
						 placeholder="Enter Vendor Name" />
						</div>


         <div className={`form-group ${this.errorClass(this.state.formErrors.noOfBubbleTops)}`}>

						<label htmlFor="noOfBubbleTops">No of BubbleTop:</label>
					  <input type="number"
						value={this.state.noOfBubbleTops}
						required name="noOfBubbleTops"
						onChange={this.handleUserInput}
						className="form-control"
						id="noOfBubbleTops"
						placeholder="Enter No of BubbleTop"/>

					</div>
					 <div className={`form-group ${this.errorClass(this.state.formErrors.perBubbleTopRate)}`}>

					  <label htmlFor="perBubbleTopRateid">Rate Per Bubbletop :</label>
					  <input type="number"
						value={this.state.perBubbleTopRate}
						onChange={this.handleUserInput}
						name="perBubbleTopRate"
						className="form-control"
						id="perBubbleTopRateid"
						placeholder="Enter Per Bottle Rate "/>
					</div>

					<button type="submit" className="btn btn-default" disabled={!this.state.formValid} onClick={() => this.Next()}>Next</button>
				   </form>

				</div>

		);
	}

}

export default Billing;
