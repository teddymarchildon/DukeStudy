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
  courseCard: {
    marginBottom: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 10,
    right: 300,
    height: 'auto'
  },
});

class CourseSearchContent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.courses.map((course, index) => (
        <Card className={classes.courseCard}>
          <CardContent>
            <Typography key={index} className={classes.title} color="textPrimary" gutterBottom>
              {course.department} {course.level}
            </Typography>
            <Typography key={index} className={classes.title} color="textPrimary" gutterBottom>
              Tags: {course.tags}
            </Typography>
            <Typography key={index} className={classes.title} color="textPrimary" gutterBottom>
              Prerequesites: {course.prerequesites}
            </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => Router.push(`/courseMore?netid=${this.props.netid}&courseID=${course.course_number}`)} size="small"> More </Button>
            </CardActions>
        </Card>
        ))}
      </div>
    )
  }
}

CourseSearchContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class CourseSearchPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const search = await fetch('http://35.237.162.74:3000/api/v1/search?type=Course&term=' + query.term);
    const studentJson = await student.json();
    const result = await search.json();

    const props = {
      netid: studentJson[0].netid,
      name: studentJson[0].name,
      courses: result
    };
    return props;
  }

  render() {
    return (
      <main>
        <SearchAppBar netid={this.props.netid} name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <CourseSearchContent netid={this.props.netid} courses={this.props.courses} classes={this.props.classes}/>
        </div>
      </main>
    )
  };
}

export default withStyles(styles)(CourseSearchPage);
