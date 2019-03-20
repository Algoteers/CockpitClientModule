import React from 'react';
import { Typography } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles';

class Ongoing extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className='container'>
        <Typography
          className={classes.title}
          variant='h4'
          align='center'
          color='textPrimary'
          gutterBottom
        >
          A list of ongoing orders
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(Ongoing);
