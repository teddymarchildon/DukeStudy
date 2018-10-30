import React, { Component } from "react"
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap"
import Router from 'next/router'
import fetch from 'node-fetch';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.email.includes('duke.edu')) {
      const netid = this.state.email.split('@')[0];
      registerNewUser(netid)
      Router.push(`/landing?netid=${netid}`)
    } else {
      alert('Make sure you are using your Duke email')
      this.setState({
        email: "",
        password: "",
      })
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Duke Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Submit!
          </Button>
        </form>

        <Button
          block
          bsSize="large"
          disabled={false}
          onClick= {() => Router.push('/login')}
        >
          Already have an account? Login
        </Button>
      </div>
    );
  }
}

async function registerNewUser(netid) {
  const res = await fetch('http://localhost:3000/api/v1/insert/' + netid);
  const json = await res.json();
  console.log('submitted new user request: ', json)
  return json;
}
