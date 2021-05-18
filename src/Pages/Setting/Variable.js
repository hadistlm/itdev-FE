import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Row, Col, Card, Button, Modal, Form, Table } from 'react-bootstrap';

import moment from 'moment'

class Scheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      close: false,
      error: null,
      isLoaded: false,
      method: [{
        type: 'create',
        last_id: null
      }],
      var_name: '',
      var_text: '',
      items: []
    };

    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.retrieveData();
  }

  retrieveData(){
    fetch("http://localhost:3000/variable/list")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleCreate(){
    this.setState({
      show: true,
      method: [{
        type: 'create',
        last_id: null
      }],
      var_name:'',
      var_text:''
    })
  }

  handleEdit(id){
    const event = this;
    const SwalReact = withReactContent(Swal);

    fetch(`http://localhost:3000/variable/find/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.status == 'success') {
          // set retrieved data
          event.setState({ 
            show: true,
            method: [{
              type: 'edit',
              last_id: data.data[0].id
            }],
            var_name: data.data[0].variable_name,
            var_text: data.data[0].variable_element
          });

        }else{
          SwalReact.fire({
            icon: 'error',
            title: 'Failed',
            text: data.message
          })
        }
      });
  }

  handleSubmit(event){
    event.preventDefault();

    const state = this;
    const SwalReact = withReactContent(Swal);

    // check data validity
    if (!event.target[0].value || !event.target[1].value) {
      SwalReact.fire({
        icon: 'error',
        title: 'Not Completed',
        text: 'All the form input value is required!'
      })

      // exit
      return false;
    };

    switch (this.state.method[0].type) {
      case 'edit':
        var url = `http://localhost:3000/variable/edit/${this.state.method[0].last_id}`;
        var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            var_name: event.target[0].value, 
            var_text: event.target[1].value
          })
        };
      break;

      default:
        var url = 'http://localhost:3000/variable/create';
        var requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            var_name: event.target[0].value, 
            var_text: event.target[1].value
          })
        };
      break;
    }
    
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.result == 'success') {
          event.target[0].value = '';
          event.target[1].value = '';

          state.setState({ show: false });

          SwalReact.fire({
            icon: 'success',
            title: 'Success',
            text: data.message
          })
        }else{
          SwalReact.fire({
            icon: 'error',
            title: 'Failed',
            text: data.message
          })
        }
      })
      .then(() => state.retrieveData());
  }

  render() {
    const { error, isLoaded, items } = this.state;

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
                <h1>Variable Management</h1>
                <small>Managing your variable format for messaging</small>
              </Row>
              <div className="section-header-breadcrumb">
                <Button variant="danger" className="float-end" onClick={() => this.handleCreate()}>Add New</Button>
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
                      <div className="form-group">
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
                          <th>Variable Name</th>
                          <th>Variable Value</th>
                          <th>Last Edited</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(items).map(([key,item]) => (
                          <tr>
                            <td>{key}</td>
                            <td>{item.variable_name}</td>
                            <td>{item.variable_element}</td>
                            <td>{moment(item.updatedAt).format('lll')}</td>
                            <td><Button variant="info" onClick={() => this.handleEdit(item.id)}>Detail</Button></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        <Modal show={this.state.show} animation={true} size="lg">
          <Modal.Header>
            <Modal.Title>Add New Variable</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit} ref={f => (this.form = f)}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Variable Name</Form.Label>
                <Form.Control type="text" name="var_name" value={this.state.var_name} placeholder="Enter Variable name" onChange={e => this.setState({ var_name: e.target.value })} />
                <Form.Text className="text-muted">
                  Variable name is used to identify your element
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Variable Element</Form.Label>
                <Form.Control as="textarea" name="var_text" value={this.state.var_text} rows={3} style={{height: "100px"}} placeholder="Enter Variable value" onChange={e => this.setState({ var_text: e.target.value })}/>
                <Form.Text className="text-muted">
                  this element will showup as what you inputed above
                </Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
              Close
            </Button>
            <Button variant="primary" onClick={e => this.form.dispatchEvent(
              new Event("submit", { cancelable: true, bubbles: true })
            )}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Scheduler;