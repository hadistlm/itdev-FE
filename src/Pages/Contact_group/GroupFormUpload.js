import React from 'react';
import { Link } from "react-router-dom";

import { Container, Row, Col, Table } from 'react-bootstrap';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

class GroupFormUpload extends React.Component {
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
      <Dropzone
        getUploadParams={this.getUploadParams}
        onChangeStatus={this.handleChangeStatus}
        onSubmit={this.handleSubmit}
        accept="text/csv,text/plain"
      />
    );
  }
}

export default GroupFormUpload;