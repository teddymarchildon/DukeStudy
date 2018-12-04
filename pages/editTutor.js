import React, { Component } from "react"
import fetch from 'node-fetch';
import SearchAppBar from '../components/app_bar.js'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SideButtons from '../components/side_buttons.js';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import FormTextField from '../components/form_text_field.js';
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

class TutorForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      netid: this.props.netid,
      rate: this.props.rate_per_hour,
      availability: this.props.days_available,
    };
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  saveChanges = async event => {
    let params = new URLSearchParams(this.state);
    const res = await fetch('http://35.237.162.74:3000/api/v1/tutor/post', { method: 'POST', body: params })
  };

  render() {
    return (
      <div style={{width: '25%', margin: 'auto'}}>
        <Card className={this.props.card}>
          <CardContent>
            <FormTextField label='Rate Per Hour' id='rate' value={this.props.rate_per_hour} onChange={this.handleChange}/>
            <br></br>
            <FormTextField label='Availability' id='availability' value={this.props.days_available} onChange={this.handleChange}/>
          </CardContent>
          <CardActions>
            <Button onClick={this.saveChanges} size="small"> Save </Button>
          </CardActions>
        </Card>
      </div>
    )
  };
}

TutorForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

class TutoringPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://35.237.162.74:3000/api/v1/student/' + query.netid);
    const tutor = await fetch('http://35.237.162.74:3000/api/v1/tutoring/' + query.netid);
    const studentJson = await student.json();
    const tutorJson = await tutor.json();
    studentJson[0]['tutorInfo'] = tutorJson[0];
    return studentJson[0];
  }

  render() {
    return (
      <main className={this.props.main}>
        <SearchAppBar name={this.props.name} />
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <TutorForm netid={this.props.netid} info={this.props.tutorInfo}/>
        </div>
      </main >
    );
  }
}

export default withStyles(styles)(TutoringPage)
