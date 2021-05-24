import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import myHelper from "../../Helper/myHelper";
import "./Form.css";
import { lighten, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import SaveIcon from '@material-ui/icons/Save';
import ReplayIcon from '@material-ui/icons/Replay';
import AddIcon from '@material-ui/icons/Add';

export class Form extends Component{
  myMode=myHelper.getMode("mode");
  constructor(props) {
    super(props);
    // console.log("props", props);
    // global.__classBThis = this;
    this.handleDebounceFilterChange = _.debounce(this.handleDebounceFilterChange, 1500);

    this.state={
      modalOpen:false,
      s_contact_group:"",
      s_template:"",
      s_variable:"",
      select:{
          contact:false,
          variable:false,
          template:false,
      },  
      input:{
        name:"",

        email:"",
        sender:"",
        subject:"",

        template:" ",

        contact:" ",
        message:"",
        variable:[]
      },
      list_contact:[
        {id:1,name:"group 1",member:["A","B","C"]},
        {id:2,name:"group 2",member:["A","B","C"]},
        {id:3,name:"group 3",member:["A","B","C"]},
        {id:4,name:"group 4",member:["A","B","C"]},
        {id:5,name:"group 5",member:["A","B","C"]},
        {id:6,name:"group 6",member:["A","B","C"]},
        {id:7,name:"group 7",member:["A","B","C"]}
      ],
      list_template:[
        {id:1,name:"Template 1"},
        {id:2,name:"Template 2"},
        {id:3,name:"Template 3"},
        {id:4,name:"Template 4"},
        {id:5,name:"Template 5"},
        {id:6,name:"Template 6"},
        {id:7,name:"Template 7"}
      ],
      list_variable:[
        {id:1,code:"[var_1]",name:"var 1"},
        {id:2,code:"[var_2]",name:"var 2"},
        {id:3,code:"[var_3]",name:"var 3"},
        {id:4,code:"[var_4]",name:"var 4"},
        {id:5,code:"[var_5]",name:"var 5"},
        {id:6,code:"[var_6]",name:"var 6"},
        {id:7,code:"[var_7]",name:"var 7"}
      ]

    };
   // this.Form.test();
  }

  getData=(mVar,mVal)=>{
    //alert("get data "+mVar+" "+mVal);
  }

  handleDebounceFilterChange = (mVar,mVal) => {
      console.log("change filter get "+mVar,mVal);
      this.getData(mVar,mVal);
  }

  handleOpenModal=(modal,data)=>{
      this.setState({modalOpen:true});
  }

  handleSetWord=(id,target,value="[test]")=>{
      if(this.state.input[id]!=undefined && value!="" && value!=" "){  
          let ctl = document.getElementById(target);
          let startPos = ctl.selectionStart;
          let endPos = ctl.selectionEnd;

          let newText=myHelper.combineText(this.state.input[id],startPos,endPos,value);  
          this.handleChange(id,{target:{value:newText}});
          //this.handleOption('variable',{target:{value:"change"}});  
          document.getElementById(target).focus();
      
      } 
  }

  handleCloseModal = () => {
    this.setState({modalOpen:false});
  };

  handleChange=(mode,event)=>{
      // alert(mode);
      if(this.state.select[mode]!=undefined){
        if(event.target.value!=""){
          let input=this.state.input;
          input[mode]=event.target.value;

          this.setState({
              select:{
               [mode]:!this.state.select[mode]
              },
              input:input
          });
        }
      }
      else if(this.state.input[mode]!=undefined){
        let input=this.state.input;
        
        if(typeof input[mode] === "array"){
            input[mode].push(event.target.value);
            this.setState({
                input:input
            });  
        }
        else{
            input[mode]=event.target.value;

            this.setState({
                input:input
            });
        }
    
      }
      else if(this.state[mode]!=undefined){
        let state=this.state;
        state[mode]=event.target.value;

        this.setState(state);    

        this.handleDebounceFilterChange(mode,event.target.value);
      }
  }

  handleOption=(mode,event)=>{
      if(this.state.select[mode]!=undefined){
        let select=this.state.select;
        select[mode]=!this.state.select[mode]?true:event.target.value!=''?false:true;  

        this.setState({
            s_contact_group:"",
            s_variable:"",
            select:select
        });
      }
  }

  filterGroupContact=()=>{
      
      if(this.state.s_contact_group!=""){
        let myFilter={
            name:this.state.s_contact_group
        };

        let mylist=this.state.list_contact;

        return myHelper.filterItems(mylist,myFilter);
      }
      else return this.state.list_contact;
  };

  filterTemplate=()=>{
      
      if(this.state.s_template!=""){
        let myFilter={
            name:this.state.s_template
        };

        let mylist=this.state.list_template;

        return myHelper.filterItems(mylist,myFilter);
      }
      else return this.state.list_template;
  };

  filterVariable=()=>{
      
      if(this.state.s_variable!=""){
        let myFilter={
            name:this.state.s_variable
        };

        let mylist=this.state.list_variable;

        return myHelper.filterItems(mylist,myFilter);
      }
      else return this.state.list_variable;
  };

  reloadData=()=>{

  }

  render() {

    return (
      <div className={(myHelper.getMode('form')?"main-content":"modal-content")+" myForm"}>
      
      <Grid className="myFormHeader" container spacing={3}>
          <Grid item xs={4} className="no-padding-bottom">
            <div className="page_title">
              {myHelper.getMode('title')}
            </div>
           </Grid>
          <Grid item xs={8} className="text-right">
          <Button variant="contained" className="my-btn bg-light-blue" onClick={this.reloadData}><ReplayIcon /> &nbsp; Reset</Button>
          &nbsp;&nbsp;
          <a href={"/oca/"+this.myMode.toLowerCase()}>
          <Button variant="contained" className="my-btn bg-red" ><SaveIcon /> &nbsp; Start Broadcast</Button>
          </a>
          </Grid>
      </Grid>    
      
      <Paper className="myPaper" elevation={3}>
      <form validate autoComplete="off">
        <div className="myFormlayout">  
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="paper_title">
             New {myHelper.getMode('title')}
          </div>
          <div className="paper_subtitle">
           Add new {myHelper.getMode('title')} to allow your customers to be updated
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
          <div className="myLabel" htmlFor="inp_name">Broadcast Name</div>
          <OutlinedInput
            required   
            id="inp_name"
            type="text"
            placeholder="Type your broadcast name"
            value={this.state.input.name}
            onChange={(event) => this.handleChange('name',event)}
            
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        </Grid>
        
        <Grid className={!myHelper.getMode("email")?"myHidden":""} item xs={12} sm={12} md={6}>
        <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
          <div className="myLabel" htmlFor="inp_email">Sender Email</div>
          <OutlinedInput
            required   
            id="inp_email"
            type="text"
            placeholder="Type your email"
            value={this.state.input.email}
            onChange={(event) => this.handleChange('email',event)}
            
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        </Grid>

        <Grid className={!myHelper.getMode("email")?"myHidden":""} item xs={12} sm={12} md={6}>
        <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
          <div className="myLabel" htmlFor="inp_sender">Sender Name</div>
          <OutlinedInput
            required   
            id="inp_sender"
            type="text"
            placeholder="Type your broadcast sender name"
            value={this.state.input.sender}
            onChange={(event) => this.handleChange('sender',event)}
            
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        </Grid>

        <Grid className={!myHelper.getMode("email")?"myHidden":""} item xs={12} sm={12} md={6}>
        <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
          <div className="myLabel" htmlFor="inp_subject">Subject</div>
          <OutlinedInput
            required   
            id="inp_subject"
            type="text"
            placeholder="Type your broadcast subject"
            value={this.state.input.subject}
            onChange={(event) => this.handleChange('subject',event)}
            
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth  className={"mySelect "+(this.state.input.contact==" "?"myPlaceHolder":"")} color="secondary" margin="dense" variant="outlined">
          <div className="myLabel" htmlFor="inp_contact">Choose Contacts</div>
          <Select
            required   
            id="inp_contact"
            placeholder="Select your contact group"
            value={this.state.input.contact}
            onChange={(event) => this.handleChange('contact',event)}
            open={this.state.select.contact}
            onClick={(event) => this.handleOption('contact',event)}
            
          >
            <MenuItem value=" " disabled>Select your contact group</MenuItem>
            <MenuItem value="">
                <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
                  <OutlinedInput
                    id="s_contact_group"
                    type="text"
                    placeholder="Find your contact group"
                    value={this.state.s_contact_group}
                    onChange={(event) => this.handleChange('s_contact_group',event)}
                  />
                </FormControl>
            </MenuItem>
            {
              this.filterGroupContact().map((option,index) => (
                  <MenuItem key={"myG_"+option.id} value={option.id}><span className="myInvisible"> - </span> {option.name}</MenuItem>
              ))
            }
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
        </Grid>

        <Grid className={!myHelper.getMode("whatsapp")?"myHidden":""} item xs={12} sm={12} md={6}>
        <FormControl fullWidth  className={"mySelect "+(this.state.input.contact==" "?"myPlaceHolder":"")} color="secondary" margin="dense" variant="outlined">
          <div className="myLabel" htmlFor="inp_template">Template Message</div>
          <Select
            required   
            id="inp_template"
            placeholder="Select your template message"
            value={this.state.input.Template}
            onChange={(event) => this.handleChange('template',event)}
            open={this.state.select.template}
            onClick={(event) => this.handleOption('template',event)}
            
          >
            <MenuItem value=" " disabled>Select your template group</MenuItem>
            <MenuItem value="">
                <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
                  <OutlinedInput
                    id="s_template"
                    type="text"
                    placeholder="Find your template group"
                    value={this.state.s_template}
                    onChange={(event) => this.handleChange('s_template',event)}
                  />
                </FormControl>
            </MenuItem>
            {
              this.filterTemplate().map((option,index) => (
                  <MenuItem key={"myT_"+option.id} value={option.id}><span className="myInvisible"> - </span> {option.name}</MenuItem>
              ))
            }
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
        </Grid>

        <Grid item xs={12}>
        <FormControl fullWidth  className="myInputArea" color="secondary" variant="outlined">
          <div className="myLabel" htmlFor="inp_message">Message
            <FormControl className={myHelper.getMode("whatsapp")?"myHidden":""} color="secondary" className="my-btn bg-light-blue">
              <label onClick={(event) => this.handleOption('variable',event)}>
              <button type="button" className="cl-light-blue"><AddIcon /> &nbsp; Add Variable</button>
              <Select
                required
                className="myInvisible"   
                id="inp_variable"
                value={this.state.input.variable}
                onChange={(event) => this.handleSetWord("message","inp_message",event.target.value)}
                open={this.state.select.variable}
              >
                <MenuItem value=" " disabled>Choose Additonal Field</MenuItem>
                <MenuItem value="">
                    <FormControl fullWidth  className="myInput" color="secondary" margin="dense" variant="outlined">
                      <OutlinedInput
                        id="s_variable"
                        type="text"
                        placeholder="Find variable"
                        value={this.state.s_variable}
                        onChange={(event) => this.handleChange('s_variable',event)}
                      />
                    </FormControl>
                </MenuItem>
                {
                  this.filterVariable().map((option,index) => (
                      <MenuItem key={"myV_"+option.id} value={option.code}><span className="myInvisible"> - </span> {option.name}</MenuItem>
                  ))
                }
              </Select>
              </label>
            </FormControl>
 
          </div>
          <OutlinedInput
            required   
            id="inp_message"
            type="text"
            multiline
            rows={5}
            placeholder="Type your broadcast message"
            value={this.state.input.message}
            onChange={(event) => this.handleChange('message',event)}
            
          />
          <FormHelperText></FormHelperText>
        </FormControl>
        </Grid>

        </Grid>
        </div>
       </form> 
       </Paper>
      </div>)
  }

}
 
export default Form;