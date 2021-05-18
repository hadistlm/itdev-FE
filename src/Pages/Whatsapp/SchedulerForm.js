import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Card, Form, Table, Button, Modal } from 'react-bootstrap';

class SchedulerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      close: false
    };
  }

  render() {
    return (
      <div className="main-content">
        <section className="section">
          <Row>
            <Col md={1}>
              <div className="card card-statistic-1">
                <div className="card-icon bg-danger" style={{width: "65%"}}>
                  <i className="far fa-user"></i>
                </div>
              </div>
            </Col>
            <Col md={11} className="section-header" style={{marginBottom : "35px"}}>
              <Row>
                <h1>Add Whatsapp Broadcast</h1>
                <small>Add new whatsapp broadcasts to allow your customers to be updated</small>
              </Row>
              <div className="section-header-breadcrumb">
                
              </div>
            </Col>
          </Row>
           
          <Form> 
            <Row>
              <Col md={12}>
                <Card>
                  <Card.Header className="pl-2" style={{minHeight : '50px', paddingLeft : '20px'}}><h5 className="m-0">General Setting</h5></Card.Header>
                  <Card.Body className="p-2">
                    <Row>
                      <Col md={6}>
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
                      <Col md={6}>
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
              <Col md={12}>
                <Card>
                  <Card.Header className="pl-2" style={{minHeight : '50px', paddingLeft : '20px'}}>
                    <h5 className="m-0">Fail Over Settings</h5>
                  </Card.Header>
                  <Card.Body className="p-2">
                    <Row>
                      <Col md={12}>
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

            <Row>
              <Col md={12}>
                <Card>
                  <Card.Header className="pl-2" style={{minHeight : '50px', paddingLeft : '20px'}}>
                    <h5 className="m-0">Schedule Settings</h5>
                  </Card.Header>
                  <Card.Body className="p-2">
                    <Row>
                      <Col md={4}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Select Date</Form.Label>
                          <Form.Control type="date" placeholder="Enter Date" />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Set Daily Max Operation Time</Form.Label>
                          <Row>
                            <Col md={3}><Form.Control type="text" placeholder="HH" /></Col>
                            <Col md={1}><h4 className="pt-1">:</h4></Col>
                            <Col md={3}><Form.Control type="text" placeholder="MM" /></Col>
                          </Row>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Ended Time Type</th>
                              <th>Start at</th>
                              <th>End at</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan="4" className="text-center">No Data</td>
                            </tr>
                          </tbody>

                          <tfoot>
                            <tr>
                              <td colSpan="4" className="text-center">
                                <Row>
                                  <span className="mt-3">Click the button below to add start and end time of your voice broadcast, you can also add multiple time in single day</span>
                                  <Col md={{ span: 2, offset:5 }} className="mt-1 mb-3">
                                    <div class="d-grid gap-2">
                                      <Button variant="danger" onClick={() => this.setState({ show: true })}><i class="far fa-clock"></i> Add Time</Button>
                                    </div>
                                  </Col>
                                </Row>
                               </td>
                            </tr>
                          </tfoot>
                        </Table>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>

          <Row className="mb-5">
            <Col md={4}>
              <Link to="/whatsapp/scheduler" style={{textDecoration : 'none'}}>
                <div class="d-grid">
                  <Button variant="outline-secondary" size="lg">
                    <i class="fas fa-arrow-left"></i> Back To Whatsapp Scheduler
                  </Button>
                </div>
              </Link>
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
              <div class="d-grid">
                <Button variant="danger" size="lg">
                  <i class="far fa-save"></i> Start Broadcast
                </Button>
              </div>
            </Col>
          </Row>
        </section>

        <Modal show={this.state.show} animation={true}>
          <Modal.Header>
            <Modal.Title>Add Time</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
              Close
            </Button>
            <Button variant="danger" onClick={() => this.setState({ show: false })}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SchedulerForm;