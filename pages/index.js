import Link from 'next/link'
import React, { Component } from "react"
import { withRouter } from 'next/router'
import fetch from 'node-fetch';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h1> Welcome to DukeStudy, {this.props.netid}</h1>
          <h1> You major in {this.props.major} </h1>
        </div>
        <div>
          <Link href="/login">
            <a>Logout</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default class HomePage extends React.Component {

  static async getInitialProps({ query }) {
    const res = await fetch('http://localhost:3000/api/v1/select/' + query.netid)
    const json = await res.json()
    return json[0];
  }

  render() {
    return (
        <Header netid={this.props.name} major={this.props.primary_major}/>
    );
  }
}
