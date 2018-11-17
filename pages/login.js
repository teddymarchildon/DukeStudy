import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Router from 'next/router'


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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  text: {
    marginTop: theme.spacing.unit * 3,
  },
  registerButton: {
    marginLeft: theme.spacing.unit * 2,
    float: 'right',
    marginTop: -10,
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.email.length <= 0 || this.state.password.length <= 0) {
      return
    }
    if (this.state.email.includes('duke.edu')) {
      const netid = this.state.email.split('@')[0]
      Router.push(`/landing?netid=${netid}`)
    } else {
      alert('Make sure you are using your Duke email')
      this.setState({
        email: "",
        password: "",
      })
    }
  }

  handleNewUser = event => {
    event.preventDefault();
    if (this.state.email.length <= 0 || this.state.password.length <= 0) {
      return
    }
    if (this.state.email.includes('duke.edu')) {
      const netid = this.state.email.split('@')[0]
      registerNewUser(netid)
      Router.push(`/landing?netid=${netid}`)
    } else {
      alert('Make sure you are using your Duke email')
      this.setState({
        email: "",
        password: "",
      })
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Duke Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign in
            </Button>
            <Typography component="p" className={classes.text}>
              Don't have an account?
              <Button
                type="submit"
                halfWidth
                variant="contained"
                color="secondary"
                className={classes.registerButton}
                onClick={this.handleNewUser}
              >
                Create Account
              </Button>
            </Typography>
          </form>
        </Paper>
      </main>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login)

async function registerNewUser(netid) {
  const res = await fetch('http://localhost:3000/api/v1/insert/' + netid);
  const json = await res.json();
  console.log('submitted new user request: ', json)
  return json;
}
