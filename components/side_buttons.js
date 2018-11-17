import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Router from 'next/router'
import PropTypes from 'prop-types';

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
  button: {
    margin: theme.spacing.unit,
    marginTop: 10,
    left: 100
  },
  input: {
    display: 'none',
  },
});

class SideButtons extends React.Component {

  handleInformationClick = (event) => {
    Router.push(`/landing?netid=${this.props.netid}`)
  }

  handleGroupsClick = (event) => {
    Router.push(`/groups?netid=${this.props.netid}`)
  }

  handleTutoringClick = (event) => {
    Router.push(`/tutoring?netid=${this.props.netid}`)
  }

  handleTAClick = (event) => {
    Router.push(`/ta?netid=${this.props.netid}`)
  }

  render() {
    const { classes } = this.props;
    return (
      <main>
        <Button variant="contained" id='landing' color="secondary" className={classes.button} onClick={this.handleInformationClick}>
          My Information
        </Button>
        <br></br>
        <Button variant="contained" id='groups' color="secondary" className={classes.button} onClick={this.handleGroupsClick}>
          My Groups
        </Button>
        <br></br>
        <Button variant="contained" id='tutoring' color="secondary" className={classes.button} onClick={this.handleTutoringClick}>
          Tutoring
        </Button>
        <br></br>
        <Button variant="contained" id='ta' color="secondary" className={classes.button} onClick={this.handleTAClick}>
          TA
        </Button>
      </main>
    )
  };
}

SideButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideButtons)
