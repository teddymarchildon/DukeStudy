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

class GroupsContent extends React.Component {

  render() {
    return (
      <div style={{width: '25%', margin: 'auto'}}>
      {this.props.groups.map((group, index) => (
        <Card className={this.props.card}>
          <CardContent>
            <Typography key={index} className={this.props.title} color="textSecondary" gutterBottom>
              Group {group.group_id}: {group.department} {group.level} has member {group.netid}
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


class GroupsPage extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/select/' + query.netid);
    const groups = await fetch('http://localhost:3000/api/v1/select/groups/' + query.netid);
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
      <div>
        <SearchAppBar name={this.props.name}/>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <SideButtons netid={this.props.netid}/>
          <GroupsContent groups={this.props.groups} />
        </div>
      </div>
    )
  };
}

export default GroupsPage
