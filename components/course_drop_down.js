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
      anchorSemesterEl: null,
      selectedDepartment: 'Department',
      selectedCourseID: null,
      selectedCourseName: 'Course',
      selectedCourseSemester: 'Semester',
      courses: [],
      semesters: [],
    };
  };

  handleOpenDepartment = event => {
    this.setState({
      anchorDepartmentEl: event.currentTarget
    });
  };

  handleOpenCourse = event => {
    this.setState({
      anchorCourseEl: event.currentTarget
    });
  };

  handleOpenSemester = event => {
    this.setState({
      anchorSemesterEl: event.currentTarget
    });
  }

  handleCloseDepartment = async (event) => {
    this.setState({
      anchorDepartmentEl: null,
      selectedDepartment: event.target.id
     });

     const courses = await fetch('http://35.237.162.74:3000/api/v1/dropdown/course/' + event.target.id);
     const coursesJson = await courses.json();
     this.setState({
       courses: coursesJson,
     });
  };

  handleCloseCourse = async (event) => {
    this.setState({
      anchorCourseEl: null,
      selectedCourseID: event.target.id,
      selectedCourseName: event.target.value,
    });
    const semesters = await fetch('http://35.237.162.74:3000/api/v1/dropdown/semesters/' + event.target.id);
    const semestersJson = await semesters.json();
    this.setState({
      semesters: semestersJson
    });
    // this.props.onSelectCourse(event.target.id);
  };



  handleCloseSemester = event => {
    this.setState({
      anchorSemesterEl: null,
      selectedCourseSemester: event.target.value,
    });
    this.props.onSelectCourse(this.state.selectedCourseID, event.target.value);
  }

  render() {
    const { anchorDepartmentEl } = this.state;
    const { anchorCourseEl } = this.state;
    const { anchorSemesterEl } = this.state;
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

        <Button
          aria-owns={anchorSemesterEl ? 'semester-drop-down' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpenSemester}
        >
          {this.state.selectedCourseSemester}
        </Button>
        <Menu
          id="semester-drop-down"
          anchorEl={anchorSemesterEl}
          open={Boolean(anchorSemesterEl)}
          onClose={this.handleCloseSemester}
        >
        {this.state.semesters.map((semester, index) => (
          <MenuItem key={semester.course_number} id={semester.course_number} value={semester.name} onClick={this.handleCloseSemester}>
          {semester.name}
          </MenuItem>
        ))}
        </Menu>
      </div>
    );
  }
}

export default CourseDropDown;
