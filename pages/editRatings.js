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

class EditRatingsContent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentCourse: this.props.course,
      favoriteCourse: null,
    };
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
        favoriteCourse: true,
      });
    }
  }

  handleDone = async (event) => {
    var obj = {
      netid: this.props.netid,
      course: JSON.stringify(this.state.currentCourse),
      favoriteCourse: this.state.favoriteCourse.courseNumber,
    };
    let params = new URLSearchParams(obj);
    const res = await fetch('http://35.237.162.74:3000/api/v1/ratesCourse/post', {
      method: 'POST',
      body: params
    });
    const json = await res.json();
    Router.push(`/courses?netid=${this.props.netid}`);
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        <div style={{display: 'flex', alignItems: 'top'}}>
        </div>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                {this.props.course.department} {this.props.course.level} {this.props.course.year_semester}
              </Typography>
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

EditRatingsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class EditRatingsPage extends React.Component {

  static async getInitialProps({ query }) {

    const netid = query.netid;
    const courseid = query.courseID;
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const courses = await fetch('http://35.237.162.74:3000/api/v1/courses/' + query.netid);
    const studentJson = await student.json();
    const coursesJson = await courses.json();
    const courseToEdit = null;

    coursesJson.map(function(course, index) {
      if (course.course_number.trim() === courseid.trim()) {
        courseToEdit = course;
      }
    });
    studentJson[0]['course'] = courseToEdit;
    return studentJson;
  }

  render() {
    return (
      <main>
      <SearchAppBar name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <EditRatingsContent classes={this.props.classes} netid={this.props.netid} course={this.props.course} />
        </div>
      </main>
    )
  }
}

EditRatingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditRatingsPage)
