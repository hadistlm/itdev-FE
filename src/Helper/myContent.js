import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import myHelper from "./myHelper";
import myTable from "./myTable";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

export class myContent extends Component{
  
  constructor(props){
    super(props);
    this.state={
        schedule:{
          date:"",
          time:"",
          time_list:[]
        }
    }
  }

  componentWillUnmount(){
    this.BroadcastScheduler={
      data:PropTypes.object.isRequired,
      onDataChange:PropTypes.func.isRequired,
    }
  }
  
  LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  BroadcastScheduler(props){
    const { data,onDataChange } = props;
    const myTbl=new myTable();

    const myCol=[
                  {field:"type",title:"Ended Time Type",addOn:{mode:"option",mandatory:true,hideValueOn:"Daily Max Operation Time",hideFiled:"end",disabledField:"action",disabledIfSelectExistedVal:"Daily Max Operation Time",default:"Specific Time",defaultPushPositionOn:"first",list:[{var:"Specific Time",val:"Specific Time"},{var:"Daily Max Operation Time",val:"Daily Max Operation Time"}]}},
                  {field:"start",title:"Start At",addOn:{mode:"time",mandatory:true}},
                  {field:"end",title:"End At",addOn:{mode:"time",mandatory:true,mandatoryIgnore:"type",mandatoryIgnoreOn:"Daily Max Operation Time"}},
                  {field:"action",title:"Action",addOn:{mode:"action",mandatory:false,list:["add","delete"]}},
                ];

    const handleChange=(mode,event)=>{
      const setData=data;
      setData[mode]=event.target.value;
      //

      if(mode=="time" && event.target.value!=""){
        let x=myHelper.searchArray("type","Daily Max Operation Time",setData.time_list);
        if(x>=0){
          setData.time_list[x]={
            type:"Daily Max Operation Time",
            start:event.target.value,
            end:""  
          };
        }
        else{
          setData.time_list.push(
            {
              type:"Daily Max Operation Time",
              start:event.target.value,
              end:""  
            }
          );
        }
      }
      
      onDataChange('schedule',setData);
    }

    const tableHandlerChange=(dtRows)=>{
        handleChange("time_list",{target:{value:dtRows}});
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
            <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
              <div className="myLabel" htmlFor="inp_date">Select Date</div>
              <OutlinedInput
                required   
                id="inp_date"
                type="date"
                placeholder="dd/mm/yy"
                value={data.date}
                onChange={(event)=>handleChange('date',event)}
                
              />
              <FormHelperText className="no-margin"></FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
            <FormControl className="myInput" color="secondary" margin="dense" variant="outlined">
              <div className="myLabel" htmlFor="inp_time">Daily Max Operational Time</div>
              <OutlinedInput
                required   
                id="inp_time"
                type="time"
                placeholder="HH:MM"
                value={data.time}
                onChange={(event)=>handleChange('time',event)}
                
              />
              <FormHelperText className="no-margin"></FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
              <myTbl.CreateTableAddOn cols={myCol} rows={data.time_list} onDataChange={tableHandlerChange}/>
            </Grid>
        </Grid>
    )
  }

}
 
export default myContent;