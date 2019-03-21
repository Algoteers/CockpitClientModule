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
  NotificationImportantRounded as OngoingIcon,
  HistoryRounded as PastIcon,
  ArchiveRounded as ArchivedIcon,
  ExposurePlus1Rounded as AddOrder,
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
    oldClones: operations_HistoryClones {
      id
      processName
      beginDatetime
      endDatetime
      teamName
      botName
      signals {
        id
        state
        context
        orderData
        changeLogs {
          reason
          state
          context
          orderData
          date
        }
      }
    }
    activeClones: operations_Clones {
      id
      processName
      beginDatetime
      endDatetime
      teamName
      botName
      signaledSignals: signals(state: SIGNALED) {
        id
        state
        context
        orderData
        changeLogs {
          reason
          state
          context
          orderData
          date
        }
      }
      signals {
        id
        state
        context
        orderData
        changeLogs {
          reason
          state
          context
          orderData
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
                label='Action needed'
                icon={<OngoingIcon />}
              />
              <Tab
                className={classes.tabTitle}
                label='Past'
                icon={<PastIcon />}
              />
              <Tab
                className={classes.tabTitle}
                label='Shuted down bots'
                icon={<ArchivedIcon />}
              />
              <Tab
                className={classes.tabTitle}
                label='Order on your own'
                icon={<AddOrder />}
              />
            </Tabs>
          </AppBar>
          <Query query={GET_SIGNALS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;

              return (
                <React.Fragment>
                  {value === 0 && <TabContainer><Ongoing data={data.activeClones} /></TabContainer>}
                  {value === 1 && <TabContainer><Past data={data.activeClones} /></TabContainer>}
                  {value === 2 && <TabContainer><Past data={data.oldClones} /></TabContainer>}
                  {value === 3 && <TabContainer><Past data={data.activeClones} /></TabContainer>}
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
