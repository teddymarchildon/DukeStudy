import React, { Component } from "react";
import Router from 'next/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import fetch from 'node-fetch';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CourseDropDown from '../components/course_drop_down.js';
import RatingsDropDown from '../components/ratings_drop_down.js';
import Checkbox from '@material-ui/core/Checkbox';
import url from 'url';
import SearchAppBar from '../components/app_bar.js';
import SideButtons from '../components/side_buttons.js';
import CardActions from '@material-ui/core/CardActions';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'flex',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  card: {
    marginTop: theme.spacing.unit * 2
  },
  doneButton: {
    margin: theme.spacing.unit,
    marginTop: 20,
    alignItems: 'right',
    left: 450,
    height: 'auto'
  },
  addButton: {
    margin: theme.spacing.unit,
    marginTop: 20,
    right: 300,
    height: 'auto'
  }
});

class CourseMoreContent extends React.Component {

  handleNewStudyGroup = (course, department, level, semester) => {
    Router.push(`/newGroup?netid=${this.props.netid}&courseID=${course}&department=${department}&yearSemester=${semester}&level=${level}`);
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        <div style={{display: 'flex', alignItems: 'top'}}>
        </div>
          {this.props.courses.map((course, index) => (
            <Card className={classes.card}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary">
                  {course.department} {course.level} {course.year_semester}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  Quality of Course: {this.props.avg.avgqualityrating}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  Quality of Instruction: {this.props.avg.avginstructionrating}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  Difficulty: {this.props.avg.avgdifficulty}
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  Workload: {this.props.avg.avgworkload}
                </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={() => this.handleNewStudyGroup(course.course_number, course.department, course.level, course.year_semester)} size="small"> Create Study Group </Button>
                </CardActions>
          </Card>
        ))}
      </div>
    );
  };
}

CourseMoreContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class CourseMorePage extends React.Component {

  static async getInitialProps({ query }) {
    const netid = query.netid;
    const courseid = query.courseID;
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const courses = await fetch('http://35.237.162.74:3000/api/v1/course/' + courseid);
    const avgs = await fetch('http://35.237.162.74:3000/api/v1/courseAvg/' + courseid)
    const studentJson = await student.json();
    const coursesJson = await courses.json();
    const avgsJson = await avgs.json();
    studentJson[0]['courses'] = coursesJson;
    studentJson[0]['avg'] = avgsJson[0];
    return studentJson[0];
  }

  render() {
    return (
      <main>
      <SearchAppBar netid={this.props.netid} name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <CourseMoreContent classes={this.props.classes} netid={this.props.netid} avg={this.props.avg} courses={this.props.courses} />
        </div>
      </main>
    )
  }
}

CourseMorePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourseMorePage)
