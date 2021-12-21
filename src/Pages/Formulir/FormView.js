import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import { Row, Col, Card, Button, Form } from 'react-bootstrap';

class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provinces: [],
      kota: [],
      kecamatan: [],
      Kelurahan: [],
      selectedProvince: {id:null, value: null},
      selectedCities: {id:null, value: null},
      selectedKecamatan: {id:null, value: null},
      selectedKelurahan: {id:null, value: null}
    };
  }

  componentDidMount() {
    fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`)
      .then(response => response.json())
      .then(result => {
        const remap = result.map(list => ({
          "value" : list.id,
          "label" : list.name
        }));
        this.setState({provinces: remap});
      });
  }

  async handleProvinceChange(selected){
    if(selected){
      this.setState({selectedProvince: {id: selected.id, value: selected.value}});

      fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selected.value}.json`)
        .then(response => response.json())
        .then(result => {
          const remap = result.map(list => ({
            "value" : list.id,
            "label" : list.name
          }));
          this.setState({kota: remap});
        });
    }else{
      this.setState({
        selectedProvince: {id:null, value: null},
        selectedCities: {id:null, value: null},
        selectedKecamatan: {id:null, value: null},
        selectedKelurahan: {id:null, value: null},
        kota : [],
        kecamatan : [],
        Kelurahan : [],
      });
    };
  }

  async handleCityChange(selected){
    if(selected){
      this.setState({selectedCities: {id: selected.id, value: selected.value}});

      fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/districts/${selected.value}.json`)
        .then(response => response.json())
        .then(result => {
          const remap = result.map(list => ({
            "value" : list.id,
            "label" : list.name
          }));
          this.setState({kecamatan: remap});
        });
    }else{
      this.setState({
        selectedCities: {id:null, value: null},
        selectedKecamatan: {id:null, value: null},
        selectedKelurahan: {id:null, value: null},
        kecamatan : [],
        Kelurahan : [],
      });
    };
  }

  async handleKecamatanChange(selected){
    if(selected){
      this.setState({selectedKecamatan: {id: selected.id, value: selected.value}});

      fetch(`http://www.emsifa.com/api-wilayah-indonesia/api/villages/${selected.value}.json`)
        .then(response => response.json())
        .then(result => {
          const remap = result.map(list => ({
            "value" : list.id,
            "label" : list.name
          }));
          this.setState({Kelurahan: remap});
        });
    }else{
      this.setState({
        selectedKecamatan: {id:null, value: null},
        selectedKelurahan: {id:null, value: null},
        Kelurahan : [],
      });
    };
  }

  async handleKelurahanChange(selected){
    if(selected){
      this.setState({ selectedKelurahan: {id: selected.id, value: selected.value} });
    }else{
      this.setState({ selectedKelurahan: {id:null, value: null} });
    };
  }

  render() {
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
                <h1>Formulir data</h1>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col className="pe-0">
              <Card>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nama</Form.Label>
                      <Form.Control type="text" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>NIK</Form.Label>
                      <Form.Control type="number" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Nomor Kartu Keluarga</Form.Label>
                      <Form.Control type="number" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Umur</Form.Label>
                      <Form.Control type="number" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Jenis Kelamin</Form.Label>
                      <Row>
                        <Col>
                          <Form.Check
                          inline
                          label="Laki-Laki"
                          name="gender"
                          type="radio"
                        />
                        <Form.Check
                          inline
                          label="Perempuan"
                          name="gender"
                          type="radio"
                        />
                        </Col>
                      </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Provinsi</Form.Label>
                      <Select 
                        isClearable 
                        options={this.state.provinces}
                        value={this.state.selectedProvince.id}
                        onChange={this.handleProvinceChange.bind(this)}
                      />
                    </Form.Group>
                    {this.state.selectedProvince.value && (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Kab/Kota</Form.Label>
                        <Select
                          isClearable
                          options={this.state.kota}
                          value={this.state.selectedCities.id}
                          onChange={this.handleCityChange.bind(this)}
                        />
                      </Form.Group>
                    )}
                    {this.state.selectedCities.value && (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Kecamatan</Form.Label>
                        <Select
                          isClearable 
                          options={this.state.kecamatan}
                          value={this.state.selectedKecamatan.id}
                          onChange={this.handleKecamatanChange.bind(this)}
                        />
                      </Form.Group>
                    )}
                    {this.state.selectedKecamatan.value && (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Kelurahan/Desa</Form.Label>
                        <Select 
                          isClearable 
                          options={this.state.Kelurahan}
                          value={this.state.selectedKelurahan.id}
                          onChange={this.handleKelurahanChange.bind(this)}
                        />
                      </Form.Group>
                    )}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>RT</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>RW</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Alamat</Form.Label>
                      <Form.Control as="textarea" rows={5} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Penghasilan Sebelum Pandemi</Form.Label>
                      <Form.Control type="number" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Penghasilan Setelah Pandemi</Form.Label>
                      <Form.Control type="number" placeholder="Enter email" />
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Alasan Membutuhkan Bantuan</Form.Label>
                      <Select options={[
                          { value: 'chocolate', label: 'Chocolate' },
                          { value: 'strawberry', label: 'Strawberry' },
                          { value: 'vanilla', label: 'Vanilla' }
                        ]}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut." />
                    </Form.Group>
                  </Form>
                </Card.Body>
                <hr/>
                <Card.Footer>
                  <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Link to={"/"}><Button variant="light">Back</Button></Link> {' '}
                    <Button variant="danger" type="submit">
                      Kirim data
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default FormView;