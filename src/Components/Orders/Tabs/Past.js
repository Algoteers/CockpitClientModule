import React from 'react';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class Past extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className='container'>
        <Typography
          className={classes.title}
          variant='display1'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          A list of passed orders
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Past);
