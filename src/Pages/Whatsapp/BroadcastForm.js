import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Card, Form, Button } from 'react-bootstrap';

class BroadcastForm extends React.Component {
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
                <h1>Form Campaign</h1>
                <small>Make Form Campaign to Broadcast your campaign!</small>
              </Row>
              <div className="section-header-breadcrumb">
                <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
                <div className="breadcrumb-item"><a href="#">Whatsapp</a></div>
                <div className="breadcrumb-item">Broadcast</div>
              </div>
            </Col>
          </Row>
           
          <Form> 
            <Row>
              <Col xs={12}>
                <Card>
                  <Card.Header className="pl-2" style={{minHeight : '50px', paddingLeft : '20px'}}><h5 className="m-0">General Setting</h5></Card.Header>
                  <Card.Body className="p-2">
                    <Row>
                      <Col xs={6}>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={4} className="text-center">
                            Campaign name *:
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control type="text" placeholder="Enter Campaign Name" />
                            <Form.Text className="text-muted">
                              Please enter your Campaign name.
                            </Form.Text>
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={4} className="text-center">
                            Contact Group *:
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control type="text" placeholder="e.g Costumer Group" />
                            <Form.Text className="text-muted">
                              Please enter your contact name<br/>
                              <span className="text-danger">Contact Group Is Required</span>
                            </Form.Text>
                          </Col>
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={3} className="text-center">
                            Message Type *:
                          </Form.Label>
                          <Col sm={8}>
                            <Form.Control as="select">
                              <option>Select one category</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                              Please choose your message type.
                            </Form.Text>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Card>
                  <Card.Header className="pl-2" style={{minHeight : '50px', paddingLeft : '20px'}}>
                    <h5 className="m-0">FAIL OVER SETTINGS</h5>
                  </Card.Header>
                  <Card.Body className="p-2">
                    <Row>
                      <Col xs={12}>
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                          <Form.Label column sm={2} className="text-center">
                            Choose channel *:
                          </Form.Label>
                          <Col sm={4}>
                            <Form.Control as="select">
                              <option>Select one category</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Form.Control>
                            <Form.Text className="text-muted">
                              Please choose your message type.
                            </Form.Text>
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>

          <Row className="mb-5">
            <Col xs={4}>
              <Link to="/whatsapp/broadcast" style={{textDecoration : 'none'}}>
                <div class="d-grid">
                  <Button variant="outline-secondary" size="lg">
                    <i class="fas fa-arrow-left"></i> Back To Campaign List
                  </Button>
                </div>
              </Link>
            </Col>
            <Col xs={{ span: 4, offset: 4 }}>
              <div class="d-grid">
                <Button variant="danger" size="lg">
                  Create Campaign
                </Button>
              </div>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default BroadcastForm;