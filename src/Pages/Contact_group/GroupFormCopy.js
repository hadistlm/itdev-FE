import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Form } from 'react-bootstrap';

import myHelper from "../../Helper/myHelper";

class GroupFormCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      tableData: props.onSelected,
    };
  }

  async handleInput(event){
    const result = myHelper.csvToArray(event.target.value);

    await this.setState({ 
      tableData:result 
    });

    this.props.onChanged(result);
  }

  render() {
    const { tableData } = this.state;

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
              <Form.Control as="textarea" defaultValue={myHelper.arrayToCSV(JSON.stringify(tableData))} style={{height: "150px"}} onInput={this.handleInput.bind(this)}/>
            </Form.Group>
          </Col>
        </Row>
      </div>
    );
  }
}

export default GroupFormCopy;