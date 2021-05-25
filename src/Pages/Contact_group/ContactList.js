import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Card, Button, Table, Modal, InputGroup, Form, FormControl, Pagination } from 'react-bootstrap';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_edit: false,
      modal_delete: false
    };
  }

  render() {
    const { modal_edit, modal_delete } = this.state;

    return (
      <div className="main-content">
        <section className="section">
          <Row>
            <Col md={12} className="section-header" style={{marginBottom : "0px"}}>
              <Row>
                <h1>Telkomsel Jaksel</h1>
                <small>Contact List</small>
              </Row>
              <div className="section-header-breadcrumb">
                <Link to="/setting/contact/group/form" style={{textDecoration : 'none'}}>
                  <div className="d-grid">
                    <Button variant="danger" size="lg">
                      <i className="fas fa-plus"></i> New Contact
                    </Button>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
          
          <Row className="section-header">
            <Col md={12}>
              <Card>
                <Card.Body className="p-2">
                  <Row>
                    <Col md={{ span: 3, offset: 9 }}>
                      <InputGroup className="mb-3">
                        <FormControl placeholder="Search" style={{borderRightColor:'#fff'}}/>
                        <InputGroup.Append>
                          <InputGroup.Text><i className="fas fa-search"></i></InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th style={{width:'50px'}}>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </th>
                          <th>Name</th>
                          <th>Phone Number</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div class="form-check">
                              <input class="form-check-input" type="checkbox" value="" />
                            </div>
                          </td>
                          <td>Oy</td>
                          <td>0859555199</td>
                          <td>oy.yo@gmail.com</td>
                          <td>
                            <i className="fas fa-pencil-alt" style={{fontSize: '1.5em', paddingRight: '10px', cursor:'pointer'}} onClick={(e) => this.setState({modal_edit:true})}></i>{' '}
                            <i className="far fa-trash-alt" style={{fontSize: '1.5em', paddingRight: '10px', cursor:'pointer'}} onClick={(e) => this.setState({modal_delete:true})}></i>{' '}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column md={2}>
                  Show : 
                </Form.Label>
                <Col md={10}>
                  <Form.Control as="select" size="sm" custom>
                    <option value="10">10 Rows</option>
                    <option value="15">15 Rows</option>
                    <option value="25">25 Rows</option>
                  </Form.Control>
                </Col>
              </Form.Group>
            </Col>
            <Col md={{ span:4, offset:3}} className="d-flex flex-row-reverse">
              <Pagination>
                <Pagination.Item key={1} active={true}>
                  {1}
                </Pagination.Item>
                <Pagination.Item key={2}>
                  {2}
                </Pagination.Item>
                <Pagination.Item key={3}>
                  {3}
                </Pagination.Item>
                <Pagination.Item key={4}>
                  {4}
                </Pagination.Item>
                <Pagination.Item key={5}>
                  {5}
                </Pagination.Item>
              </Pagination>
            </Col>
          </Row>
        </section>

        <Modal show={modal_edit}>
          <Form>
            <Modal.Header>
              <Modal.Title>Contact Detail</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value="Oy"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter phone number" value="0859555199"/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value="oy.yo@gmail.com"/>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer style={{ display:"block" }}>
              <Row>
                <Col md={6} className="d-grid">
                  <Button variant="outline-danger" onClick={(e) => this.setState({modal_edit:false})}>Close</Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button variant="secondary" onClick={(e) => this.setState({modal_edit:false})}>Save changes</Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={modal_delete}>
          <Form>
            <Modal.Body className="mt-3 pb-0">
              <h4 className="text-center">Remove 1 Contact?</h4>
              <p className="text-center">The selected item will be removed from  your contact list.</p>
            </Modal.Body>

            <Modal.Footer style={{ display:"block" }}>
              <Row>
                <Col md={6} className="d-grid">
                  <Button variant="outline-danger" onClick={(e) => this.setState({modal_delete:false})}>Batal</Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button variant="danger" onClick={(e) => this.setState({modal_delete:false})}>Hapus</Button>
                </Col>
              </Row>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ContactList;