import React, { Component } from "react";
import Router from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
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

class Header extends React.Component {

  render() {
    return (
      <main>
      <Card className={this.props.card}>
        <CardContent>
          <Typography align='center' className={this.props.title} color="textPrimary">
            Let others know what courses you have taken, and what you think of them!
          </Typography>
        </CardContent>
      </Card>
      </main>
    );
  };
}

class FlowContent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      renderedCourses: [1],
      selectedCourses: [],
      currentCourse: null,
      favoriteCourse: null,
    };
  }

  onSelectCourse = (courseNumber) => {
    var course = {
      courseNumber: courseNumber
    }
    course['qualityRating'] = -1;
    course['qualityInstructionRating'] = -1;
    course['difficultyRating'] = -1;
    course['workloadRating'] = -1;
    var selectedCourses = this.state.selectedCourses;
    selectedCourses.push(course);
    this.setState({
      selectedCourses: selectedCourses,
      currentCourse: course,
    });
  }

  onAddCourse = event => {
    var renderedCourses = this.state.renderedCourses;
    renderedCourses.push(1);
    this.setState({
      renderedCourses: renderedCourses
    });
  }

  onSelectedQualityCourse = rating => {
    this.state.currentCourse['qualityRating'] = rating;
  }

  onSelectedQualityInstruction = rating => {
    this.state.currentCourse['qualityInstructionRating'] = rating;
  }

  onSelectedDifficulty = rating => {
    this.state.currentCourse['difficultyRating'] = rating;
  }

  onSelectedWorkload = rating => {
    this.state.currentCourse['workloadRating'] = rating;
  }

  onFavoriteClassChange = (event, checked) => {
    if (checked) {
      this.setState({
        favoriteCourse: this.state.currentCourse,
      });
    }
  }

  handleDone = async (event) => {
    var obj = {
      netid: this.props.netid,
      selectedCourses: JSON.stringify(this.state.selectedCourses),
      favoriteCourse: this.state.favoriteCourse.courseNumber,
    };
    let params = new URLSearchParams(obj);
    const res = await fetch('http://localhost:3000/api/v1/takesCourses/post', {
      method: 'POST',
      body: params
    });
    const json = await res.json();
    Router.push(`/landing?netid=${this.props.netid}`)
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <Button variant="contained" className={classes.addButton} color="secondary" onClick={this.onAddCourse}>
            Add Course
          </Button>
          <Button variant="contained" className={classes.doneButton} color="primary" onClick={this.handleDone}>
            Done
          </Button>
        </div>
        {this.state.renderedCourses.map((course, index) => (
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Course {index + 1}
              </Typography>
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
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };
}

FlowContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class Flow extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/flow/' + query.netid);
    const departments = await fetch('http://localhost:3000/api/v1/dropdown/department');
    const studentJson = await student.json();
    const departmentsJson = await departments.json();
    studentJson[0]['departments'] = departmentsJson;
    return studentJson[0];
  }

  render() {
    return (
      <main>
        <Header />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <FlowContent netid={this.props.netid} classes={this.props.classes} departments={this.props.departments} netid={this.props.netid}/>
        </div>
      </main>
    );
  };
}

export default withStyles(styles)(Flow);
