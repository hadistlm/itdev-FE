import React from 'react';
import { Link } from "react-router-dom";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import { Row, Col, Card, Button } from 'react-bootstrap';

class TestingAg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData:[],
      gridColumnApi: '',
      gridApi: ''
    };
  }

  onGridReady(params){
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          rowData: data,
          gridApi: params.api,
          gridColumnApi: params.columnApi
        });
      });
  }

  render() {
    return (
      <div className="main-content">
        <section className="section">
          <Row>
            <Col xs={1}>
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger" style={{width: "65%"}}>
                  <i className="far fa-user"></i>
                </div>
              </div>
            </Col>
            <Col xs={11} className="section-header" style={{marginBottom : "35px"}}>
              <Row>
                <h1>Testing MUI</h1>
                <small>Remaining Quota: 10 | Expired on 8th June 2021</small>
              </Row>
            </Col>
          </Row>
          
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body className="p-2">
                  <div
                    id="myGrid"
                    style={{
                      height: 400,
                      width: '100%',
                    }}
                    className="ag-theme-alpine"
                  >
                    <AgGridReact
                      defaultColDef={{
                        width: 150,
                        editable: true,
                        filter: 'agTextColumnFilter',
                        floatingFilter: true,
                        resizable: true,
                        sortable: true
                      }}
                      defaultColGroupDef={{ marryChildren: true }}
                      columnTypes={{
                        numberColumn: {
                          width: 130,
                          filter: 'agNumberColumnFilter',
                        },
                        medalColumn: {
                          width: 100,
                          columnGroupShow: 'open',
                          filter: false,
                        },
                        nonEditableColumn: { editable: false },
                        dateColumn: {
                          filter: 'agDateColumnFilter',
                          filterParams: {
                            comparator: function (filterLocalDateAtMidnight, cellValue) {
                              var dateParts = cellValue.split('/');
                              var day = Number(dateParts[0]);
                              var month = Number(dateParts[1]) - 1;
                              var year = Number(dateParts[2]);
                              var cellDate = new Date(year, month, day);
                              if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                              } else if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                              } else {
                                return 0;
                              }
                            },
                          },
                        },
                      }}
                      rowData={this.state.rowData}
                      onGridReady={this.onGridReady.bind(this)}
                    >
                      <AgGridColumn headerName="Athlete" field="athlete" />
                      <AgGridColumn headerName="Sport" field="sport" />
                      <AgGridColumn headerName="Age" field="age" type="numberColumn" />
                      <AgGridColumn headerName="Year" field="year" type="numberColumn" />
                      <AgGridColumn
                        headerName="Date"
                        field="date"
                        type={['dateColumn', 'nonEditableColumn']}
                        width={220}
                      />
                      <AgGridColumn headerName="Medals" groupId="medalsGroup">
                        <AgGridColumn headerName="Gold" field="gold" type="medalColumn" />
                        <AgGridColumn
                          headerName="Silver"
                          field="silver"
                          type="medalColumn"
                        />
                        <AgGridColumn
                          headerName="Bronze"
                          field="bronze"
                          type="medalColumn"
                        />
                        <AgGridColumn
                          headerName="Total"
                          field="total"
                          type="medalColumn"
                          columnGroupShow="closed"
                        />
                      </AgGridColumn>
                    </AgGridReact>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default TestingAg;