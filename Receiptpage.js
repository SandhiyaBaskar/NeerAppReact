import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import ReactDOM from 'react-dom';
//import registerServiceWorker from './registerServiceWorker';
import './ReceiptScreen.css';
import Billing from './Billing';
import MainPage from './MainPage';
import Report from './Report';
import Aboutus from './Aboutus';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
class ReceiptScreen extends Component {
    constructor(data) {
        super(data)
        var today = new Date();
        var date = today.getDate()+'-'+ (today.getMonth() + 1) + '-'+today.getFullYear() ;
        var time=today.toLocaleTimeString();

        this.state = {
              response:data,
              date: date,
              time:time,
              fillingStationId:'',
              vendorCode:'',
              receiptNo:'',
              vendorName:'',
              noOfBubbleTops:'',
              perBubbleTopRate:'',
              gstPercentage:'',
              billingAmount:'',
              sgstAmount:'',
              cgstAmount:'',
              gstAmount:'',
              totalAmount:'',
              emailId:'',
              companyName:'',
              userName:'',
            };
}


componentDidMount() {
    //alert('componentDidMount');
    //alert($("s#records_table"));

    /*For single record
    var trHTML = '<tbody ><tr><td>' + this.state.response.userName+
    '</td><td>' + this.state.resoponse.paswd +
    '</td><td></tbody >'*/

    //For multiple records
    /*$.each(this.state.response, function (i, item) {
        alert(item);
        trHTML += '<tr><td>' + item.userName + '</td><td>' + item.password + '</td></tr>';
    });*/

  //$("#product_table").append(trHTML);
  var company_name=localStorage.getItem('companyNameL');
  var address=localStorage.getItem('addressL');
  var email=localStorage.getItem('emailL');
  var mobile_no=localStorage.getItem('mobileNoL');
  var fillingStationIdProps=localStorage.getItem('fillingStationIdL');
  var bill_no=localStorage.getItem('receiptNoL');
  var vendorCodeProps=this.props.vendorCode;

  var vendor_name=this.props.vendorName;
  $("#company_name").append(company_name);
  $("#address").append(address);
  $("#email").append(email);
  $("#mobile_no").append(mobile_no);

  $("#vendor_name").append(vendor_name);
var product_qty=this.props.noOfBubbleTops;
var product_price=this.props.perBubbleTopRate;
 $("#bill_no").append(bill_no);
$("#product_qty").append(product_qty);
$("#product_price").append(product_price);
var billing_amount=this.state.response.billingAmount;
var gst_per=this.state.response.gstPercentage;
var sgst_per=this.state.response.sgstPercentage;
var cgst_per=this.state.response.cgstPercentage;
var gst_amt=this.state.response.gstAmount;
var sgst_amt=this.state.response.sgstAmount;
var cgst_amt=this.state.response.cgstAmount;
var amount=this.state.response.totalAmount;
$("#gstper").append(gst_per);
$("#sgstper").append(sgst_per);
$("#cgstper").append(cgst_per);
$("#billing_amount").append(billing_amount);
$("#sgst_amt").append(sgst_amt);
$("#cgst_amt").append(cgst_amt);
$("#amount").append(amount);
$("#gstamt").append(gst_amt);
this.setState({
    fillingStationId: fillingStationIdProps,
    vendorCode:vendorCodeProps,
    receiptNo:bill_no,
    vendorName:vendor_name,
    noOfBubbleTops:product_qty,
    perBubbleTopRate:product_price,
    gstPercentage:gst_per,
    billingAmount:billing_amount,
    sgstAmount:sgst_amt,
    cgstAmount:cgst_amt,
    gstAmount:gst_amt,
    totalAmount:amount,
   emailId:email,
   companyName:company_name,
    });

 }

Previous(){

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
Cancel(){

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


print(){
/* var data={
   perBubbleTopRate:this.state.product_price;
   billingAmount:this.state.billing_amount;
   gstPercentage:this.state.gst_per;
   gstAmount:this.state.gst_amt;
   totalAmount:this.state.amount;
 }
 */
 this.refs.disablefunc.setAttribute("disabled", "disabled");

$.ajax({
      type: 'POST',
     data:JSON.stringify(
    {
       //id: $("#Shareitem").val(),
    fillingStationId:this.state.fillingStationId,
       vendorCode:this.state.vendorCode,
       receiptNo:this.state.receiptNo,
       vendorName:this.state.vendorName,
       noOfBubbleTops:this.state.noOfBubbleTops,
       gstPercentage:this.state.gstPercentage,
       perBubbleTopRate:this.state.perBubbleTopRate,
       billingAmount:this.state.billingAmount,
       sgstAmount:this.state.sgstAmount,
       cgstAmount:this.state.cgstAmount,
       gstAmount:this.state.gstAmount,
       totalAmount:this.state.totalAmount,
    /*   perBubbleTopRate:$("#product_price").val(),
       billingAmount:$("#billing_amount").val(),
       gstPercentage:$("#gstper").val(),
       gstAmount:$("#gstamt").val(),
       totalAmount:$("#amount").val(),
       receiptNo:$("#bill_no").val(),
       noOfBubbleTops:$("#product_qty").val(),
       sgstAmount:$("#sgst_amt").val(),
       cgstAmount:$("#cgst_amt").val()*/





     }),
      url: "http://localhost:8080/RestAPI/bill/storingTransaction",
      contentType: "application/json",
      dataType: 'json',

      success: function(data){
         console.log(data);
           window.print();

                              ReactDOM.render(
                             <Router>
                              <div>
                                <Route path="/" component={MainPage}/>
                                <Route exact path="/aboutus" component={Aboutus}/>
                                <Route path="/billing"component={Billing}/>
                                <Route path="/Report" component={Report}/>

                              </div>
                            </Router>, document.getElementById('root'));             },
            error: function(data) {
            console.log('#####################error:################################'+data);
            alert('addUser error: ' + data);
            console.log(data);
            }
     });
   }



  render() {
    return (
      <div id="main">
      <table>
      <tbody>
      <tr>
     <td id="company_name">
     </td>
     </tr>
     <tr>
    <td id="address">
      </td>
      </tr>
      </tbody>
      </table>
<table id="table1">
<tbody>
           <tr>
                    <td>
                    E-mail
                    </td>
                    <td>
                    :<label id="email" />
                    </td>
              </tr>
              <tr>
                    <td>
                    Mobile No
                    </td>
                    <td>
                    :<label id="mobile_no" />
                    </td>
                    </tr>
             <tr>
                    <td>
                    Bill#
                    </td>
                    <td>
                    <label id="bill_no" />
                    </td>
                    </tr>


              <tr>
                    <td>
                    Vendor Name
                    </td>
                    <td>
                    :<label id="vendor_name"/>
                    </td>
              </tr>
              <tr>
                    <td>
                    Date
                    </td>
                    <td>
                    :{this.state.date}
                    </td>
              </tr>
                <tr>
                    <td>
                    Time
                    </td>
                    <td>
                    :{this.state.time}
                    </td>
              </tr>
      </tbody>
      </table>
      <table id="producttable">
      <tbody>
            <tr>
                    <td>
                    No Of Bubbletops
                    </td>
                    :<td id="product_qty" >
                    </td>
                    </tr>
                    <tr>
                    <td>
                    Rate per BubbleTop
                    </td>
                    :<td id="product_price" >
                    </td>
            </tr>

      </tbody>
      </table>
      <table id="table2">
      <tbody>
            <tr>
                    <td>
                    Billing Amount
                    </td>
                    <td>
                    :<label id="billing_amount" />
                    </td>
            </tr>
            <tr>
                    <td>
                    GST
                    <label id="gstper" />%
                    </td>
                    <td>
                    :<label id="gstamt" />
                    </td>
            </tr>
            <tr>
                    <td>
                    SGST
                   <label id="sgstper"/>%
                   </td>
                  <td>
                  :<label id="sgst_amt" />
                  </td>
            </tr>
            <tr>
                  <td>
                  CGST
                  <label id="cgstper"/>%
                  </td>
                  <td>
                  :<label id="cgst_amt" />
                  </td>
            </tr>
            <tr>
                      <td>
                      Amount <br/>
                      (Incl of All Taxes)
                      </td>
                      <td>
                      <b><label id="amount"/></b>
                      </td>
            </tr>
      </tbody>
      </table>
<div id="thankyou">
      <p> Thank You </p>
      </div>
      <table>
      <tbody>
      <tr>
      <td>
      <input type="submit"  value="Previous" onClick={()=>this.Previous()}/>
      </td>
      <td>
      <input type="submit" ref="disablefunc"value="Print" onClick={()=>this.print()}/>
      </td>
      <td>
      <input type="submit" value="Cancel" onClick={()=>this.Cancel()}/>
      </td>
      </tr>
    </tbody>
    </table>
    </div>




 );

    }
}



export default ReceiptScreen;
