import Link from 'next/link'
import React, { Component } from "react"
import { withRouter } from 'next/router'
import QueryDatabase from '../database/connect'

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

    // let queryString = "SELECT Primary_Major from Student where NetID = " + query.netid;

    // let results = QueryDatabase(queryString)

    // const { Client } = require('pg')
    // const client = new Client()
    //
    // await client.connect()
    //
    // const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // console.log(res.rows[0].message) // Hello world!
    // await client.end()

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
