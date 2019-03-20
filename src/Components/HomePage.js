import React from 'react';
import Typography from '@material-ui/core/Typography';

import BannerTopBar from './BannerTopBar';

const Landing = () => (
  <React.Fragment>
    <BannerTopBar size='big' title='Cockpit Module' text='Responsible realtime communication with your running bots.'
      backgroundUrl='https://superalgos.org/img/photos/teams.jpg' />
    <div className='homePage container'>
      <Typography variant='h1' align='center' className='title'>
        Welcome to the cockpit Module!
      </Typography>
      <Typography variant='h2' align='center' className='subtitle'>
        Accept, refuse, study.
      </Typography>
      <div className='column'>
        <Typography align='justify'>
          In this module you will be able to allow, refuse, and study the history of all the trades you different bots presented you with.
        </Typography>
      </div>
      <div className='column'>
        <Typography align='justify'>
          In addition, you will be able to interact with our virtual assistant directly in order to place the orders you see fit.
        </Typography>
      </div>
    </div>
  </React.Fragment>
);

export default Landing;
