import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  render() {
    const { signal } = this.props;
    if (signal) {
      return (
        <Typography>
          {signal.id}. Here I show the form to edit this.
        </Typography>
      );
    }
    return (
      <Typography>
        Place your order, and hope for the best.
      </Typography>
    );
  }
}

export default withStyles(styles)(Order);
