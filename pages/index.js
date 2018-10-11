import Link from 'next/link'
import React, { Component } from "react"
import { withRouter } from 'next/router'

class Header extends React.Component {
  render() {
    return (
    <div>
      <div>
        <h1> Welcome to DukeStudy, {this.props.netid}</h1>
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

  constructor(props) {
    super(props);
    this.state = {
      netid: props.netid,
    };
  }

  static async getInitialProps({ query }) {
    return { netid: query.netid }
  }

  render() {
    return (
        <Header netid={this.state.netid}/>
    );
  }
}
