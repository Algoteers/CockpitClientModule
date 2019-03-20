import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './Components/HomePage';
import Signals from './Components/Signals';

const App = () => (
  <div className='cockpitModule'>
    <Switch>
      <Route exact path='/cockpit/' component={HomePage} />
      <Route exact path='/cockpit/signals' component={Signals} />
    </Switch>
  </div>
);

export default App;
