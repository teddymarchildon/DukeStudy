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
  groupCard: {
    marginBottom: theme.spacing.unit * 2
  },
});

class ProfessorContent extends React.Component {

  handleContact = (netid) => {
    let mailString = `mailto:${netid}@duke.edu`;
    window.location.href = mailString;
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        {this.props.courses.map((professor, index) => (
        <Card className={classes.groupCard}>
          <CardContent>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Name: {professor.name}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Course: {professor.department} {professor.level}
            </Typography>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Semester: {professor.year_semester}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => this.handleContact(professor.netid)} size="small"> Contact </Button>
          </CardActions>
        </Card>
      ))}
      </div>
    )
  }
}

ProfessorContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class HomePage extends React.Component {

  static async getInitialProps({ query }) {
    const user = query.user;
    const professor = query.other;
    const currentUser = await fetch('http://35.237.162.74:3000/api/v1/student/' + user);
    const otherUser = await fetch('http://35.237.162.74:3000/api/v1/professor/' + professor);
    const currentUserJson = await currentUser.json();
    const otherJson = await otherUser.json();
    currentUserJson[0]['other'] = otherJson;
    return currentUserJson[0];
  }

  render() {
    return (
      <main className={this.props.main}>
        <SearchAppBar netid={this.props.netid} name={this.props.name} />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <ProfessorContent
            classes={this.props.classes}
            courses={this.props.other}
          />
        </div>
      </main >
    );
  }
}

export default withStyles(styles)(HomePage)
