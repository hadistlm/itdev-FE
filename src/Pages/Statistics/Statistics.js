import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import myHelper from "../../Helper/myHelper";
import myContent from "../../Helper/myContent";
import myChart from "../../Helper/myChart";
import * as am4core from "@amcharts/amcharts4/core";

import MessageIcon from '@material-ui/icons/Message';
import RingVolumeIcon from '@material-ui/icons/RingVolume';
import MailIcon from '@material-ui/icons/Mail';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

class Statistics extends Component {
  chart=undefined;
  chart_call=undefined;
  chart_sms=undefined;
  chart_email=undefined;
  chart_wa=undefined;
  capacityCard=[
    {mode:"call",class:"myPaper cl1",text:"Call",ic:<RingVolumeIcon className="bg-ic"/>},
    {mode:"sms",class:"myPaper cl2",text:"SMS",ic:<MessageIcon className="bg-ic"/>},
    {mode:"email",class:"myPaper cl3",text:"Email",ic:<MailIcon className="bg-ic"/>},
    {mode:"whatsapp",class:"myPaper cl4",text:"Whatsapp",ic:<WhatsAppIcon className="bg-ic"/>}
  ];
  
  myChart=new myChart();
  myContent=new myContent();

  constructor(props) {
    super(props);
      
  }

  componentDidMount() {

    let data = [{
      "status": "Success",
      "val": 501
    }, {
      "status": "Pending",
      "val": 301
    }, {
      "status": "Fail",
      "val": 201
    }];

    let dataLine=[{
      //"date": new Date(2021, 3, 20),
      "dates": "2021-03-20",
      "call": 90,
      "email": 70,
      "whatsapp": 80,
      "sms": 45
    }, {
      //"date": new Date(2021, 3, 21),
      "dates": "2021-03-21",
      "call": 102,
      "email": 122,
      "whatsapp": 182,
      "sms": 90
    }, {
      //"date": new Date(2021, 3, 23),
      "dates": "2021-03-23",
      "call": 125,
      "whatsapp": 162,
      "email": 25,
      "sms": 90
    }, {
      //"date": new Date(2021, 3, 24),
      "dates": "2021-03-24",
      "call": 55,
      "email": 25,
      "whatsapp": 125,
      "sms": 90
    }, {
      //"date": new Date(2021, 3, 25),
      "dates": "2021-03-25",
      "call": 81,
      "email": 89,
      "whatsapp": 89,
      "sms": 60
    }, {
      //"date": new Date(2021, 3, 26),
      "dates": "2021-03-26",
      "call": 55,
      "email": 25,
      "whatsapp": 125,
      "sms": 90
    }, {
      //"date": new Date(2021, 3, 27),
      "dates": "2021-03-27",
      "call": 63,
      "email": 83,
      "whatsapp": 83,
      "sms": 87
    }, {
      //"date": new Date(2021, 3, 28),
      "dates": "2021-03-28",
      "call": 113,
      "email": 123,
      "whatsapp": 143,
      "sms": 62
    }];

    let setValue=[{
        var:"call",
        val:"Call",
        opacity:0.1,
        mode:"line",
        color:am4core.color("#EABF0A"),
        stacked:false
      },{
        var:"sms",
        val:"SMS",
        opacity:0.1,
        mode:"line",
        color:am4core.color("#E0790A"),
        stacked:false
      },{
        var:"email",
        val:"Email",
        opacity:0.1,
        mode:"line",
        color:am4core.color("#CE0909"),
        stacked:false
      },{
        var:"whatsapp",
        val:"Whatsapp",
        opacity:0.1,
        mode:"line",
        color:am4core.color("#A7D26D"),
        stacked:false
      }];

    this.chart = this.myChart.setXYChart(am4core,"chartdiv_quota_usage","Daily Usage","dates",setValue,dataLine);
    this.chart_call = this.myChart.setPieChart(am4core,"chartdiv_call","Call Status","status","val",data );
    this.chart_sms = this.myChart.setPieChart(am4core,"chartdiv_sms","SMS Status","status","val",data );
    this.chart_email = this.myChart.setPieChart(am4core,"chartdiv_email","Email Status","status","val",data );
    this.chart_wa = this.myChart.setPieChart(am4core,"chartdiv_whatsapp","Whatsapp Status","status","val",data );
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }

