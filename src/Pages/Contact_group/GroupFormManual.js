import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Button, Table, Form, Modal } from 'react-bootstrap';

class GroupFormManual extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      input: null
    };
  }

  render() {
    const { show } = this.state;
    return (
      <div>
        <Row>
          <Col md={{span:2,offset:10}} className="mb-2">
            <Button variant="outline-info" className="float-end">Insert new row</Button>
          </Col>
          
          <Col md={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{width:'20px'}}></th>
                  <th style={{width:'150px'}}>Name</th>
                  <th style={{width:'150px'}}>Phone Number</th>
                  <th style={{width:'150px'}}>
                    <Row>
                      <Col md={10} className="p-0">
                        <select className="form-select" defaultValue="Choose a Field">
                          <option disabled>Choose a Field</option>
                          <hr/>
                          <option value="1">Collect Number</option>
                          <option value="2">Email</option>
                          <option value="3">Nomor Indihome</option>
                          <option value="3">Record Speech</option>
                        </select>
                      </Col>
                      <Col md={1} className="p-1" onClick={(e) => {this.setState({show:true})}}>
                        <i className="fas fa-plus-circle text-success" style={{fontSize:'2em', 'cursor':'pointer'}}></i>
                      </Col>
                    </Row>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                  </td>
                  <td contentEditable="true" suppressContentEditableWarning={true}>Mark</td>
                  <td contentEditable="true" suppressContentEditableWarning={true}>Otto</td>
                  <td contentEditable="true" suppressContentEditableWarning={true}>@mdo</td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                  </td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value=""/>
                    </div>
                  </td>
                  <td colSpan="2">Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Create Additional Field</Modal.Title>
            <Button variant="light" className="btn-close" onClick={(e) => {this.setState({show:false})}}></Button>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={8}>
                <Form.Group controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" />
              </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="formGridPassword">
                <Form.Label>Type</Form.Label>
                <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>Input</option>
                </Form.Control>
              </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={(e) => {this.setState({show:false})}}>
              Batal
            </Button>
            <Button variant="secondary" onClick={(e) => {this.setState({show:false})}}>
              Tambah
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default GroupFormManual;