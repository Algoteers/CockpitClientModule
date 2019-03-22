import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Show from './Show';
import Order from './Order';
import styles from '../styles';

class AnswerToSignal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: null,
    };
  }

  render() {
    const { signal } = this.props;
    return (
      <Grid container>
        <Grid item md={6} xs={12} >
          <Order signal={signal} />
        </Grid>
        <Grid item md={6} xs={12} >
          <Show signal={signal} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AnswerToSignal);
