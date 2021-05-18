import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Card, Button, Table } from 'react-bootstrap';

class Broadcast extends React.Component {
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
              <h1>Whatsapp Campaign</h1>
              <small>Remaining Quota: 10 | Expired on 8th June 2021</small>
            </Row>
            <div className="section-header-breadcrumb">
              <Link to="/whatsapp/broadcast/form" style={{textDecoration : 'none'}}>
                <div class="d-grid">
                  <Button variant="danger" size="lg">
                    <i class="fas fa-plus"></i> Create Campaign
                  </Button>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
          
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body className="p-2">
                  <Row>
                    <Col md={2}>
                      <div className="form-group">
                        <select className="form-control form-control-sm">
                          <option>All</option>
                          <option>Preparation</option>
                          <option>Processing</option>
                          <option>Failed</option>
                          <option>Finish</option>
                        </select>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div class="form-group">
                        <input type="date" className="form-control" />
                      </div>
                    </Col>

                    <Col md={{ span: 1, offset: 5 }}>
                      <div className="form-group">
                        <select className="form-control form-control-sm">
                          <option>10</option>
                          <option>15</option>
                          <option>25</option>
                        </select>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="form-group">
                        <input type="text" placeholder="Search ..." className="form-control" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Campaign Name</th>
                          <th>Contact Group</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>TEst</td>
                          <td>TEst</td>
                          <td>TEst</td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>TEst</td>
                          <td>TEst</td>
                          <td>TEst</td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>TEst</td>
                          <td>TEst</td>
                          <td>TEst</td>
                        </tr>
                      </tbody>
                    </Table>
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

export default Broadcast;