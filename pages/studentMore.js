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

  handleContact = () => {
    let mailString = `mailto:${this.props.netid}@duke.edu`;
    window.location.href = mailString;
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        <Card className={this.props.card}>
          <CardContent>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Name: {this.props.name}
            </Typography>
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
            <Button onClick={() => this.handleContact(this.props.netid)} size="small"> Contact </Button>
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
    const user = query.user;
    const other = query.other;
    const currentUser = await await fetch('http://35.237.162.74:3000/api/v1/student/' + user);
    const otherUser = await fetch('http://35.237.162.74:3000/api/v1/student/' + other);
    const currentUserJson = await currentUser.json();
    const otherJson = await otherUser.json();
    currentUserJson[0]['other'] = otherJson[0];
    return currentUserJson[0];
  }

  render() {
    return (
      <main className={this.props.main}>
        <SearchAppBar netid={this.props.netid} name={this.props.name} />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <LandingContent
            name={this.props.other.name}
            netid={this.props.other.netid}
            major={this.props.other.primary_major}
            favClass={`${this.props.other.department} ${this.props.other.level}`}
            favProf={this.props.other.favorite_professor}
            major={this.props.other.primary_major}
            minor={this.props.other.primary_minor}
            certificate={this.other.props.certificate}
            />
        </div>
      </main >
    );
  }
}

export default withStyles(styles)(HomePage)
