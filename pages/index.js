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

    fetch('http://localhost:3000/api/v1/select/' + query.netid)
    .then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
    }).catch(err => console.error(err));

    return {
      netid: query.netid,
      major: 'CompSci'
    }
  }

  render() {
    return (
        <Header netid={this.props.netid} major={this.props.major}/>
    );
  }
}
