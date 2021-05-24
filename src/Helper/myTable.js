import React, { Component } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import VisibilityIcon from '@material-ui/icons/Visibility';

export class myTable extends Component{
  constructor(props) {
    super(props);
    
    console.log("props", props);
    global.__classBThis = this;
    this.state={
      tableAttr:{
            order : 'asc',
            orderBy : 'id',
            uniqueBy : 'id',
            selected : [],
            page : 0,
            false : true,
            rowsPerPage : 100,
            listrowsPerPage: [10,50,100]
      },
      rows:[]
    };
   // this.myTable.test();
  }

  setTableAttr=(attr,val)=>{
    //alert("test sort "+attr+" = "+val);
    let mycol=this.state.tableAttr;
    if(mycol[attr]!=undefined){
      console.log("test set 0",mycol[attr]);

      console.log("test set 1",mycol);

      
      mycol[attr]=val;

      console.log("mytest",mycol);
      
      // this.state.tableAttr=mycol;
      this.state.tableAttr[attr]=val;

      // this.setState({tableAttr: mycol});
      // this.props.CalledFromContent(mycol);
      
      console.log("test set 2",mycol);
      return
    }
  }

  getTableAttr=(attr)=>{

    let mycol=this.state.tableAttr;
    //alert("test sort "+attr+" = "+val);
    if(mycol[attr]!=undefined){
    console.log("test get 0",mycol[attr]);

    console.log("test get 1",mycol);

    return mycol[attr];
    
    console.log("test get 2",mycol);
    }
  }

  test2(){
    alert("ini test");
    return ""
  }

  test(){
    return this.test2();
  }

  useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }));

  useTableStyles =makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > *': {
        marginTop: theme.spacing(2),
      }
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }));

  getUseTableStyle(){
    return this.useTableStyles;
  }

  
  componentWillUnmount(){
    this.EnhancedTableHead.propTypes = {
      classes: PropTypes.object.isRequired,
      headCells: PropTypes.array.isRequired,
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };

    this.EnhancedTableBody.propTypes = {
      RowsData: PropTypes.array.isRequired,
      ColumnHead: PropTypes.array.isRequired,
      dafaultRowsPerPage:PropTypes.number,
      onCheckedChange:PropTypes.func
    };

    this.EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };

    this.CreateTable.propTypes = {
      uniqueBy:PropTypes.string,
      RowsData: PropTypes.array.isRequired,
      RowsAmount: PropTypes.number,
      activePage: PropTypes.number,
      ColumnHead: PropTypes.array.isRequired,
      onSortChange:PropTypes.func.isRequired,
      onPageChange:PropTypes.func.isRequired,
      onCheckedChange:PropTypes.func,
      defaultOrderBy:PropTypes.string,
      setSelected: PropTypes.array,
      defaultOrder:PropTypes.oneOf(['asc', 'desc']),
      dafaultRowsPerPage:PropTypes.number,
      dafaultListrowsPerPage:PropTypes.array
    };
    

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

  EnhancedTableToolbar=(props) =>{
    const classes = this.useToolbarStyles();
    const { numSelected } = props;

    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (""
          // <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          //   Broadcast List
          // </Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          /*<Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>*/ ""
        )}
      </Toolbar>
    );
  };

  handleRequestSort = (event, property) => {
      const isAsc = this.state.tableAttr.orderBy === property && this.state.tableAttr.order === 'asc';
      console.log("set sort", property);
      let order=isAsc ? 'desc' : 'asc';
      this.setTableAttr('order',order);
      this.setTableAttr('orderBy',property);

      return {
        order:order,
        orderBy:property
      };
      //console.log("set sort", property);
    };

  handleSelectAllClick = (event,selectOn="id") => {
      console.log("test event",event);
      if (event.target.checked) {
        const newSelecteds = this.state.rows.map((n) => n[selectOn]);
        let data=this.setTableAttr('selected',newSelecteds);
        return data;
      }
      this.setTableAttr('selected',[]);
      return [];
    };

  handleClick = (event, unique) => {
      const selectedIndex = this.state.tableAttr.selected.indexOf(unique);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(this.state.tableAttr.selected, unique);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(this.state.tableAttr.selected.slice(1));
      } else if (selectedIndex === this.state.tableAttr.selected.length - 1) {
        newSelected = newSelected.concat(this.state.tableAttr.selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          this.state.tableAttr.selected.slice(0, selectedIndex),
          this.state.tableAttr.selected.slice(selectedIndex + 1),
        );
      }

      this.setTableAttr('selected',newSelected);

      return newSelected;
    };

  handleChangePage = (event, newPage) => {
      this.setTableAttr('page',newPage);
      return {
        rowsPerPage:this.state.tableAttr.rowsPerPage,
        page:newPage
      };
  };

  handleChangeRowsPerPage = (event) => {
      let rowpage=parseInt(event.target.value, 10);
      this.setTableAttr('rowsPerPage',parseInt(event.target.value, 10));
      this.setTableAttr('page',0);

      return {
        rowsPerPage:rowpage,
        page:0
      };
  };

  handleChangeDense = (event) => {
      this.setTableAttr('dense',event.target.checked);
    };

  descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  getComparator=(order, orderBy)=> {
    return order === 'desc'
      ? (a, b) => this.descendingComparator(a, b, orderBy)
      : (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  stableSort=(array, comparator)=> {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  
  cekValidAlign=(text)=>{
      if(text=='left' || text=='right' || text=='center') return text;
      else return "left"
  }

  EnhancedTableHead=(props)=>{
    const { classes,headCells, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, onSortChange } = props;
    const createSortHandler = (property) => (event) => {
      this.state.tableAttr.orderBy=orderBy;
      let sendData=onRequestSort(event, property);
      if(onSortChange && typeof onSortChange === 'function'){
        onSortChange(sendData,event, property);
      }

    };

    
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell, index)=> (
            headCell.show?(

              headCell.field=="checkbox"?(
              <TableCell key={"myTblCell"+index} padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={(event) =>{onSelectAllClick(event,headCell.selectOn)}}
                  inputProps={{ "aria-label": "select all desserts" }}
                />
              </TableCell>
              ):
              (<TableCell key={"myTblCell"+index}
                className="myTableBolder"  
                key={headCell.field}
                width={headCell.width}
                align={this.cekValidAlign(headCell.align)}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.field ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.field}
                  direction={orderBy === headCell.field ? order : 'asc'}
                  onClick={createSortHandler(headCell.field)}
                >
                  {headCell.label}
                  {orderBy === headCell.field ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              )

            ):""
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableBody=(props)=>{
    const {ColumnHead,RowsData,dafaultRowsPerPage,onCheckedChange } = props;

    let rowsPerPage=this.state.tableAttr.rowsPerPage;
    if(dafaultRowsPerPage!=undefined) {
      this.state.tableAttr.rowsPerPage=dafaultRowsPerPage;
      rowsPerPage=dafaultRowsPerPage;
    }

    const createCheckHandler = (event,unique) => {
      let dataSelect=this.handleClick(event, unique);
       if(onCheckedChange && typeof onCheckedChange === 'function'){
         onCheckedChange(dataSelect,event);
       }
    };

    this.state.rows=RowsData;

      const isSelected = (name) => this.state.tableAttr.selected.indexOf(name) !== -1;

      const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.rows.length - this.state.tableAttr.page * rowsPerPage);

      return (
                <TableBody>
                  {this.stableSort(this.state.rows, this.getComparator(this.state.tableAttr.order, this.state.tableAttr.orderBy))
                    .slice(this.state.tableAttr.page * rowsPerPage, this.state.tableAttr.page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row[this.state.tableAttr.uniqueBy]);
                      const labelId = `enhanced-table-checkbox-${this.state.tableAttr.uniqueBy}`;
                      const mycol=(ColumnHead.map((headCell) => (
                            headCell.show?(
                            headCell.field=="checkbox"?(
                            <TableCell key={"tdCell_"+headCell.field} onClick={(event) => createCheckHandler(event,row[this.state.tableAttr.uniqueBy])}
                             role="checkbox"
                             padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </TableCell>
                            ):(
                            headCell.field=="button"?(
                              <TableCell key={"tdCell_"+headCell.field} component="td" id={labelId} scope="row" align={this.cekValidAlign(headCell.align)} padding="none">
                              <div className="cutomCell">
                              {this.createTableBtn(headCell.button,row)}
                              </div>
                              </TableCell>
                            ):
                            (
                            <TableCell key={"tdCell_"+headCell.field} component="td" id={labelId} scope="row" align={this.cekValidAlign(headCell.align)} padding="none">
                              {headCell.subfield!=undefined?(
                              <div className="cutomCell">
                              {headCell.icon!=undefined?(
                                <div className="cellIcon">
                                  {headCell.icon}
                                </div>
                                ):""
                                }
                                <div className="cellLayout">
                                  <div className="cellTitle">
                                  {row[headCell.field]}
                                  </div>
                                  <div  className="cellSubTitle">
                                    {row[headCell.subfield]}
                                  </div>
                                </div>
                              </div>  
                              ):(<div className="cellLayout"><div className="{headCell.class}">{row[headCell.field]}</div></div>)}
                            </TableCell>
                            ))
                          ):""                          
                          ))
                      )

                      return (
                        <TableRow
                          hover
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={"tblRow_"+row[this.state.tableAttr.uniqueBy]}
                          selected={isItemSelected}
                        >
                          {mycol}
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (this.state.tableAttr.dense ? 33 : 53) * emptyRows }}>
                      <TableCell key="emptyRow" colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
      );
  }

  createTableBtn=(btn,row)=>{
      console.log("mycek btn",btn);
      
      var listBtn = btn.map(function (dt,index) {
        let setClick=()=>{console.log("btn clickd","user clicked "+dt.title)};
        if(dt.action && typeof dt.action === 'function'){
            setClick=(event)=>{dt.action(row,event)}
        }

        return (
          <Button key={"tblbtn"+index} className={dt.class} onClick={setClick}>{dt.icon}{dt.title}</Button>
        );
      })

      return (
          <ButtonGroup size="small" color="secondary">
           {listBtn}
          </ButtonGroup>
        );

  }


  CreateTable=(props)=>{
    const { uniqueBy,ColumnHead,RowsData,setSelected,RowsAmount,activePage,onSortChange,onPageChange,onCheckedChange,defaultOrderBy,defaultOrder,dafaultRowsPerPage,dafaultListrowsPerPage } = props;

    const createChangePageHandler = (event,newPage) => {
      let data=this.handleChangePage(event,newPage);
      onPageChange(data,event);
    };

    const createChangePaginationHandler = (event,newPage) => {
      let data=this.handleChangePage(event,(newPage-1));
      onPageChange(data,event);
    };

    const createRowsPerPageHandler = (event) => {
      let data=this.handleChangeRowsPerPage(event);
      onPageChange(data,event);
    };

    const createSelectAllHandler = (event,selectOn) => {
      let data=this.handleSelectAllClick(event,selectOn);
      if(onCheckedChange && typeof onCheckedChange === 'function'){
        onCheckedChange(data,event);
      }
    };

    if(activePage!=undefined) this.state.tableAttr.page=activePage;

    if(uniqueBy!=undefined && uniqueBy!='') this.state.tableAttr.uniqueBy=uniqueBy;

    if(setSelected!=undefined && setSelected.length>0) this.state.tableAttr.selected=setSelected;

    this.state.rows=RowsData;  
    let columns = ColumnHead;

    let sortChange=onSortChange;
    let pageChange=onPageChange;

    let rowslength=this.state.rows.length;
    if(RowsAmount!=undefined) rowslength=RowsAmount; 

    if(defaultOrderBy!=undefined && typeof defaultOrderBy=='string') this.state.tableAttr.orderBy=defaultOrderBy;
    if(defaultOrder!=undefined && typeof defaultOrder=='string') this.state.tableAttr.order=defaultOrder;
    if(dafaultRowsPerPage!=undefined) this.state.tableAttr.rowsPerPage=dafaultRowsPerPage;
    if(dafaultListrowsPerPage!=undefined) this.state.tableAttr.listrowsPerPage=dafaultListrowsPerPage;

      let paginationCount=Math.ceil(rowslength/this.state.tableAttr.rowsPerPage);

      const classes = this.useTableStyles();
      
      const isSelected = (name) => this.state.tableAttr.selected.indexOf(name) !== -1;

      const emptyRows = this.state.tableAttr.rowsPerPage - Math.min(this.state.tableAttr.rowsPerPage, this.state.rows.length - this.state.tableAttr.page * this.state.tableAttr.rowsPerPage);

      const rowPerPG=(dafaultListrowsPerPage!=undefined?dafaultListrowsPerPage:this.state.tableAttr.listrowsPerPage);

      return (
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <this.EnhancedTableToolbar numSelected={this.state.tableAttr.selected.length} />
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={this.state.tableAttr.dense ? 'small' : 'medium'}
                aria-label="enhanced table"
              >
                
                <this.EnhancedTableHead
                  classes={classes}
                  headCells={columns}
                  numSelected={this.state.tableAttr.selected.length}
                  order={this.state.tableAttr.order}
                  orderBy={this.state.tableAttr.orderBy}
                  onSelectAllClick={createSelectAllHandler}
                  onRequestSort={this.handleRequestSort}
                  onSortChange={sortChange}
                  rowCount={rowslength}
                />
                
                <this.EnhancedTableBody
                  ColumnHead={ColumnHead} 
                  onCheckedChange={onCheckedChange}
                  RowsData={RowsData} 
                  dafaultRowsPerPage={dafaultRowsPerPage} />

              </Table>
            </TableContainer>
            <Grid container spacing={3}>
              
              <Grid item xs={12} sm={6}>
              <div className="myRowsPerPage">
              <div className="titleSelect">
              Show :
              </div>
              <FormControl className="mySelect" color="secondary" margin="dense" variant="outlined">
                  <Select
                    id="select_row_page"
                    value={dafaultRowsPerPage!=undefined?dafaultRowsPerPage:this.state.tableAttr.rowsPerPage}
                    onChange={createRowsPerPageHandler}
                    inputProps={{
                      name: 'select_row_page'
                    }}  
                  >
                    {rowPerPG.map((option,index) => (
                        <MenuItem key={"status_opt"+index} value={option}>{option} Rows</MenuItem>
                    ))}
                  </Select>
              </FormControl>
              </div>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div className={"pagination-right "+classes.root}>
                  <Pagination count={paginationCount} page={(this.state.tableAttr.page+1)} onChange={createChangePaginationHandler} color="secondary" />
                </div>
              </Grid>

              <Grid className="myHidden"
                   item xs={12} sm={6}>
                <TablePagination
                  rowsPerPageOptions={rowPerPG}
                  component="div"
                  count={rowslength}
                  rowsPerPage={dafaultRowsPerPage!=undefined?dafaultRowsPerPage:this.state.tableAttr.rowsPerPage}
                  page={this.state.tableAttr.page}
                  onChangePage={createChangePageHandler}
                  onChangeRowsPerPage={createRowsPerPageHandler}
                />
              </Grid>
            </Grid> 
          </Paper>
          
        </div>
      );
  }

  render() {
    return this.CreateTable;
  }

}
 
export default myTable;