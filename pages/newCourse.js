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

class NewCourseContent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      selectedCourses: [],
      selectedCourseSemesters: [],
      favoriteCourse: null,
    };
  }

  onSelectCourse = (courseNumber, courseSemester) => {
    var course = {
      courseNumber: courseNumber
    }
    course['qualityRating'] = -1;
    course['qualityInstructionRating'] = -1;
    course['difficultyRating'] = -1;
    course['workloadRating'] = -1;
    var selectedCourses = this.state.selectedCourses;
    selectedCourses.push(course);
    var selectedCourseSemesters = this.state.selectedCourseSemesters;
    selectedCourseSemesters.push(courseSemester);
    this.setState({
      selectedCourses: selectedCourses,
      selectedCourseSemesters: selectedCourseSemesters,
    });
  }

  onSelectedQualityCourse = rating => {
    this.state.selectedCourses[0]['qualityRating'] = rating;
  }

  onSelectedQualityInstruction = rating => {
    this.state.selectedCourses[0]['qualityInstructionRating'] = rating;
  }

  onSelectedDifficulty = rating => {
    this.state.selectedCourses[0]['difficultyRating'] = rating;
  }

  onSelectedWorkload = rating => {
    this.state.selectedCourses[0]['workloadRating'] = rating;
  }

  onFavoriteClassChange = (event, checked) => {
    if (checked) {
      this.setState({
        favoriteCourse: true,
      });
    }
  }

  handleDone = async (event) => {
    var obj = {
      netid: this.props.netid,
      course: JSON.stringify(this.state.selectedCourses),
      semester: JSON.stringify(this.state.selectedCourseSemesters),
      favoriteCourse: this.state.favoriteCourse,
    };
    let params = new URLSearchParams(obj);
    const res = await fetch('http://35.237.162.74:3000/api/v1/addCourse/post', {
      method: 'POST',
      body: params
    });
    const json = await res.json();
    Router.push(`/courses?netid=${this.props.netid}`);
  }

  render() {
    const { classes } = this.props;
    const { course } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        <div style={{display: 'flex', alignItems: 'top'}}>
        </div>
          <Card className={classes.card}>
            <CardContent>
              <CourseDropDown departments={this.props.departments} onSelectCourse={this.onSelectCourse} />
              <Typography className={classes.title} color="textSecondary">
                Quality of Course
              </Typography>
              <RatingsDropDown onSelectedRating={this.onSelectedQualityCourse} />
              <Typography className={classes.title} color="textSecondary">
                Quality of Instruction
              </Typography>
              <RatingsDropDown onSelectedRating={this.onSelectedQualityInstruction} />
              <Typography className={classes.title} color="textSecondary">
                Difficulty
              </Typography>
              <RatingsDropDown onSelectedRating={this.onSelectedDifficulty} />
              <Typography className={classes.title} color="textSecondary">
                Workload
              </Typography>
              <RatingsDropDown onSelectedRating={this.onSelectedWorkload} />
              <Typography className={classes.title} color="textSecondary">
                Is this your favorite class?
              </Typography>
              <Checkbox value='favorite' color="primary" onChange={this.onFavoriteClassChange}/>
              <CardActions>
                <Button onClick={this.handleDone} size="small"> Save </Button>
              </CardActions>
          </CardContent>
        </Card>
      </div>
    );
  };
}

NewCourseContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class NewCoursePage extends React.Component {

  static async getInitialProps({ query }) {

    const netid = query.netid;
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const departments = await fetch('http://35.237.162.74:3000/api/v1/dropdown/department');
    const studentJson = await student.json();
    const departmentsJson = await departments.json();
    studentJson[0]['departments'] = departmentsJson;
    return studentJson[0];
  }

  render() {
    return (
      <main>
      <SearchAppBar netid={this.props.netid} name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <NewCourseContent classes={this.props.classes} netid={this.props.netid} departments={this.props.departments} />
        </div>
      </main>
    )
  }
}

NewCoursePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewCoursePage)
