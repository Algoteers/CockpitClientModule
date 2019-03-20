import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Search from './Components/Search';

const App = () => (
  <div className='cockpitModule'>
    <Switch>
      <Route exact path='/cockpit/' component={Search} />
    </Switch>
  </div>
);

export default App;
