import React from 'react';

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
          title='Orders'
          text='Here you can instruct your bot to do your bidding'
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
          {value === 0 && <TabContainer><Ongoing /></TabContainer>}
          {value === 1 && <TabContainer><Past /></TabContainer>}
          {/* <Query
            query={hostedEventsCalls.EVENTS_EVENTSBYHOST}
            variables={{ maxStartDate: time.now, minEndDate: time.now }}
          >
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              return (
                <React.Fragment>
                  {value === 0 && <TabContainer><Ongoing Events={data.events_Events} /></TabContainer>}
                </React.Fragment>
              );
            }}
          </Query>
          <Query
            query={hostedEventsCalls.EVENTS_EVENTSBYHOST}
            variables={{ maxEndDate: time.now }}
          >
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return `Error! ${error.message}`;
              return (
                <React.Fragment>
                  {value === 2 && <TabContainer><History Events={data.events_Events} /></TabContainer>}
                </React.Fragment>
              );
            }}
          </Query> */}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Search);
