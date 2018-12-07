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
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ProfessorDropDown from '../components/professor_drop_down.js';

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

class StudyForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
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

  handleSelectCourse = (courseNumber, semester) => {
    this.setState({
      favClass: courseNumber
    });
  };

  handleSelectProfessor = (netid) => {
    this.setState({
      favProf: netid,
    })
  }

  saveChanges = async () => {
    let params = new URLSearchParams(this.state);
    const res = await fetch('http://35.237.162.74:3000/api/v1/student/post', { method: 'POST', body: params })
    Router.push(`/landing?netid=${this.props.netid}`);
  };

  render() {
    return (
      <div style={{width: '25%', margin: '0 auto'}}>
        <Card className={this.props.card}>
          <CardContent>
            <FormTextField label='Name' id='name' value={this.props.name} onChange={this.handleChange}/>
            <FormTextField label='Major' id='major' value={this.props.major} onChange={this.handleChange}/>
            <FormTextField label='Minor' id='minor' value={this.props.minor} onChange={this.handleChange}/>
            <FormTextField label='Certificate' id='certificate' value={this.props.certificate} onChange={this.handleChange}/>
            <Typography className={this.props.title} color='textSecondary'>
              Favorite Professor
            </Typography>
            <ProfessorDropDown users={this.props.professors} onSelectUser={this.handleSelectProfessor} />
            <Typography className={this.props.title} color='textSecondary'>
              Favorite Course
            </Typography>
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

class EditProfilePage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const departments = await fetch('http://35.237.162.74:3000/api/v1/dropdown/department');
    const professors = await fetch('http://35.237.162.74:3000/api/v1/dropdown/professor');
    const studentJson = await student.json();
    const departmentsJson = await departments.json();
    const professorsJson = await professors.json();

    studentJson[0]['departments'] = departmentsJson;
    studentJson[0]['professors'] = professorsJson;
    return studentJson[0];
  }

  render() {
    return (
      <div>
        <SearchAppBar netid={this.props.netid} name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <StudyForm
            name={this.props.name}
            netid={this.props.netid}
            major={this.props.primary_major}
            favClass={this.props.course_number}
            favProf={this.props.favorite_professor}
            major={this.props.primary_major}
            minor={this.props.primary_minor}
            certificate={this.props.certificate}
            departments={this.props.departments}
            title={this.props.title}
            professors={this.props.professors}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(EditProfilePage);
