import Link from 'next/link'
import React, { Component } from "react"
import { withRouter } from 'next/router'
import fetch from 'node-fetch';
import SearchAppBar from '../components/app_bar.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import url from 'url';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div>
          <header>
            <p> Edit your Profile </p>
          </header>
        </div>
      </div>
    );
  }
}

class StudyTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }


  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
    this.props.onChange(this.props.id, event.target.value);
  };

  render() {
    return (
      <TextField
        id="standard-name"
        label={this.props.label}
        className={this.props.textField}
        value={this.state.value}
        onChange={this.handleChange('value')}
        margin="normal"
      />
    )
  }
}

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

  saveChanges = () => {
    saveChangesAsync(this.state)
  };

  render() {
    return (
      <div style={{width: '50%', margin: '0 auto'}}>
        <Card className={this.props.card}>
          <CardContent>
            <StudyTextField label='Major' id='major' value={this.props.major} onChange={this.handleChange}/>
            <StudyTextField label='Minor' id='minor' value={this.props.minor} onChange={this.handleChange}/>
            <StudyTextField label='Certificate' id='cert' value={this.props.certificate} onChange={this.handleChange}/>
            <StudyTextField label='Favorite Class' id='favClass' value={this.props.favClass} onChange={this.handleChange}/>
            <StudyTextField label='Favorite Professor' id='favProf' value={this.props.favProf} onChange={this.handleChange}/>
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
    const student = await fetch('http://localhost:3000/api/v1/select/' + query.netid)
    const studentJson = await student.json()
    const course = await fetch('http://localhost:3000/api/v1/select/course/' + studentJson[0]['favorite_class'])
    const courseJson = await course.json()
    console.log('course json: ' + courseJson[0])
    studentJson[0]['courseName'] = `${courseJson[0]['department']} ${courseJson[0]['level']}`
    return studentJson[0];
  }

  render() {
    return (
      <div>
        <SearchAppBar> </SearchAppBar>
        <Header name={this.props.name}/>
        <StudyForm
          netid={this.props.netid}
          major={this.props.primary_major}
          favClass={this.props.courseName}
          favProf={this.props.favorite_professor}
          major={this.props.primary_major}
          minor={this.props.primary_minor}
          certificate={this.props.certificate}
        />
      </div>
    );
  }
}

async function saveChangesAsync(state) {
  let params = new URLSearchParams(state);
  const res = await fetch('http://localhost:3000/api/v1/student/post', { method: 'POST', body: params })
  const json = await res.json();
  return json;
}
