import React, { Component } from "react"
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
import CourseDropDown from '../components/course_drop_down.js';
import UserDropDown from '../components/user_drop_down.js';
import url from 'url';

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
});

class NewGroupContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseID: null,
      department: null,
      courseSemester: null,
      level: null,
      users:[this.props.netid],
      usersInCourse:[]
    };
  }

  onSelectCourse = async (courseNumber, courseSemester) => {
    console.log(courseSemester);
    const usersInCourse = await fetch('http://35.237.162.74:3000/api/v1/dropdown/user?netid=' + this.props.netid + '&course=' + courseNumber);
    const usersInCourseJson = await usersInCourse.json();
    this.setState({
      courseID: courseNumber,
      courseSemester: courseSemester,
      usersInCourse: usersInCourseJson
    });
  };

  onSelectUser = (netid) => {
    const users = this.state.users;
    users.push(netid);
    this.setState({
      users: users,
    });
  }

  saveChanges = async event => {
    let params = new URLSearchParams(this.state);
    const res = await fetch('http://35.237.162.74:3000/api/v1/studyGroup/post', { method: 'POST', body: params });
    Router.push(`/groups?netid=${this.props.netid}`);
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      <Card className={this.props.card}>
        <CardContent>
          <Typography className={this.props.title} color="textSecondary">
            Course
          </Typography>
          <CourseDropDown departments={this.props.departments} onSelectCourse={this.onSelectCourse} />
          <Typography className={this.props.title} color="textSecondary">
            Users
          </Typography>
          <UserDropDown users={this.state.usersInCourse} onSelectUser={this.onSelectUser} />
          <UserDropDown users={this.state.usersInCourse} onSelectUser={this.onSelectUser} />
          <UserDropDown users={this.state.usersInCourse} onSelectUser={this.onSelectUser} />
          <UserDropDown users={this.state.usersInCourse} onSelectUser={this.onSelectUser} />
        </CardContent>
        <CardActions>
          <Button onClick={this.saveChanges} size="small"> Save </Button>
        </CardActions>
      </Card>
      </div>
    );
  };
}

NewGroupContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class NewGroupPage extends React.Component {

  static async getInitialProps({ query }) {
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
        <SearchAppBar name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <NewGroupContent netid={this.props.netid} departments={this.props.departments} netid={this.props.netid} />
        </div>
      </main>
    )
  };
}

export default withStyles(styles)(NewGroupPage);
