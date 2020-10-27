import React from 'react';
import GlobalStyles from './styled/GlobalStyles';
import FlightTable from './components/FlightTable/FlightTable';
import { BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/';

const App = () => (
  <Provider store={store}>
    <Router>
      <GlobalStyles/>
      <Switch>
        <Route path='/' component={FlightTable}/>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  </Provider>
);

export default App;
