import React, { Component } from "react";
import Router from 'next/router';
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
    display: 'block',
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
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 10,
    right: 300,
    height: 'auto'
  },
});

class GroupsContent extends React.Component {

  constructor(props) {
    super(props);
  }

  handleLeaveGroup = async (groupID) => {
    console.log(groupID);
    const result = await fetch('http://localhost:3000/api/v1/leaveStudyGroup?netid=' + this.props.netid + '&groupID=' + groupID);
    const json = await result.json();
    window.location.reload();
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.groups.map((group, index) => (
        <Card className={classes.groupCard}>
          <CardContent>
            <Typography key={index} className={classes.title} color="textPrimary" gutterBottom>
              {group.department} {group.level}
            </Typography>
            {group.members.map((member, index2) => (
              <Typography key={index2} className={classes.title} color="textSecondary">
                {member}
              </Typography>
            ))}
          </CardContent>
          <CardActions>
            <Button onClick={() => this.handleLeaveGroup(group.group_id)} size="small"> Leave Group </Button>
          </CardActions>
        </Card>
        ))}
      </div>
    )
  }
}

GroupsContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

class NewGroupButton extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <main>
        <Button variant="contained" id='landing' className={classes.button} color="Primary" onClick={() => Router.push(`/newGroup?netid=${this.props.netid}`)}>
          New Group
        </Button>
      </main>
    );
  };
}

NewGroupButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

class GroupsPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/student/' + query.netid);
    const groups = await fetch('http://localhost:3000/api/v1/groups/' + query.netid);
    const studentJson = await student.json();
    const groupsJson = await groups.json();

    const groupDict = {};

    groupsJson.map(function (group, index) {
      if (!(group.group_id in groupDict)) {
        groupDict[group.group_id] = [];
      }
      var members = groupDict[group.group_id];
      members.push(group.netid);
      groupDict[group.group_id] = members;
      group['members'] = members;
    });

    var groupsUnique = {};
    var finalGroups = [];
    groupsJson.map(function(group, index) {
      if (!(group.group_id in groupsUnique)) {
        finalGroups.push(group);
        groupsUnique[group.group_id] = 1;
      }
    });
    const props = {
      netid: studentJson[0].netid,
      name: studentJson[0].name,
      groups: finalGroups
    };
    return props;
  }

  render() {
    const NewGroupButtonS = withStyles(styles)(NewGroupButton);
    return (
      <main>
        <SearchAppBar name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'top'}}>
          <SideButtons netid={this.props.netid}/>
          <GroupsContent netid={this.props.netid} groups={this.props.groups} classes={this.props.classes}/>
          <NewGroupButtonS netid={this.props.netid} />
        </div>
      </main>
    )
  };
}

export default withStyles(styles)(GroupsPage);
