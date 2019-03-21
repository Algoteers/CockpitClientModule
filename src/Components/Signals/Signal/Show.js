import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class ShowSignal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  render() {
    const { signal } = this.props;
    return (
      <Typography>
        {signal.id}. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.
      </Typography>
    );
  }
}

export default withStyles(styles)(ShowSignal);
