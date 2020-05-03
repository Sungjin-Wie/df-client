import React from 'react';
import { Home, Search, Navigation } from 'components';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CenterWrapper } from 'lib';
const App = () => {
  return (
    <>
      <Navigation />
      <HashRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/searchresult/:server/:name' component={Search} />
        </Switch>
      </HashRouter>
    </>
  );
};
export default CenterWrapper(App);
