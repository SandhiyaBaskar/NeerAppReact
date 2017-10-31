import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import HourlyReport from './HourlyReport';
import DailyReport from './DailyReport';


import $ from 'jquery';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';


class Report extends Component{
	constructor(props) {
				super(props)
				var today = new Date();
				var date = today.getFullYear()+'-'+ (today.getMonth() + 1) + '-'+today.getDate() ;
				this.state = {
					 fillingStationId:'',
					 date:date,
				 };
		}


HourlyReportFunc(){
	this.state.fillingStationId=localStorage.getItem('fillingStationIdL');
				this.setState({
						fillingStationId:localStorage.getItem('fillingStationIdL'),

					});
						alert(JSON.stringify(this.state));
							$.ajax({
							  type: 'POST',
							  data:JSON.stringify(this.state),
							  url: "http://localhost:8080/RestAPI/report/hourlyReport;",
							  contentType: "application/json",
							  dataType: 'json',
								async:false,
							  success: function(data,textStatus,jqXHR)
                 {
								  console.log(data);
									alert("hourly");
								  ReactDOM.render(React.createElement(HourlyReport,data),
															document.getElementById("root"));

										 },
			             error:function(data) {
             					console.log('#####################error:################################'+data);
             					alert('Login Invalid'+ data);

 		     						},
							  });
						 }
 DailyReportFunc(){
	 this.state.fillingStationId=localStorage.getItem('fillingStationIdL');
						this.setState({
						 			fillingStationId:localStorage.getItem('fillingStationIdL'),

						 });
						 alert(JSON.stringify(this.state));
						 $.ajax({
						 				type: 'POST',
						 				data:JSON.stringify(this.state),
						 				url: "http://localhost:8080/RestAPI/report/dailyReport",
						 				contentType: "application/json",
						 				dataType: 'json',
						 				async:false,
						 				success: function(data,textStatus,jqXHR)
						        {
						 					 console.log(data);
						 					 alert("Daily Report");
						 					 ReactDOM.render(React.createElement(DailyReport,data),
						 															document.getElementById("root"));

						 				},
						 			  error:function(data) {
						             console.log('#####################error:################################'+data);
						             alert('Login Invalid'+ data);

						  		  },
						 				});
	}



	render(){
		return(

<div className="container">
  <h2 className="text-muted">Report</h2>
<h2>{localStorage.getItem('companyNameL')}</h2>
  <nav className="navbar navbar-default">
    <div>
      <div className="navbar-header" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <button type="button" className="navbar-toggle collapsed navbar-toggle-center" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="glyphicon glyphicon-menu-hamburger"></span>
          <span className="navmenu">MENU</span>
        </button>
      </div>
      <div className="collapse navbar-collapse navbar-nav-justified" id="bs-example-navbar-collapse-1">
        <ul className="nav nav-pills nav-justified">

          <li ><NavLink to="/HourlyReport" onClick={()=>this.HourlyReportFunc()}>Hourly</NavLink></li>
          <li><NavLink to="/DailyReport" onClick={()=>this.DailyReportFunc()}>Daily</NavLink></li>
          <li><a href="#">Summary</a></li>
		  <li><a href="#">Period</a></li>
          <li><a href="#">Historic</a></li>
        </ul>
      </div>
    </div>
  </nav>

  </div>
		);
	}

}
export default Report;
