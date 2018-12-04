import React, { Component } from "react"
import Router from 'next/router'
import fetch from 'node-fetch';
import SearchAppBar from '../components/app_bar.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SideButtons from '../components/side_buttons.js';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

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

class TutoringContent extends React.Component {

  handleRegister = event => {

  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        <Card className={this.props.card}>
          <CardContent>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Rate Per Hour: {this.props.info.rate_per_hour}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Availability: {this.props.info.days_available}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => Router.push(`/editTutor?netid=${this.props.netid}`)} size="small"> Edit </Button>
          </CardActions>
        </Card>
      </div>
    )
  };
}

TutoringContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class TutoringPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const tutor = await fetch('http://35.237.162.74:3000/api/v1/tutoring/' + query.netid);
    const studentJson = await student.json();
    const tutorJson = await tutor.json();
    if (tutorJson[0] == null) {
      studentJson[0]['tutorInfo'] = []
    } else {
      studentJson[0]['tutorInfo'] = tutorJson[0];
    }
    return studentJson[0];
  }

  render() {
    return (
      <main className={this.props.main}>
        <SearchAppBar name={this.props.name} />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <TutoringContent netid={this.props.netid} info={this.props.tutorInfo}/>
        </div>
      </main >
    );
  }
}

export default withStyles(styles)(TutoringPage)
