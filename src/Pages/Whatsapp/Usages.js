import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import { Row, Col, Card, Button, Form, Table } from 'react-bootstrap';

class Usages extends React.Component {
  constructor(props) {
    super(props);
    this.chart = null;
  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 366; i++) {
      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
      data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";

    series.tooltipText = "{valueY.value}";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
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
              <h1>Whatsapp usages</h1>
            </Row>
            <div className="section-header-breadcrumb">
              <div className="breadcrumb-item active"><a href="#">Dashboard</a></div>
              <div className="breadcrumb-item"><a href="#">Whatsapp</a></div>
              <div className="breadcrumb-item">Broadcast</div>
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
                      <div class="form-group">
                        <input type="date" className="form-control" />
                      </div>
                    </Col>
                    <Col md={2}>
                      <Button variant="outline-danger">Search</Button>
                    </Col>
                    <Col md={{ span: 2, offset: 4 }}>
                      <Button variant="outline-primary" className="float-end"><i class="fas fa-download"></i> Export</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <div className="d-flex align-items-center justify-content-center mt-1">
                        <div className="p-2 flex-fill bd-highlight">
                          <h3>0</h3>
                          <p className="mb-0">Total Messages</p>
                        </div>
                        <div className="p-2 flex-fill bd-highlight">
                          <h3>0</h3>
                          <p className="text-success mb-0">Total Delivered</p>
                        </div>
                        <div className="p-2 flex-fill bd-highlight">
                          <h3>0</h3>
                          <p className="text-info mb-0">Messages Read</p>
                        </div>
                        <div className="p-2 flex-fill bd-highlight">
                          <h3>0</h3>
                          <p className="text-warning mb-0">Messages Rejected</p>
                        </div>
                        <div className="p-2 flex-fill bd-highlight">
                          <h3>0</h3>
                          <p className="text-danger mb-0">Messages Failed</p>
                        </div>
                      </div>
                    </Col>
                    <Col md={12}>
                      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </div>
    );
  }
}

export default Usages;