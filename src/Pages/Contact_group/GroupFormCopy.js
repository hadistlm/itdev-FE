import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Form } from 'react-bootstrap';

class GroupFormCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_data: null
    };
  }

  getUploadParams(params){
    return { url: 'https://httpbin.org/post' }
  }

  handleChangeStatus(params){

  }

  handleSubmit(params){

  }

  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
          Paste your contact information from Spreadsheet / Excel to this field. maximum of 200 contacts per upload using this method
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={12}>
            <Form.Group>
              <Form.Control as="textarea" style={{height: "150px"}} />
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GroupFormCopy;