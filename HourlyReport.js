import React,{Component} from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import Report from './Report';

class HourlyReport extends Component{


	constructor(props) {
		super(props)
				this.state = {

			 fillingStationId:''
		 				};
		}
		componentDidMount() {
			alert('componentDidMount');
			alert($("#records_table"));

			//For single record
			//var trHTML = '<tbody ><tr><td>' + this.state.response.userName + '</td><td>' + this.state.response.password + '</td></tr></tbody >';

			//For multiple records
			var trHTML;
			$.each(this.state.response, function (i, item) {
				alert(item);
				trHTML += '<tr><td>' + item.userName + '</td><td>' + item.password + '</td></tr>';
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
export default HourlyReport;
