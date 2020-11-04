import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { FlightTable } from './components';
import { store } from './store/';

import GlobalStyles from './styled/GlobalStyles';

const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyles/>
      <Switch>
        <Route path='/' component={FlightTable}/>
        <Redirect from="*" to="/"/>
      </Switch>
    </Router>
  </Provider>
);

export default App;
