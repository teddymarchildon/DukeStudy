import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class RatingsDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      selectedRating: 'Rating'
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = (rating) => {
    this.setState({
      anchorEl: null,
      selectedRating: rating,
    });
    this.props.onSelectedRating(rating);
  };

  render() {
    const { anchorEl } = this.state;
    const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
        {this.state.selectedRating}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
        {ratings.map((rating, index) => (
          <MenuItem value={rating} onClick={() => this.handleClose(rating)}>{rating}</MenuItem>
        ))}
        </Menu>
      </div>
    );
  }
}

export default RatingsDropDown;
