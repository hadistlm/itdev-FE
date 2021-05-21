import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Table, Form } from 'react-bootstrap';

class GroupFormReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      result: null
    };
  }

  render() {
    const { type } = this.state;

    return (
      <div>
        <Row>
          <Col md={7}>
            <h5>Total Contacts: 2</h5>
            <p>This preview shows only 5 contacts from the total contacts that will be uploaded</p>
          </Col>
          <Col md={12}>
            <Table responsive className="border">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Rani</td>
                  <td>0859555199</td>
                  <td>rani@gmail.com</td>
                </tr>
                <tr>
                  <td>Joni</td>
                  <td>0859555199</td>
                  <td>joni@gmail.com</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col md={12} className="mt-3">
            <h5 className="text-danger">Where do you want to save those contacts?</h5>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="type_add" id="radio-1" value="new" onChange={(e) => {this.setState({type:'new'})}}/>
              <label className="form-check-label" htmlFor="radio-1">
                Create new contact group
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="type_add" id="radio-2" value="exist" onChange={(e) => {this.setState({type:'exist'})}}/>
              <label className="form-check-label" htmlFor="radio-2">
                Add to existing contact group
              </label>
            </div>
          </Col>
          <Col md={5} className="mt-2">
            {type == 'new' && (
              <Form.Group>
                <Form.Label>Contact Group Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter Group Name" />
              </Form.Group>
            )}
            {type == 'exist' && (
              <Form.Group>
                <Form.Label>Choose contact group</Form.Label>
                <Form.Control as="select" defaultValue="Choose a group">
                  <option disabled>Choose a group</option>
                  <hr/>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default GroupFormReview;