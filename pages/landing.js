import Link from 'next/link'
import React, { Component } from "react"
import { withRouter } from 'next/router'
import fetch from 'node-fetch';
import SearchAppBar from '../components/app_bar.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 100,
    maxWidth: 200
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Header extends React.Component {
  render() {
    return (
      <div>
        <div>
          <header>
            <p> Welcome to DukeStudy, {this.props.name} </p>
          </header>
        </div>
      </div>
    );
  }
}

class Content extends React.Component {
  render() {
    return (
      <div style={{width: '50%', margin: '0 auto'}}>
        <Card className={this.props.card}>
          <CardContent>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Major: {this.props.major}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Minor: {this.props.minor}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Certificate: {this.props.certificate}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Favorite Class: {this.props.favClass}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Favorite Prof: {this.props.favProf}
            </Typography>
          </CardContent>
          <CardActions>
            <Button href = "/edit" size="small"> Edit </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default class HomePage extends React.Component {

  static async getInitialProps({ query }) {
    const res = await fetch('http://localhost:3000/api/v1/select/' + query.netid)
    const json = await res.json()
    return json[0];
  }

  render() {
    return (
      <div>
        <SearchAppBar> </SearchAppBar>
        <Header name={this.props.name}/>
        <Content
          major={this.props.primary_major}
          favClass={this.props.favorite_class}
          favProf={this.props.favorite_professor}
          major={this.props.primary_major}
          minor={this.props.primary_minor}
          certificate={this.props.certificate}
        />
      </div>
    );
  }
}
