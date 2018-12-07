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
import CourseDropDown from '../components/course_drop_down';

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
});

class TAingContent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      netid: this.props.netid,
      courseNumber: null,
      courseSemester: null
    }
  }

  onSelectCourse = (courseNumber, courseSemester) {
    this.setState({
      courseNumber: courseNumber,
      courseSemester: courseSemester
    })
  }

  handleRegister = event => {
    let params = new URLSearchParams(this.state);
    const res = await fetch('http://35.237.162.74:3000/api/v1/ta/post', { method: 'POST', body: params });
    Router.push(`/groups?netid=${this.props.netid}`);
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.info.map((course, index) => (
        <Card className={this.props.card}>
          <CardContent>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Course
            </Typography>
            <CourseDropDown departments={this.props.departments} onSelectCourse={this.onSelectCourse} />
          </CardContent>
          <CardActions>
            <Button onClick={this.handleRegister} size="small"> Save </Button>
          </CardActions>
        </Card>
      ))}
      </div>
    )
  };
}

TAingContent.propTypes = {
  classes: PropTypes.object.isRequired,
};


class TAingPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const departments = await fetch('http://35.237.162.74:3000/api/v1/dropdown/department');
    const studentJson = await student.json();
    const departmentsJson = await departments.json();
    studentJson[0]['departments'] = departmentsJson;
  }

  render() {
    return (
      <main className={this.props.main}>
        <SearchAppBar netid={this.props.netid} name={this.props.name} />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <TAingContent netid={this.props.netid} info={this.props.TAInfo} departments={this.props.departments}/>
        </div>
      </main >
    );
  }
}

export default withStyles(styles)(TAingPage)
