import Link from 'next/link'
import React, { Component } from "react"
import { withRouter } from 'next/router'
import fetch from 'node-fetch';
import '../components/layout.css'

class Header extends React.Component {
  render() {
    return (
      <div>
        <div class='wrapper'>
          <header>
            <p> Welcome to DukeStudy, {this.props.name} </p>
            <p> You major in {this.props.major} </p>
          </header>
        </div>
        <div>
        <nav>
          <Link href="/login">
            <a>Logout</a>
          </Link>
        </nav>
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
        <Header name={this.props.name} major={this.props.primary_major}/>
    );
  }
}
