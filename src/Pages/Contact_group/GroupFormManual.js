import React, { PropTypes } from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';

class GroupFormManual extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      tableHeader: [' ', 'Name', 'Phone Number'],
      columnType: ['Collect Number','Email','Nomor Indihome','Record Speech'],
      selectedData: [],
      tableData: [{
        name: '',
        phone_number:''
      }]
    };

    this.handleDataChanged = this.handleDataChanged.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return (props.onSelected.length > 0) ? {
      tableData: props.onSelected,
    } : state.tableData;
  }

  async handleSelected(){
    const { selectedData, tableData } = this.state;
    const whitelist = tableData.filter((i,k) => !selectedData.includes(k));

    await this.setState({
      selectedData: [],
      tableData: (whitelist.length < 1) ? [{
        name: '',
        phone_number:''
      }] : whitelist
    });

    // send back data
    this.handleDataChanged();
  }

  handleRow(){
    let { tableData, tableHeader } = this.state;
    let tempHeader = [...tableHeader],
        tmpHolder = {};

    // remove first object data record
    tempHeader.shift()

    // make the available header list
    tempHeader.map(value => {
      Object.assign(tmpHolder, { [value.toLowerCase().replaceAll(" ", "_")]: '' });
    })

    // update state data
    tableData.push(tmpHolder);

    // re-render element
    this.forceUpdate();
  }

  handleField(event){
    const selected = this.refs.addtional_field.value;
    let { 
      columnType, 
      tableHeader,
      tableData
    } = this.state;

    switch (event) {
      case 'delete':
        if (tableHeader.slice(-1)[0] !== 'Phone Number') {
          tableHeader.pop();

          // delete object properties
          tableData.map((v,k) => {
            delete tableData[k][columnType[selected]]
          });

          // re-render element
          this.forceUpdate();
        }
      break;

      case 'add':
      default:
        if (typeof columnType[selected] !== 'undefined' && !tableHeader.includes(columnType[selected])) {
          tableHeader.push(columnType[selected]);
          // add new object properties
          tableData.map((v,k) => {
            tableData[k][columnType[selected]] = ''
          });
          // re-render element
          this.forceUpdate();
        }
      break;
    }
  }

  handleSubmit(event){
    event.preventDefault();
    // retrieve list of column Type
    let list = this.state.columnType;
    // push new column data
    if (this.refs.column_name.value) {
      list.push(this.refs.column_name.value);
    }
    // close modal
    this.setState({show:false});
  }

  handleInputChange(index, event){
    const status = event.target.checked;

    if (status && !this.state.selectedData.includes(index)) {
      this.state.selectedData.push(index)
    }else{
      this.state.selectedData.splice(this.state.selectedData.indexOf(index), 1);
    }
  }

  handleContent(columnName, rowIndex, event){
    const { tableData } = this.state;
    const selectedColumn = columnName.toLowerCase().replaceAll(" ", "_");

    tableData[rowIndex][selectedColumn] = event.target.textContent;

    // send back data
    this.handleDataChanged();
  }

  handleDataChanged(){
    const { tableData } = this.state;

    this.props.onChanged(tableData);
  }

  render() {
    const { show, tableHeader, tableData, columnType } = this.state;

    return (
      <div>
        <Row>
          <Col md={{span:8,offset:4}} className="mb-2">
            <Button variant="outline-success" className="float-end" style={{marginLeft:'5px'}} onClick={(e) => {this.setState({show:true})}}>Create New Field</Button>
            <Button variant="outline-info" className="float-end" style={{marginLeft:'5px'}} onClick={this.handleRow.bind(this)}>Insert new row</Button>
            <Button variant="outline-danger" className="float-end" onClick={this.handleSelected.bind(this)}>Delete selected row</Button>
          </Col>
          
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  {tableHeader.map((value, key) => (
                    <th key={key} style={{width: (key < 1) ? '20px' : '150px'}}>{value}</th>
                  ))}
                  <th style={{width:'25%'}}>
                    <Row>
                      <Col md={2} className="p-1" onClick={this.handleField.bind(this, 'delete')}>
                        <i className="fas fa-minus-circle text-danger" style={{fontSize:'2em', 'cursor':'pointer'}}></i>
                      </Col>
                      <Col md={8} className="p-0">
                        <select ref="addtional_field" className="form-select" defaultValue="Choose a Field">
                          <option disabled>Choose a Field</option>
                          <option disabled>──────────</option>
                          {columnType.map((value, key) => (
                            <option key={key} value={columnType.indexOf(value)}>{value}</option>
                          ))}
                        </select>
                      </Col>
                      <Col md={1} className="p-1" onClick={this.handleField.bind(this, 'add')}>
                        <i className="fas fa-plus-circle text-success" style={{fontSize:'2em', 'cursor':'pointer'}}></i>
                      </Col>
                    </Row>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  if (tableData.length > 0) {
                    return (
                      tableData.map((tableInside, tableKey) => (
                        <tr key={tableKey}>
                          <td>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" onChange={this.handleInputChange.bind(this, tableKey)}/>
                            </div>
                          </td>
                          {tableHeader.map((value, key) => (
                            (key === 0) || <td key={key} contentEditable="true" suppressContentEditableWarning={true} onBlur={this.handleContent.bind(this, value, tableKey)}>{tableInside[value.toLowerCase().replace(" ", "_")]}</td>
                          ))}
                        </tr>
                      ))
                    )
                  } else {
                    return (
                      <tr>
                        {tableHeader.map((value, key) => (
                          (key < 1) ? 
                          <td key={key}>
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" onChange={this.handleInputChange.bind(this, {key})}/>
                            </div>
                          </td> : 
                          <td key={key} contentEditable="true" suppressContentEditableWarning={true} onBlur={this.handleContent.bind(this, value, 0)}></td>
                        ))}
                      </tr>
                    )
                  }
                })()}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal show={show}>
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <Modal.Header>
              <Modal.Title>Create Additional Field</Modal.Title>
              <Button variant="light" className="btn-close" onClick={(e) => {this.setState({show:false})}}></Button>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={8}>
                  <Form.Group controlId="formGridEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref="column_name" placeholder="Enter name" />
                </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="formGridPassword">
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select" ref="column_type" defaultValue="Choose...">
                    <option>Choose...</option>
                    <option>Text</option>
                  </Form.Control>
                </Form.Group>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-danger" onClick={(e) => {this.setState({show:false})}}>
                Batal
              </Button>
              <Button type="submit" variant="secondary">
                Tambah
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default GroupFormManual;