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
import SideButtons from '../components/side_buttons.js';

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

class LandingContent extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
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

LandingContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class HomePage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/student/' + query.netid)
    const studentJson = await student.json()
    return studentJson[0];
  }

  render() {
    return (
      <main className={this.props.main}>
        <SearchAppBar name={this.props.name} />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <LandingContent
            netid={this.props.netid}
            major={this.props.primary_major}
            favClass={`${this.props.department} ${this.props.level}`}
            favProf={this.props.favorite_professor}
            major={this.props.primary_major}
            minor={this.props.primary_minor}
            certificate={this.props.certificate}
            />
        </div>
      </main >
    );
  }
}

export default withStyles(styles)(HomePage)
