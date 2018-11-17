import Link from 'next/link'
import React, { Component } from "react"
import Router from 'next/router'
import fetch from 'node-fetch';
import SearchAppBar from '../components/app_bar.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});

class Content extends React.Component {

  render() {
    return (
      <div style={{width: '25%', margin: '0 auto'}}>
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
            <Button onClick={() => Router.push(`/editProfile?netid=${this.props.netid}`)} size="small"> Edit </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

// Content.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

class HomePage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/select/' + query.netid)
    const studentJson = await student.json()
    const course = await fetch('http://localhost:3000/api/v1/select/course/' + studentJson[0]['favorite_class'])
    const courseJson = await course.json()
    console.log('course json: ' + courseJson[0])
    studentJson[0]['courseName'] = `${courseJson[0]['department']} ${courseJson[0]['level']}`
    return studentJson[0];
  }

  render() {
    return (
      <main className={this.props.main}>
        <SearchAppBar name={this.props.name} />
        <Content
          netid={this.props.netid}
          major={this.props.primary_major}
          favClass={this.props.courseName}
          favProf={this.props.favorite_professor}
          major={this.props.primary_major}
          minor={this.props.primary_minor}
          certificate={this.props.certificate}
        />
      </main >
    );
  }
}

export default withStyles(styles)(HomePage)
