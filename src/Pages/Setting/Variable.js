import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Row, Col, Card, Button, Modal, Form, Table } from 'react-bootstrap';

import ApiHandler from '../../Helper/ApiHandler';
import Pagination from '../../Helper/Pagination';

class Scheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      perPage: 10,
      currentPage: null, 
      totalPages: null,
      show: false,
      isLoaded: false,
      method: [{
        type: 'create',
        last_id: null
      }],
      var_name: '',
      var_text: '',
      items: [],
      items_total: 0
    };

    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.retrieveData();
  }

  retrieveData(){
    const data = new ApiHandler()
      .get('/variable/list', {
        perpage: this.state.perPage,
        page: this.state.page
      })
      .then((response) => {
        if (response.statusCode == 200) {
          let result = response.body.data;

          this.setState({
            isLoaded: true,
            items: result.rows,
            items_total: result.count
          });
        }else{
          this.setState({
            isLoaded: true,
            response
          });
        }
      })
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

  handleTable(event){
    const lengthPages = Math.ceil(this.state.items_total / event.target.value);

    this.setState({ 
      page : (this.state.page > lengthPages) ? 1 : this.state.page,
      [event.target.name] : event.target.value
    }, () => {
      this.retrieveData();
    });
  }

  onPageChanged(data){
    const { currentPage, totalPages, pageLimit } = data;

    this.setState({ page : currentPage }, () => {
      this.retrieveData();
    });
  }

  render() {
    const { isLoaded, page, perPage, items, items_total } = this.state;
    let number = ((page - 1) * perPage) + 1;

    if (!isLoaded || items_total === 0) return null;

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
                <h1>Variable Management</h1>
                <small>Managing your variable format for messaging</small>
              </Row>
              <div className="section-header-breadcrumb">
                <Button variant="danger" className="float-end" onClick={() => this.handleCreate()}>Add New</Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <Card.Body className="p-2">
                  <Row>
                    <Col md={{ span: 1, offset: 9 }}>
                      <div className="form-group">
                        <select name="perPage" value={this.state.perPage} onChange={this.handleTable.bind(this)} className="form-control form-control-sm">
                          <option value='10'>10</option>
                          <option value='25'>25</option>
                          <option value='50'>50</option>
                          <option value='100'>100</option>
                        </select>
                      </div>
                    </Col>
                    <Col md={2}>
                      <Form.Group>
                        <Form.Control type="text" placeholder="Search ..." />
                      </Form.Group>
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
                            <td>{number++}</td>
                            <td>{item.variable_name}</td>
                            <td>{item.variable_element}</td>
                            <td>{moment(item.updatedAt).format('lll')}</td>
                            <td><Button variant="info" onClick={() => this.handleEdit(item.id)}>Detail</Button></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <Col md={12} className="d-flex flex-row-reverse">
                      <Pagination totalRecords={items_total} pageLimit={Number(perPage)} pageNeighbours={1} onPageChanged={this.onPageChanged.bind(this)} />
                    </Col>
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