import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

class InformationCard extends React.Component {
  render() {
    return (
       <main className={this.props.main}>
        <Card className={this.props.card}>
          <CardContent>
            <Typography className={this.props.title} color="textSecondary" gutterBottom>
              Welcome to DukeStudy
            </Typography>
            <Typography variant="p" component="p">
              A place for Duke Students to discuss classes and form study groups.
            </Typography>
          </CardContent>
          <CardActions>
            <Button href = "/login" size="small"> Login </Button>
          </CardActions>
        </Card>
      </main>
    )
  };
}

InformationCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InformationCard);
