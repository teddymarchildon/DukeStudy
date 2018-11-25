import React, { Component } from "react"
import Router from 'next/router'
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
  groupCard: {
    marginTop: theme.spacing.unit * 2
  }
});

class GroupsContent extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.groups.map((group, index) => (
        <Card className={classes.groupCard}>
          <CardContent>
            <Typography key={index} className={this.props.title} color="textPrimary" gutterBottom>
              {group.department} {group.level}
            </Typography>
            <Typography key={index} className={this.props.title} color="textSecondary">
              {group.netid}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => Router.push(`/editGroups?netid=${this.props.netid}&groupid=${group.group.group_id}`)} size="small"> Edit </Button>
          </CardActions>
        </Card>
        ))}
      </div>
    )
  }
}

class NewGroupButton extends React.Component {
  render() {
    return (
      <Button variant="contained" id='landing' color="Primary" onClick={() => Router.push(`/newGroup?netid=${this.props.netid}`)}>
        New Group
      </Button>
    );
  };
}

GroupsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};


class GroupsPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/student/' + query.netid);
    const groups = await fetch('http://localhost:3000/api/v1/groups/' + query.netid);
    const studentJson = await student.json();
    const groupsJson = await groups.json();

    const props = {
      netid: studentJson[0].netid,
      name: studentJson[0].name,
      groups: groupsJson
    };
    return props;
  }

  render() {
    return (
      <main>
        <SearchAppBar name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <GroupsContent groups={this.props.groups} classes={this.props.classes}/>
          <NewGroupButton netid={this.props.netid} />
        </div>
      </main>
    )
  };
}

export default withStyles(styles)(GroupsPage);
