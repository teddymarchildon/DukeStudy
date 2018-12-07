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
  button: {
    margin: theme.spacing.unit,
    marginTop: 10,
    right: 300,
    height: 'auto'
  },
  groupCard: {
    marginBottom: theme.spacing.unit * 2
  },
});

class TAingContent extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.info.map((course, index) => (
        <Card className={classes.groupCard}>
          <CardContent>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Course: {course.department} {course.level}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Semester: {course.year_semester}
            </Typography>
          </CardContent>
        </Card>
      ))}
      </div>
    )
  };
}

TAingContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class TAButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main>
        <Button variant="contained" id='landing' className={classes.button} color="Primary" onClick={() => Router.push(`/newTA?netid=${this.props.netid}`)}>
          Register as TA
        </Button>
      </main>
    );
  };
}

TAButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

class TAingPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const TA = await fetch('http://35.237.162.74:3000/api/v1/TAing/' + query.netid);
    const studentJson = await student.json();
    const TAJson = await TA.json();
    studentJson[0]['TAInfo'] = TAJson;
    return studentJson[0];
  }

  render() {
    const TAButtonS = withStyles(styles)(TAButton);
    return (
      <main className={this.props.main}>
        <SearchAppBar netid={this.props.netid} name={this.props.name} />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <TAingContent classes={this.props.classes} netid={this.props.netid} info={this.props.TAInfo}/>
          <TAButtonS netid={this.props.netid} />
        </div>
      </main >
    );
  }
}

export default withStyles(styles)(TAingPage)
