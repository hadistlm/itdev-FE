import React from 'react';
import { Link } from "react-router-dom";
import Select from 'react-select';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Formulir.css';
import { random } from 'lodash';
import { Row, Col, Card, Button, Form, Table, InputGroup, FormControl, Modal, Alert } from 'react-bootstrap';

const MySwal = withReactContent(Swal);

class FormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      tableData: [],
      alasan: ['Kehilangan pekerjaan','Kepala keluarga terdampak atau korban Covid-19','Tergolong fakir/miskin semenjak sebelum Covid-19'],
      image_KTP: '',
      image_KK: '',
      successForm: [],
      errorsForm: [],
      provinces: [],
      kota: [],
      kecamatan: [],
      kelurahan: [],
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
        kelurahan : [],
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
        kelurahan : [],
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
          this.setState({kelurahan: remap});
        });
    }else{
      this.setState({
        selectedKecamatan: {id:null, value: null},
        selectedKelurahan: {id:null, value: null},
        kelurahan : [],
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

  async handleSubmit(event){
    event.preventDefault();
    const {
      selectedProvince, 
      selectedCities, 
      selectedKecamatan, 
      selectedKelurahan,
      provinces,
      kota,
      kecamatan,
      kelurahan
    } = this.state;
    const formData = new FormData(event.target);
    const fileKTP = this.formKTP.files[0];
    const fileKK  = this.formKK.files[0];
    let errors = [];
    let result = [];

    if(!formData.get('setuju')){
      errors.push({
        index: `setuju`,
        message: `setuju Belum terisi`
      });
      
      this.setState({errorsForm: errors});

      MySwal.fire({
        icon: 'error',
        title: 'Data tidak bisa diproses',
        text: 'Harap menyetujui terlebih dahulu!'
      });
      return false;
    }

    ['Province','Cities','Kecamatan','Kelurahan'].map((arr) => {
      let selected = eval(`selected${arr}`);
      if(!selected.value){
        errors.push({
          index: `selected${arr}`,
          message: `${arr} Belum terisi`
        });
      }
      else{
        result.push({
          column: arr,
          data: selected.value
        });
      }
    });

    if(!fileKTP){
      errors.push({
        index: 'foto_ktp',
        message: `foto ktp belum terisi`
      });
    }
    else if(fileKTP && fileKTP.size > 2048000){
      errors.push({
        index: 'foto_ktp',
        message: `ukuran foto ktp melebihi batas dari 2MB`
      });
    }
    else if (fileKTP && fileKTP.size < 2048000){
      const toBase64 = (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });

      this.setState({image_KTP: await toBase64(fileKTP)});
    }

    if(!fileKK){
      errors.push({
        index: 'foto_kk',
        message: `foto kk belum terisi`
      });
    }
    else if(fileKK && fileKK.size > 2048000){
      errors.push({
        index: 'foto_ktp',
        message: `ukuran foto kk melebihi batas dari 2MB`
      });
    }
    else if (fileKK && fileKK.size < 2048000){
      const toBase64 = (file) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });

      this.setState({image_KK: await toBase64(fileKK)});
    }

    if(!formData.get('gender')){
      errors.push({
        index: 'gender',
        message: `gender belum terisi`
      });
    }
    else if(formData.get('gender')){
      result.push({
        column: 'gender',
        data: formData.get('gender')
      });
    }

    if(!formData.get('alasan')){
      errors.push({
        index: 'alasan',
        message: `alasan belum terisi`
      });
    }
    else if(formData.get('alasan') && (formData.get('alasan') == '3' && !formData.get('alasan_text'))){
      errors.push({
        index: 'alasan',
        message: `keterangan alasan lainnya perlu diisi jika terpilih`
      });
    }
    else if(formData.get('alasan') && ['0','1','2'].includes(formData.get('alasan'))){
      result.push({
        column: 'alasan',
        data: this.state.alasan[formData.get('alasan')]
      });
    }
    else if(formData.get('alasan') && (formData.get('alasan') == '3' && formData.get('alasan_text'))){
      result.push({
        column: 'alasan',
        data: formData.get('alasan_text')
      });
    }

    for (let [key, value] of formData.entries()) {
      if(!value && key != 'alasan_text'){
        errors.push({
          index: key,
          message: `${key.replace(/_/g," ")} belum terisi`
        });
      }

      if(key == 'umur' && value < 25){
        errors.push({
          index: key,
          message: `${key.replace(/_/g," ")} minimal berumur 25 tahun`
        });
      }

      if(key != 'alasan_text'){
        result.push({
          column: key.replace(/_/g," "),
          data: value
        });
      }
    }

    this.setState({errorsForm: errors, successForm: result});

    if(errors.length > 0){
      MySwal.fire({
        icon: 'warning',
        title: 'Data Belum Lengkap!',
        text: 'Harap Perhatikan kembali isian anda!'
      });
    }else{
      const processTime = random(1, 3);

      if(processTime <= 2){
        setTimeout(function() {
          this.setState({
            tableData: [{
              column: 'Nama',
              data: result.find(o => { return o.column === 'nama'}).data
            },{
              column: 'NIK',
              data: result.find(o => { return o.column === 'NIK'}).data
            },{
              column: 'Nomor Kartu Keluarga',
              data: result.find(o => { return o.column === 'NKK'}).data
            },{
              column: 'Foto KTP',
              data: this.state.image_KTP
            },{
              column: 'Foto KK',
              data: this.state.image_KK
            },{
              column: 'Umur',
              data: result.find(o => { return o.column === 'umur'}).data
            },{
              column: 'Jenis Kelamin',
              data: result.find(o => { return o.column === 'gender'}).data
            },{
              column: 'Provinsi',
              data: provinces.find(col => { return col.value === result.find(o => { return o.column === 'Province'}).data}).label
            },{
              column: 'Kota',
              data: kota.find(col => { return col.value === result.find(o => { return o.column === 'Cities'}).data}).label
            },{
              column: 'Kecamatan',
              data: kecamatan.find(col => { return col.value === result.find(o => { return o.column === 'Kecamatan'}).data}).label
            },{
              column: 'Desa/Kelurahan',
              data: kelurahan.find(col => { return col.value === result.find(o => { return o.column === 'Kelurahan'}).data}).label
            },{
              column: 'Alamat',
              data: result.find(o => { return o.column === 'alamat'}).data
            },{
              column: 'RT',
              data: result.find(o => { return o.column === 'RT'}).data
            },{
              column: 'RW',
              data: result.find(o => { return o.column === 'RW'}).data
            },{
              column: 'Penghasilan sebelum pandemi',
              data: result.find(o => { return o.column === 'penghasilan sebelum pandemi'}).data
            },{
              column: 'Penghasilan seletah pandemi',
              data: result.find(o => { return o.column === 'penghasilan setelah pandemi'}).data
            },{
              column: 'Alasan membutuhkan bantuan',
              data: result.find(o => { return o.column === 'alasan'}).data
            }], 
            show: true
          });
        }.bind(this), (processTime * 1000));
      }else{
        setTimeout(function() {
          MySwal.fire({
            icon: 'error',
            title: 'Gagal!',
            text: 'Internal server error!'
          });
        }.bind(this), (processTime * 1000));
      }
    }
  }

  render() {
    let { errorsForm, successForm, tableData } = this.state;
    let statusAge    = errorsForm.find(o => { return o.index === 'umur'});
    let statusAlasan = errorsForm.find(o => { return o.index === 'alasan'});
    let statusSetuju = errorsForm.find(o => { return o.index === 'setuju'});
    let statusKTP    = errorsForm.find(o => { return o.index === 'foto_ktp'});

    let dataNama = tableData.find(o => { return o.column === 'Nama'});
    let dataUmur = tableData.find(o => { return o.column === 'Umur'});
    let dataJK   = tableData.find(o => { return o.column === 'Jenis Kelamin'});
    let dataNIK  = tableData.find(o => { return o.column === 'NIK'});
    let dataNKK  = tableData.find(o => { return o.column === 'Nomor Kartu Keluarga'});
    let dataProv = tableData.find(o => { return o.column === 'Provinsi'});
    let dataKota = tableData.find(o => { return o.column === 'Kota'});
    let dataKeca = tableData.find(o => { return o.column === 'Kecamatan'});
    let dataKelu = tableData.find(o => { return o.column === 'Desa/Kelurahan'});
    let dataAlamat = tableData.find(o => { return o.column === 'Alamat'});
    let dataRT = tableData.find(o => { return o.column === 'RT'});
    let dataRW = tableData.find(o => { return o.column === 'RW'});

    let dataPengSebelum = tableData.find(o => { return o.column === 'Penghasilan sebelum pandemi'});
    let dataPengSesudah = tableData.find(o => { return o.column === 'Penghasilan seletah pandemi'});
    let dataAlasan = tableData.find(o => { return o.column === 'Alasan membutuhkan bantuan'});

    return (
      <>
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
                  <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label>Nama</Form.Label>
                        <Form.Control name="nama" type="text" placeholder="Masukan nama" />
                        {errorsForm.find(o => { return o.index === 'nama'}) && (
                          <Form.Text className="text-danger">
                            Data isian nama belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>NIK</Form.Label>
                        <Form.Control name="NIK" type="number" placeholder="Masukan Nomor Induk Kependudukan" />
                        {errorsForm.find(o => { return o.index === 'NIK'}) && (
                          <Form.Text className="text-danger">
                            Data isian NIK belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Nomor Kartu Keluarga</Form.Label>
                        <Form.Control name="NKK" type="number" placeholder="Masukan Nomor Kartu Keluarga" />
                        {errorsForm.find(o => { return o.index === 'NKK'}) && (
                          <Form.Text className="text-danger">
                            Data isian nomor kartu keluarga belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <label htmlFor="formKTP" className="form-label">Foto KTP</label>
                        <input ref={ref => this.formKTP = ref} className="form-control" name="foto_ktp" type="file" accept="image/*" id="formKTP" />
                        {statusKTP && (
                          <Form.Text className="text-danger">
                            Data isian {statusKTP.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <label htmlFor="formKK" className="form-label">Foto Kartu Keluarga</label>
                        <input ref={ref => this.formKK = ref} className="form-control" name="foto_kk" type="file" accept="image/*" id="formKK" />
                        {errorsForm.find(o => { return o.index === 'foto_kk'}) && (
                          <Form.Text className="text-danger">
                            Data isian foto KK belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Umur</Form.Label>
                        <Form.Control name="umur" type="number" placeholder="Masukan Umur"/>
                        {statusAge && (
                          <Form.Text className="text-danger">
                            Data Isian {statusAge.message}
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Jenis Kelamin</Form.Label>
                        <Row>
                          <Col>
                            <Form.Check
                              inline
                              label="Laki-Laki"
                              name="gender"
                              value="Laki-laki"
                              type="radio"
                              defaultChecked={false}
                            />
                            <Form.Check
                              inline
                              label="Perempuan"
                              name="gender"
                              value="Perempuan"
                              type="radio"
                              defaultChecked={false}
                            />
                          </Col>
                        </Row>
                        {errorsForm.find(o => { return o.index === 'gender'}) && (
                          <Form.Text className="text-danger">
                            Data isian Jenis kelamin belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Provinsi</Form.Label>
                        <Select 
                          isClearable 
                          options={this.state.provinces}
                          value={this.state.selectedProvince.id}
                          onChange={this.handleProvinceChange.bind(this)}
                        />
                        {errorsForm.find(o => { return o.index === 'selectedProvince'}) && (
                          <Form.Text className="text-danger">
                            Data isian Provinsi belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      {this.state.selectedProvince.value && (
                        <Form.Group className="mb-3">
                          <Form.Label>Kab/Kota</Form.Label>
                          <Select
                            isClearable
                            options={this.state.kota}
                            value={this.state.selectedCities.id}
                            onChange={this.handleCityChange.bind(this)}
                          />
                          {errorsForm.find(o => { return o.index === 'selectedCities'}) && (
                            <Form.Text className="text-danger">
                              Data isian Kota belum terisi.
                            </Form.Text>
                          )}
                        </Form.Group>
                      )}
                      {this.state.selectedCities.value && (
                        <Form.Group className="mb-3">
                          <Form.Label>Kecamatan</Form.Label>
                          <Select
                            isClearable 
                            options={this.state.kecamatan}
                            value={this.state.selectedKecamatan.id}
                            onChange={this.handleKecamatanChange.bind(this)}
                          />
                          {errorsForm.find(o => { return o.index === 'selectedKecamatan'}) && (
                            <Form.Text className="text-danger">
                              Data isian Kecamatan belum terisi.
                            </Form.Text>
                          )}
                        </Form.Group>
                      )}
                      {this.state.selectedKecamatan.value && (
                        <Form.Group className="mb-3">
                          <Form.Label>Kelurahan/Desa</Form.Label>
                          <Select 
                            isClearable 
                            options={this.state.kelurahan}
                            value={this.state.selectedKelurahan.id}
                            onChange={this.handleKelurahanChange.bind(this)}
                          />
                          {errorsForm.find(o => { return o.index === 'selectedKelurahan'}) && (
                            <Form.Text className="text-danger">
                              Data isian Kelurahan belum terisi.
                            </Form.Text>
                          )}
                        </Form.Group>
                      )}
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>RT</Form.Label>
                            <Form.Control name="RT" type="text" placeholder="Masukan Data RT" />
                            {errorsForm.find(o => { return o.index === 'RT'}) && (
                              <Form.Text className="text-danger">
                                Data isian RT belum terisi.
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>RW</Form.Label>
                            <Form.Control name="RW" type="text" placeholder="Masukan Data RW" />
                            {errorsForm.find(o => { return o.index === 'RW'}) && (
                              <Form.Text className="text-danger">
                                Data isian RW belum terisi.
                              </Form.Text>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control name="alamat" as="textarea" maxLength={255} rows={5} />
                        {errorsForm.find(o => { return o.index === 'RW'}) && (
                          <Form.Text className="text-danger">
                            Data isian Alamat belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Penghasilan Sebelum Pandemi</Form.Label>
                        <InputGroup className="mb-2">
                          <InputGroup.Text>Rp</InputGroup.Text>
                          <FormControl name="penghasilan_sebelum_pandemi" type="number" placeholder="Masukan Nilai Penghasilan" />
                        </InputGroup>
                        {errorsForm.find(o => { return o.index === 'penghasilan_sebelum_pandemi'}) && (
                          <Form.Text className="text-danger">
                            Data isian Penghasilan Sebelum Pandemi belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Penghasilan Setelah Pandemi</Form.Label>
                        <InputGroup className="mb-2">
                          <InputGroup.Text>Rp</InputGroup.Text>
                          <FormControl name="penghasilan_setelah_pandemi" type="number" placeholder="Masukan Nilai Penghasilan" />
                        </InputGroup>
                        {errorsForm.find(o => { return o.index === 'penghasilan_setelah_pandemi'}) && (
                          <Form.Text className="text-danger">
                            Data isian Penghasilan Setelah Pandemi belum terisi.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Alasan Membutuhkan Bantuan</Form.Label>
                        {this.state.alasan.map((type, index) => (
                          <Form.Check
                            label={type}
                            name="alasan"
                            value={index}
                            type="radio"
                          />
                        ))}
                        <Form.Check type="radio">
                          <Form.Check.Input value={3} name="alasan" type="radio" />
                          <Form.Control name="alasan_text" type="text" size="sm" placeholder="Lainnya" style={{width: '50%'}} />
                        </Form.Check>
                        {statusAlasan && (
                          <Form.Text className="text-danger">
                            Data isian {statusAlasan.message}.
                          </Form.Text>
                        )}
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check 
                          name="setuju" 
                          type="checkbox" 
                          label="Saya menyatakan bahwa data yang diisikan adalah benar dan siap mempertanggungjawabkan apabila ditemukan ketidaksesuaian dalam data tersebut."
                          style={{color: statusSetuju ? '#fc544b' : '#212529'}}
                        />
                      </Form.Group>
                    </Card.Body>
                    <hr/>
                    <Card.Footer>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <Link to={"/"}><Button variant="light">Back</Button></Link> {' '}
                        <Button variant="danger" type="submit">
                          Kirim data
                        </Button>
                      </div>
                    </Card.Footer>
                  </Form>
                </Card>
              </Col>
            </Row>
          </section>
        </div>

        <Modal size="lg" show={this.state.show} className="bg-smoke">
          <Modal.Header>
            <Row>
              <Col md={12}>
                <Modal.Title>Detail Permohonan Bansos</Modal.Title>
              </Col>

              <Col md={12}>
                <Alert variant='success'>
                  Sebelum Dikirim periksa kembali data anda dengan seksama. Pastikan alamat tidak keliru
                </Alert>
              </Col>
            </Row>
          </Modal.Header>
          <Modal.Body className="bg-smoke">
            <Card className="bg-smoke">
              <Card.Title className="greenText">Identitas Pemohon</Card.Title>
              <Row className="shadow-sm cardBody">
                <Col xs={4}>
                  <h6 className="greenText">Nama Pemohon</h6>
                  <p>{dataNama ? dataNama.data : '-'}</p>
                  <h6 className="greenText">Umur</h6>
                  <p>{dataUmur ? dataUmur.data : '-'}</p>
                </Col>
                <Col xs={4}>
                  <h6 className="greenText">Jenis Kelamin</h6>
                  <p>{dataJK ? dataJK.data : '-'}</p>
                  <h6 className="greenText">NIK</h6>
                  <p>{dataNIK ? dataNIK.data : '-'}</p>
                  <h6 style={{color:'green'}}>Nomor KK</h6>
                  <p>{dataNKK ? dataNKK.data : '-'}</p>
                </Col>
                <Col xs={4}>
                  <h6 className="greenText">Kartu KTP</h6>
                  <div><img className="img-thumbnail border-gr" src={this.state.image_KTP} width="150" /></div>
                </Col>
              </Row>
            </Card>
            <Card className="bg-smoke">
              <Card.Title className="greenText">Alamat Pemohon</Card.Title>
              <Row className="shadow-sm cardBody">
                <Col xs={4}>
                  <h6 className="greenText">Provinsi</h6>
                  <p>{dataProv ? dataProv.data : '-'}</p>
                  <h6 className="greenText">Kota / Kabupaten</h6>
                  <p>{dataKota ? dataKota.data : '-'}</p>
                  <h6 className="greenText">Kecamatan</h6>
                  <p>{dataKeca ? dataKeca.data : '-'}</p>
                </Col>
                <Col xs={4}>
                  <h6 className="greenText">Kelurahan/Desa</h6>
                  <p>{dataKelu ? dataKelu.data : '-'}</p>
                  <h6 className="greenText">RT/RW</h6>
                  <p>{dataRT ? dataRT.data : '-'} / {dataRW ? dataRW.data : '-'}</p>
                </Col>
                <Col xs={4}>
                  <h6 className="greenText">Alamat</h6>
                  <p>{dataAlamat ? dataAlamat.data : '-'}</p>
                </Col>
              </Row>
            </Card>
            <Card className="bg-smoke">
              <Card.Title className="greenText">Kondisi Keuangan Pemohon</Card.Title>
              <Row className="shadow-sm cardBody">
                <Col xs={4}>
                  <h6 className="greenText">Penghasilan Sebelum Pandemi</h6>
                  <p>Rp.{dataPengSebelum ? dataPengSebelum.data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : '-'},-</p>
                </Col>
                <Col xs={4}>
                  <h6 className="greenText">Penghasilan Sesudah Pandemi</h6>
                  <p>Rp.{dataPengSesudah ? dataPengSesudah.data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : '-'},-</p>
                </Col>
                <Col xs={4}>
                  <h6 className="greenText">Alasan Membutuhkan Bantuan</h6>
                  <p>{dataAlasan ? dataAlasan.data : '-'}</p>
                </Col>
              </Row>
            </Card>
          </Modal.Body>
          <Modal.Footer className="bg-smoke">
            <Button variant="success" onClick={(res) => {this.setState({show: !res})}}>
              Kirim
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default FormView;