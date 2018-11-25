import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import fetch from 'node-fetch';

class CourseDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorDepartmentEl: null,
      anchorCourseEl: null,
      selectedDepartment: 'Department',
      selectedCourseID: null,
      selectedCourseName: 'Course',
      courses: [],
    };
  };

  handleOpenDepartment = event => {
    this.setState({ anchorDepartmentEl: event.currentTarget });
  };

  handleOpenCourse = event => {
    this.setState({ anchorCourseEl: event.currentTarget });
  };

  handleCloseDepartment = async (event) => {
    this.setState({
      anchorDepartmentEl: null,
      selectedDepartment: event.target.id
     });

     const courses = await fetch('http://localhost:3000/api/v1/dropdown/course/' + event.target.id);
     const coursesJson = await courses.json();
     this.setState({
       courses: coursesJson,
     });

  };

  handleCloseCourse = event => {
    this.setState({
      anchorCourseEl: null,
      selectedCourseID: event.target.id,
      selectedCourseName: event.target.value,
    });
    console.log(this.state)
  };

  render() {
    const { anchorDepartmentEl } = this.state;
    const { anchorCourseEl } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorDepartmentEl ? 'department-drop-down' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenDepartment}
        >
          {this.state.selectedDepartment}
        </Button>
        <Menu
          id='department-drop-down'
          anchorEl={anchorDepartmentEl}
          open={Boolean(anchorDepartmentEl)}
          onClose={this.handleClose}
        >
        {this.props.departments.map((department, index) => (
          <MenuItem key={department.department} id={department.department} onClick={this.handleCloseDepartment}>
          {department.department}
          </MenuItem>
        ))}
        </Menu>

        <Button
          aria-owns={anchorCourseEl ? 'course-drop-down' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenCourse}
        >
          {this.state.selectedCourseName}
        </Button>
        <Menu
          id="course-drop-down"
          anchorEl={anchorCourseEl}
          open={Boolean(anchorCourseEl)}
          onClose={this.handleCloseCourse}
        >
        {this.state.courses.map((course, index) => (
          <MenuItem key={course.course_number} id={course.course_number} value={course.level} onClick={this.handleCloseCourse}>
          {course.department} {course.level}
          </MenuItem>
        ))}
        </Menu>
      </div>
    );
  }
}

export default CourseDropDown;
