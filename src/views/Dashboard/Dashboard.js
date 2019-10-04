import React, { Component, lazy, Suspense } from "react";
import { Col, Row } from "reactstrap";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3"></Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
