import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Typography,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import {
  GetApp as OngoingIcon,
  History as PastIcon,
} from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

import BannerTopBar from '../BannerTopBar';

import {
  Ongoing,
  Past,
} from './Tabs';


const GET_SIGNALS = gql`
  {
    signaled: operations_Clones{
      id
      processName
      beginDatetime
      endDatetime
      teamName
      botName
      signals(state: SIGNALED){
        context
        orderData
        changeLogs{
          reason
          fromState
          toState
          date
        }
      }
    }
    all: operations_Clones{
      id
      processName
      beginDatetime
      endDatetime
      teamName
      botName
      signals(state: SIGNALED){
        context
        orderData
        changeLogs{
          reason
          fromState
          toState
          date
        }
      }
    }
  }
`;

function TabContainer(props) {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <React.Fragment>
        <BannerTopBar
          size='medium'
          title='Signals'
          text='The bot is awaiting for your authorisation in this page'
          backgroundUrl='https://superalgos.org/img/photos/events.jpg'
        />
        <div className={classes.root}>
          <AppBar position='static' color='default'>
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons='off'
              indicatorColor='primary'
              textColor='primary'
            >
              <Tab
                className={classes.tabTitle}
                label='Ongoing'
                icon={<OngoingIcon />}
              />
              <Tab
                className={classes.tabTitle}
                label='Past'
                icon={<PastIcon />}
              />
            </Tabs>
          </AppBar>
          <Query query={GET_SIGNALS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              return (
                <React.Fragment>
                  {value === 0 && <TabContainer><Ongoing data={data.signaled} /></TabContainer>}
                  {value === 1 && <TabContainer><Past data={data.all} /></TabContainer>}
                </React.Fragment>
              );
            }}
          </Query>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Search);
