import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import Report from './Report';

class DailyReport extends Component{


	constructor(data) {
		super(data)
				this.state = {
        response:data,
			 fillingStationId:''
		 				};
		}
		componentDidMount() {
			alert('componentDidMount');
			alert($("#records_table"));

			//For single record
			//var trHTML = '<tbody ><tr><td>' + this.state.response.vendorName + '</td><td>' + this.state.response.billingAmount + '</td></tr></tbody >';

			//For multiple records
     var trHTML;
     trHTML += '<tr><td><b>' + 'VENDOR NAME' + '</b></td><td><b>' + 'AMOUNT' + '</b></td><td><b>'+ 'DATE' + '</b></td></tr>';

			$.each(this.state.response, function (i, item) {
				alert(item);
				trHTML += '<tr><td>' + item.vendorName + '</td><td>' + item.totalAmount + '</td><td>'+ item.dateAndTime + '</td></tr>';
			});

			$("#records_table").append(trHTML);

		 }

render(){
	alert('hourly report');
		return(

<div className="container">
  <h3 className="text-muted">Report</h3>
  <h2>{localStorage.getItem('companyNameL')}</h2>
        <table id="records_table" style={{width:'80%'}}>

         </table>

  </div>
		);
	}

}
export default DailyReport;
