import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import axios from "axios";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      passwordHash: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      passwordHash: this.state.passwordHash
    };

    this.loginUser(user, this.props.history);
  }

  loginUser = (userData, history) => {
    axios
      .get("https://swapi.co/api/people/1/")
      .then(res => {
        if (res.data.name === userData.username) {
          this.setState({ errors: {} });
        } else {
          this.setState({ errors: { username: "Wrong Username" } });
          return;
        }
        if (res.data.birth_year === userData.passwordHash) {
          this.setState({ errors: {} });
        } else {
          this.setState({ errors: { passwordHash: "Wrong Password" } });
          return;
        }
        // set token in localStorage
        localStorage.setItem("user_logged_in", true);
        history.push("/dashboard");
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    if (localStorage.getItem("user_logged_in") === "true") {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className={classnames("form-control", {
                            "is-invalid": errors.username
                          })}
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="username"
                          value={this.state.username}
                          onChange={this.onChange}
                        />
                        {errors.username && (
                          <div className="invalid-feedback">
                            {errors.username}
                          </div>
                        )}
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          className={classnames("form-control", {
                            "is-invalid": errors.passwordHash
                          })}
                          type="password"
                          name="passwordHash"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.passwordHash}
                          onChange={this.onChange}
                        />
                        {errors.passwordHash && (
                          <div className="invalid-feedback">
                            {errors.passwordHash}
                          </div>
                        )}
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Link
                            to="/forgot-password"
                            color="link"
                            className="px-0"
                          >
                            Forgot password?
                          </Link>
                        </Col>
                        <Col xs="12" className="text-right">
                          <Link to="/register">
                            <Button
                              color="link"
                              className="mt-3"
                              active
                              tabIndex={-1}
                            >
                              Register Now!
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
