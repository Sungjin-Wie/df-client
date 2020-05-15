import React, { useReducer } from 'react';
import { Home, Search, Navigation, Auction, NotFound, Info } from 'components';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { reducer, initialState, Context, Loading } from 'lib';

const useStyles = makeStyles({
  app: {
    width: 1200,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    alignItems: 'center',
    margin: '0 auto',
  },
});

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const css = useStyles();
  return (
    <Context.Provider value={{ store, dispatch }}>
      <div className={css.app}>
        <div style={{ backgroundColor: 'white' }}>
          {window.innerWidth} x {window.innerHeight}
        </div>
        <Navigation />
        {store.loading ? (
          <Loading />
        ) : (
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/searchresult/:server/:name' component={Search} />
              <Route path='/auction' component={Auction} />
              <Route path='/info/:server/:id' component={Info} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        )}
      </div>
    </Context.Provider>
  );
};
export default App;
