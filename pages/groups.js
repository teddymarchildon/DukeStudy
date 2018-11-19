import React, { Component } from "react"
import Router from 'next/router'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import SearchAppBar from '../components/app_bar.js'
import SideButtons from '../components/side_buttons.js'
import fetch from 'node-fetch';

class Groups extends React.Component {

  static async getInitialProps({ query }) {
    const student = await fetch('http://localhost:3000/api/v1/select/' + query.netid)
    const groups = await fetch('http://localhost:3000/api/v1/select/groups/' + query.netid);
    const studentJson = await student.json()
    const groupsJson = await groups.json();
    const groupsResults = []
    groupsJson.forEach(async function(group) {
      const groupData = await fetch('http://localhost:3000/api/v1/select/group/' + group.group_id);
      const groupJson = await groupData.json();

      const courseData = await fetch('http://localhost:3000/api/v1/select/course/' + groupJson[0].course_number)
      const courseJson = await courseData.json();

      const data = {
        group: groupJson[0],
        courseName: `${courseJson[0]['department']} ${courseJson[0]['level']}`
      }
      groupsResults.push(data);
    });

    const props = {
      netid: studentJson[0].netid,
      name: studentJson[0].name,
      groups: groupsResults
    }
    return props
  }

  render() {
    return (
      <div>
        <SearchAppBar name={this.props.name}/>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <SideButtons netid={this.props.netid}/>
          </div>
      </div>
    )
  };
}

export default Groups
