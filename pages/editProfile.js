import React, { Component } from "react"
import fetch from 'node-fetch';
import SearchAppBar from '../components/app_bar.js'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import url from 'url';
import SideButtons from '../components/side_buttons.js';
import CourseDropDown from '../components/course_drop_down.js';
import FormTextField from '../components/form_text_field.js';

class StudyForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      netid: this.props.netid,
      major: this.props.major,
      minor: this.props.minor,
      certificate: this.props.certificate,
      favClass: this.props.favClass,
      favProf: this.props.favProf
    }
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSelectCourse = (courseNumber) => {
    this.setState({
      favClass: courseNumber
    });
  };

  saveChanges = async () => {
    let params = new URLSearchParams(this.state);
    const res = await fetch('http://localhost:3000/api/v1/student/post', { method: 'POST', body: params })
  };

  render() {
    return (
      <div style={{width: '25%', margin: '0 auto'}}>
        <Card className={this.props.card}>
          <CardContent>
            <FormTextField label='Major' id='major' value={this.props.major} onChange={this.handleChange}/>
            <FormTextField label='Minor' id='minor' value={this.props.minor} onChange={this.handleChange}/>
            <FormTextField label='Certificate' id='certificate' value={this.props.certificate} onChange={this.handleChange}/>
            <FormTextField label='Favorite Professor' id='favProf' value={this.props.favProf} onChange={this.handleChange}/>
            <CourseDropDown departments={this.props.departments} onSelectCourse={this.handleSelectCourse}/>
          </CardContent>
          <CardActions>
            <Button onClick={this.saveChanges} size="small"> Save </Button>
          </CardActions>
      </Card>
    </div>
    )
  }
}

StudyForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default class EditProfilePage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/student/' + query.netid);
    const studentJson = await student.json();

    const departments = await fetch('http://localhost:3000/api/v1/dropdown/department');
    const departmentsJson = await departments.json();

    studentJson[0]['departments'] = departmentsJson;
    return studentJson[0];
  }

  render() {
    return (
      <div>
        <SearchAppBar name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <StudyForm
            netid={this.props.netid}
            major={this.props.primary_major}
            favClass={this.props.course_number}
            favProf={this.props.favorite_professor}
            major={this.props.primary_major}
            minor={this.props.primary_minor}
            certificate={this.props.certificate}
            departments={this.props.departments}
          />
        </div>
      </div>
    );
  }
}