    if (this.chart_call) {
      this.chart_call.dispose();
    }
    if (this.chart_sms) {
      this.chart_sms.dispose();
    }
    if (this.chart_email) {
      this.chart_email.dispose();
    }
    if (this.chart_wa) {
      this.chart_wa.dispose();
    }
    
  }

  myUsage(mode){
    return 99999;
  }

  myCapacity(mode){
    return 999999;
  }

  mySuccess(mode){
    return 999;
  }
  myFail(mode){
    return 999;
  }
  myPending(mode){
    return 999;
  }

  myBalance(mode){
    let x=(this.myCapacity(mode)-this.myUsage(mode));
    return x;
  }

  myPercentUsage(mode){
    let x=100-((this.myCapacity(mode)-this.myUsage(mode))/this.myCapacity(mode)*100);
    return x;
  }

  render() {
    return (

      <div className="main-content">

      <Grid container spacing={3}>
        {this.capacityCard.map((val, index) => (
        <Grid key={"card_status"+index} item xs={12} sm={6} md={3}>
          <Paper className={val.class}  elevation={3}><div className="content">
          {val.ic}
          <div className="title">{val.text} Quota</div>
          <div className="subtitle">{val.text} usage <b>{this.myUsage(val.mode)}</b> </div>
          <div className="label">{this.myBalance(val.mode)}</div>
          <this.myContent.LinearProgressWithLabel variant="determinate" value={this.myPercentUsage(val.mode)} />
          </div>
          <Grid className="status" container spacing={1}>
            <Grid item xs={4}>
            <div className="subtitle">
              Success
            </div>
            <div className="title">
              {this.mySuccess(val.mode)}
            </div>
            </Grid>
            <Grid item xs={4}>
            <div className="subtitle">
              Pending
            </div>
            <div className="title">
              {this.myPending(val.mode)}
            </div>
            </Grid>
            <Grid item xs={4}>
            <div className="subtitle">
              Fail
            </div>
            <div className="title">
              {this.myFail(val.mode)}
            </div>
            </Grid>
          </Grid>
          </Paper>
        </Grid>
        ))}
        
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}> 
            {this.capacityCard.map((val, index) => (
            <Grid key={"card_statistik"+index} item xs={12} md={6}>
            <Paper className={val.class} elevation={3} style={{padding:"0px"}}>
              <div id={"chartdiv_"+val.mode} style={{ width: "100%", height: "250px" }}></div>
            </Paper>
            </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="bg-dark" elevation={3} >
              <div id={"chartdiv_quota_usage"} style={{ width: "100%", height: "250px" }}></div>
            </Paper>
          </Grid>  
          <Grid item xs={12} md={12}>  
            <Paper className="myPaper bg-dark" elevation={3} >
              <h2>HELLO</h2>
              <p>Cras facilisis urna ornare ex volutpat, et
              convallis erat elementum. Ut aliquam, ipsum vitae
              gravida suscipit, metus dui bibendum est, eget rhoncus nibh
              metus nec massa. Maecenas hendrerit laoreet augue
              nec molestie. Cum sociis natoque penatibus et magnis
              dis parturient montes, nascetur ridiculus mus.</p>
            </Paper>
          </Grid>
          </Grid>
        </Grid>  

        <Grid item xs={12} md={12}>
          <Paper className="myPaper "  elevation={3}>
            <div>
            <h2>HELLO</h2>
            <p>Cras facilisis urna ornare ex volutpat, et
            convallis erat elementum. Ut aliquam, ipsum vitae
            gravida suscipit, metus dui bibendum est, eget rhoncus nibh
            metus nec massa. Maecenas hendrerit laoreet augue
            nec molestie. Cum sociis natoque penatibus et magnis
            dis parturient montes, nascetur ridiculus mus.</p>
     
            <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
            </div>
          </Paper>
        </Grid>
        
      </Grid>
      </div>

    );
  }
}
 
export default Statistics;