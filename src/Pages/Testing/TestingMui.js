import React from 'react';
import { Link } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

import { Row, Col, Card, Button } from 'react-bootstrap';

class TestingMui extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns:[
        { 
          field: 'id',
          headerName: 'ID',
          width: 90
        },{
          field: 'firstName',
          headerName: 'First name',
          width: 150,
          editable: true,
          filterable: true,
        },{
          field: 'lastName',
          headerName: 'Last name',
          width: 150,
          editable: true,
          filterable: true,
        },{
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 110,
          editable: true,
          filterable: false,
        },{
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          filterable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''}`,
        },
      ],
      rows: [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ]
    };
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
                  <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                      rows={this.state.rows}
                      columns={this.state.columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                      disableColumnSelector
                    />
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

export default TestingMui;