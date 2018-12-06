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
    marginTop: theme.spacing.unit * 2
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 10,
    right: 300,
    height: 'auto'
  },
});

class CourseContent extends React.Component {

  constructor(props) {
    super(props);
  }

  handleEditRatings = async (courseID) => {
    const result = await fetch('http://35.237.162.74:3000/api/v1/editRatings?netid=' + this.props.netid + '&courseID=' + courseID);
    const json = await result.json();
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.courses.map((course, index) => (
        <Card className={classes.courseCard}>
          <CardContent>
            <Typography key={index} className={classes.title} color="textPrimary" gutterBottom>
              {course.department} {course.level} {course.year_semester}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
              Difficulty: {course.difficulty}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
              Quality of Course: {course.quality_of_course}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
              Quality of Instruction: {course.quality_of_instruction}
            </Typography>
            <Typography className={classes.title} color="textSecondary">
              Workload: {course.workload}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => this.handleEditRatings(course.course_number)} size="small"> Edit ratings </Button>
          </CardActions>
        </Card>
        ))}
      </div>
    )
  }
}

CourseContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class NewCourseButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main>
        <Button variant="contained" id='landing' className={classes.button} color="Primary" onClick={() => Router.push(`/newCourse?netid=${this.props.netid}`)}>
          New Course
        </Button>
      </main>
    );
  };
}

NewCourseButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

class CoursePage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const courses = await fetch('http://35.237.162.74:3000/api/v1/courses/' + query.netid);
    const studentJson = await student.json();
    const coursesJson = await courses.json();

    const props = {
      netid: studentJson[0].netid,
      name: studentJson[0].name,
      courses: coursesJson
    };
    console.log("PROPS: ", props);
    return props;
  }

  render() {
    const NewCourseButtonS = withStyles(styles)(NewCourseButton);
    return (
      <main>
        <SearchAppBar name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <CourseContent netid={this.props.netid} courses={this.props.courses} classes={this.props.classes}/>
          <NewCourseButtonS netid={this.props.netid} />
        </div>
      </main>
    )
  };
}

export default withStyles(styles)(CoursePage);
