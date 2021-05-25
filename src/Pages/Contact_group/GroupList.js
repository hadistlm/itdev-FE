import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Card, Button, Table, InputGroup, Form, FormControl, Pagination } from 'react-bootstrap';

class GroupList extends React.Component {
  render() {
    return (
      <div className="main-content">
        <section className="section">
          <Row>
            <Col md={12} className="section-header" style={{marginBottom : "0px"}}>
              <Row>
                <h1>Contact Group</h1>
                <small>Make Contact Group to Broadcast your campaign!</small>
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
                          <th>Contact Group</th>
                          <th>Date Modified</th>
                          <th>Total</th>
                          <th>Status Upload</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Telkomsel Jaksel</td>
                          <td>05 May 2021 08:28</td>
                          <td>12</td>
                          <td className="text-center">
                            <div className="d-grid">
                              <Button variant="outline-success" style={{borderRadius:'15px'}}>Selesai</Button>
                            </div>
                          </td>
                          <td>
                            <i className="far fa-eye" style={{fontSize: '1.5em', paddingRight: '10px'}}></i>{' '}
                            <i className="fas fa-pencil-alt" style={{fontSize: '1.5em', paddingRight: '10px'}}></i>{' '}
                            <i className="far fa-trash-alt" style={{fontSize: '1.5em', paddingRight: '10px'}}></i>{' '}
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
      </div>
    );
  }
}

export default GroupList;