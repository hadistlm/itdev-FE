import React from 'react';
import { Link } from "react-router-dom";

import { Row, Col, Card, Button, ProgressBar } from 'react-bootstrap';

class GroupFormFinish extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'success',
      progress: 90
    };
  }

  render() {
    const { status, progress } =  this.state;

    return (
      <div>
        <Row style={{display: status !== 'failed' ? 'none' : 'flex'}} className="justify-content-md-center">
          <Col md={6}>
            <img className="img-fluid mx-auto d-block" src={`${process.env.PUBLIC_URL}/assets/icon/contact_failed.png`} alt="logo"/>
            <Card className="text-danger text-center fw-bolder" style={{ background:'#FEF1F1', fontSize:'1.2em'}}>
              <Card.Body className="p-3">
                <i className="fas fa-times-circle"></i> Oops... Something went wrong! Invalid Parameters.
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span:6, offset:5 }}>
            <Button variant="danger">Kembali</Button>
          </Col>
        </Row>

        <Row style={{display: status !== 'success' ? 'none' : 'flex'}} className="justify-content-md-center">
          <Col md={6}>
            <img className="img-fluid mx-auto d-block" src={`${process.env.PUBLIC_URL}/assets/icon/contact_success.png`} alt="logo"/>
            <h5 className="text-center mb-3">{(progress < 100) ? 'Creating contact to OCA’s database' : 'Your contact have been successfully added to OCA’s database'}</h5>
            <ProgressBar variant="danger" now={ progress } />
            <div className="float-start">Uploading your contact...</div>
            <div className="float-end">{ progress }%</div>
          </Col>

          {(progress >= 100) && (
            <Col md={{ span:6, offset:4 }} className="mt-3">
              <Button variant="danger">Lihat Grup Kontak</Button>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default GroupFormFinish;