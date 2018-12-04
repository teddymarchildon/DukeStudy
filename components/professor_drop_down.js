import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import fetch from 'node-fetch';

class ProfessorDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedUserID: null,
      selectedUserName: 'Select Professor',
    };
  };

  handleOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    console.log(event.target.id)
    console.log(event.target.value)
    this.setState({
      anchorEl: null,
      selectedUserID: event.target.id,
      selectedUserName: event.target.getAttribute('value'),
    });
    this.props.onSelectUser(event.target.id);
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'professor-drop-down' : undefined}
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          {this.state.selectedUserName}
        </Button>
        <Menu
          id="professor-drop-down"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        {this.props.users.map((professor, index) => (
          <MenuItem key={professor.netid} id={professor.netid} value={professor.name} onClick={this.handleClose}>
          {professor.name}
          </MenuItem>
        ))}
        </Menu>
      </div>
    );
  }
}

export default ProfessorDropDown;
