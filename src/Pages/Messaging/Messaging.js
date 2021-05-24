import React, { Component } from "react";
import $ from 'jquery';
import moment from 'moment';
import _ from 'lodash';
import { lighten, makeStyles } from '@material-ui/core/styles';

import daterangepicker from 'daterangepicker';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import "./Messaging.css";
import Form from "../Form/Form";
import ScheduleIcon from '@material-ui/icons/Schedule';
import AddIcon from '@material-ui/icons/Add';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SmsIcon from '@material-ui/icons/Sms';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import MailIcon from '@material-ui/icons/Mail';

import myHelper from "../../Helper/myHelper";
import myTable from "../../Helper/myTable";

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
import { DataGrid } from '@material-ui/data-grid';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

class Messaging extends Component {
  
  modalStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  myIcon=myHelper.getMode('icon');
  myMode=myHelper.getMode('mode');
  myTitle=myHelper.getMode('title');
  mySchedul=myHelper.getMode('schedul');

  constructor(props) {
    super(props);
    this.myTable=new myTable(props);
    global.__classAThis = this;
    this.handleDebounceFilterChange = _.debounce(this.handleDebounceFilterChange, 1500);
    this.state={
      orderBy : 'id',
      order : 'asc',
      rowsPerPage:5,
      page:0,
      rowsAmount:undefined,
      ListrowsPerPage:[5,10,15,20],
      selected:[],
      uniqueBy:"id",
      s_name:"",
      s_status:"all",
      s_date:"",
      s_status_list:[{var:"all",val:"All"},{var:"waiting",val:"Waiting"},{var:"pending",val:"Pending"},{var:"finish",val:"Finish"}],
      modalOpen:false,
      rows : [
  	    { id: 1, created_at: '2021-05-17', name: 'Snow', group: 'Jon', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 2, created_at: '2021-05-18', name: 'Lannister', group: 'Cersei', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 3, created_at: '2021-05-19', name: 'Lannister', group: 'Jaime', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 4, created_at: '2021-05-20', name: 'Stark', group: 'Arya', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 5, created_at: '2021-05-21', name: 'Targaryen', group: 'Daenerys', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 6, created_at: '2021-05-18', name: 'Melisandre', group: null, status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 7, created_at: '2021-05-17', name: 'Clifford', group: 'Ferrara', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 8, created_at: '2021-05-16', name: 'Frances', group: 'Rossini', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	    { id: 9, created_at: '2021-05-19', name: 'Roxie', group: 'Harvey', status: "Finish",message: "lore ipsum dolor site amet ...." },
  	  ],
      FilterRows : [],
      column:[
        { field: 'checkbox',show:true, selectOn: "id",label: '' },
        { field: 'name',subfield: 'created_at',icon:this.myIcon,show:true, numeric: false,align:"left", disablePadding: true, label: 'Campaign Name', width: 180 },
        { field: 'group',show:true, numeric: false,align:"left", disablePadding: true, label: 'Contact Group', width: 180 },
        {
          field: 'message',show:true,
          numeric: false,
          align:"left", 
          disablePadding: true,
          label: 'Message',
          description: 'This column has a value getter and is not sortable.',
          sortable: false
        },
        { field: 'status',show:true, numeric: false,align:"left", disablePadding: true,label: 'Status', width: 120 },
        { field: 'button',show:true, align:"right", disablePadding: true,label: '', width: 120 ,button:[
          {icon:<VisibilityIcon/>,title:"",class:"myBtn-clear btn-report",action:this.tblBtnClick}
        ]}
        
      ]
    };

    this.state.FilterRows=this.state.rows;
    // this.myTable.test();
     
  }

  componentDidMount() {
    var start = moment().subtract(29, 'days');
    var end = moment();

    $('#btn_daterange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, this.dateChange);

    this.dateChange(start, end);
  }

  reloadData=()=>{
  	this.setState({ FilterRows: this.state.rows,
                    s_name:"",
                    s_status:"all"});
  }

  dateChange=(start, end)=>{
      //$('#s_date').val(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      this.setState({s_date:start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY')});
  }

  sortChange=(data,event,property)=>{
    console.log("mySorted event",event);
    console.log("mySorted property",property);
    console.log("mySorted data",data);
    this.setState({orderBy: data.orderBy,order: data.order});
  }

  pageChange=(data,event)=>{
    console.log("myPage event",event);
    console.log("myPage data",data);
    this.setState({rowsPerPage: data.rowsPerPage,page: data.page});
  }

  checkdChange=(data,event)=>{
    console.log("myPage event",event);
    console.log("myPage data",data);
    this.setState({selected: data});
  }

  tblBtnClick=(data,event)=>{
      console.log("mybtn data",data);
      console.log("mybtn event",event);
  }

  handleChangeRowsPerPage=(event) => {
    this.setState({rowsPerPage:event.target.value});
  }

  handleDebounceFilterChange = (mVar,mVal) => {
      console.log("change filter get "+mVar,mVal);
      this.getData();
  }

  handleOpenModal = () => {
    this.setState({modalOpen:true});
  };

  handleCloseModal = () => {
    this.setState({modalOpen:false});
  };

  handleFilterChange = (event) => {
    const name = event.target.name;
    console.log("change target",event.target);
    this.setState({
        [name]: event.target.value
    });

    //if(name=="s_name")  
    this.handleDebounceFilterChange(name,event.target.value);
    /*else {
      console.log("change filter get "+name,event.target.value);  
      this.getData();  
    }*/

  };

  getData=()=>{
      // disini nanti ambil ke API
      let myFilter={
          name:this.state.s_name,
          status:this.state.s_status,
      };
      this.setState({FilterRows:myHelper.filterItems(this.state.rows,myFilter)});
  }

  myModal=()=>{
    const classes=this.modalStyles();
    return (
      <Modal
          aria-labelledby="form-modal-title"
          aria-describedby="form-modal-description"
          className={"myFormModal "+classes.modal}
          open={this.state.modalOpen}
          onClose={this.handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
        <Fade in={this.state.modalOpen}>
          <Paper className={"myModalContent "+classes.paper}>
            
            <Form/>
          </Paper>
        </Fade>    
        </Modal>
    )
  }

  myFilter=()=>{
  	let rowNumber=this.state.ListrowsPerPage;

  	return (	
  				<Grid container spacing={1}>
		        		<Grid item xs={12} sm={12} md={3}>
                <div className="paper_title">
                   {this.myMode} Broadcast
                </div>
                <div className="paper_subtitle">
                 Remaining Quota: 10 | Expired on 8th June 2021
                </div>
                </Grid>
                <Grid item xs={12} md={9} className="text-right">
		        		<FormControl className="mySelect" color="secondary" margin="dense" variant="outlined">
                  <InputLabel id="s_l_status">Filter Status </InputLabel>
                  <Select
                    labelId="s_l_status"
                    id="s_status"
                    value={this.state.s_status}
                    onChange={this.handleFilterChange}
                    inputProps={{
                      name: 's_status'
                    }}  
                  >
                    {this.state.s_status_list.map((option,index) => (
                        <MenuItem key={"status_opt"+index} value={option.var}>{option.val}</MenuItem>
                    ))}
                  </Select>
                </FormControl>&nbsp;&nbsp;&nbsp;
                
                <FormControl className="myInput my-input-width" color="secondary" margin="dense" variant="outlined">
                  <InputLabel htmlFor="s_name">Select Period</InputLabel>
                  <OutlinedInput
                    id="s_date"
                    value={this.state.s_date}
                    inputProps={{
                      name: 's_date',
                      readOnly: true
                    }}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton id="btn_daterange" aria-label="Date" className="btn-daterange">
                            <DateRangeIcon/>
                        </IconButton>
                    </InputAdornment>}
                    
                  />
                </FormControl>&nbsp;&nbsp;&nbsp;

		        		<FormControl className="myInput" color="secondary" margin="dense" variant="outlined">
				          <InputLabel htmlFor="s_name">Search By Campaign Name</InputLabel>
				          <OutlinedInput
				            id="s_name"
				            value={this.state.s_name}
                    onChange={this.handleFilterChange}
                    inputProps={{
                      name: 's_name'
                    }}
				            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
				            
				          />
				        </FormControl>
		        		</Grid>
		        		
		        	</Grid>
		      );
  }

  render() {
  	let subIcon="";
    if(this.mySchedul){
  		subIcon=<ScheduleIcon className="ic_subicon" />
  	}

    return (
      <div className="main-content myLayout">
        <Grid container spacing={3}>
        	<Grid item xs={12} className="no-padding-bottom">
	       		<div className="page_title">
	       			{this.myMode}
	       		</div>
	       	</Grid>
	        <Grid item xs={6} >
          <Button variant="contained" className="my-btn bg-light" onClick={this.reloadData}><RefreshIcon className="ic_left" /> &nbsp; Refresh</Button>
          </Grid>
          <Grid item xs={6} className="text-right">
          <a href={this.myMode.toLowerCase()+"/form"}>
	        <Button variant="contained" className="my-btn bg-red" ><AddIcon className="ic_left" /> &nbsp; New Broadcast</Button>
          </a>
	        </Grid>
	        <Grid item xs={12}>
	        	<Paper className="myPaper" elevation={3}>
		        	<this.myFilter />
              
		        	<this.myTable.CreateTable
              uniqueBy={this.state.uniqueBy} 
              RowsData={this.state.FilterRows} 
              RowsAmount={this.state.rowsAmount}
              activePage={this.state.page} 
              ColumnHead={this.state.column}
              defaultOrderBy={this.state.orderBy}
              defaultOrder={this.state.order}  
              dafaultRowsPerPage={this.state.rowsPerPage}
              dafaultListrowsPerPage={this.state.ListrowsPerPage}
              setSelected={this.state.selected}
              onCheckedChange={this.checkdChange}
              onSortChange={this.sortChange}
              onPageChange={this.pageChange}/>
	        	</Paper>
	        </Grid>
        </Grid>

        <this.myModal />
      </div>
    );
  }
}
 
export default Messaging;