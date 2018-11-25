import React, { Component } from "react"
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SideButtons from '../components/side_buttons.js';

class FormTextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  handleChange = value => event => {
    this.setState({
      [value]: event.target.value,
    });
    this.props.onChange(this.props.id, event.target.value);
  };

  render() {
    return (
      <TextField
        id="standard-name"
        label={this.props.label}
        className={this.props.textField}
        value={this.state.value}
        onChange={this.handleChange('value')}
        margin="normal"
      />
    )
  }
}

export default FormTextField
