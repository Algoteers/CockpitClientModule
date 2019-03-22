import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';
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
    const {
      state, context, orderData, changeLogs,
    } = signal;
    return (
      <React.Fragment>
        <Typography>
          State: {state}
        </Typography>
        <Typography>
          Context: <ReactJson src={context || {}} />
        </Typography>
        <Typography>
          OrderData: <ReactJson src={orderData || {}} />
        </Typography>
        <Typography>
          ChangeLogs: <ReactJson src={changeLogs || {}} />
        </Typography>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ShowSignal);
