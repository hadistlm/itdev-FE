import React from 'react';
import { Link } from "react-router-dom";
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

import { Row, Col, Card, Button } from 'react-bootstrap';

class TestingHandson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Handsontable.helper.createSpreadsheetData(10, 10),
      dropdownMenu: ['alignment','---------','filter_by_condition','---------','filter_by_value','---------','filter_action_bar'],
      columnsDef: [
        { data: 1, type: "text", readOnly: true },
        { data: 2, type: "text", readOnly: true },
        { data: 3, type: "text", readOnly: true },
        { data: 4, type: "text"},
        { data: 5, type: "text"},
        { data: 6, type: "text"},
        { data: 7, type: "text" },
        { data: 8, type: "text" },
        { data: 9, type: "text" },
        { data: 12, type: "date", allowInvalid: false },
        { data: 13, type: "numeric", allowInvalid: false }
      ]
    };
  }

  exportdata(){
    console.log(this.state.data);
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
                <h1>Testing Handsontable</h1>
                <small>Remaining Quota: 10 | Expired on 8th June 2021</small>
              </Row>
            </Col>
          </Row>
          
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body className="p-2">
                  <Row>
                    <Col xs={12}>
                      <Button variant="danger" size="md" style={{marginBottom : "10px", float: "right"}} onClick={this.exportdata.bind(this)}>Export</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <HotTable
                        data={this.state.data}
                        columns={this.state.columnsDef}
                        allowInsertColumn={false}
                        allowRemoveColumn={false}
                        dropdownMenu={this.state.dropdownMenu}
                        hiddenColumns={{indicators: true}}
                        contextMenu={true}
                        multiColumnSorting={true}
                        filters={true}
                        rowHeaders={true}
                        manualRowMove={true}
                        colHeaders={true}
                        rowHeaders={true}
                        manualColumnResize={true}
                        stretchH={'all'}
                        height='auto'
                        licenseKey="non-commercial-and-evaluation"
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default TestingHandson;