import React, { Component } from "react";
import Router from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SearchAppBar from '../components/app_bar.js'
import SideButtons from '../components/side_buttons.js'
import fetch from 'node-fetch';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  studentCard: {
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 10,
    right: 300,
    height: 'auto'
  },
});

class StudentSearchContent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.students.map((student, index) => (
        <Card className={classes.studentCard}>
          <CardContent>
            <Typography key={index} className={classes.title} color="textPrimary" gutterBottom>
              {student.name}
            </Typography>
          </CardContent>
        </Card>
        ))}
      </div>
    )
  }
}

StudentSearchContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class StudentSearchPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const search = await fetch('http://35.237.162.74:3000/api/v1/search?type=Student&term=' + query.term);
    const studentJson = await student.json();
    const result = await search.json();

    const props = {
      netid: studentJson[0].netid,
      name: studentJson[0].name,
      students: result
    };
    return props;
  }

  render() {
    return (
      <main>
        <SearchAppBar netid={this.props.netid} name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <StudentSearchContent netid={this.props.netid} students={this.props.students} classes={this.props.classes}/>
        </div>
      </main>
    )
  };
}

export default withStyles(styles)(StudentSearchPage);
