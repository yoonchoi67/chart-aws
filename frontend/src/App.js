import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { DataContextProvider } from "./views/dashboard/DataContext";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

class App extends Component {

  render() {
    return (
      <HashRouter>
        <DataContextProvider>

          <React.Suspense fallback={loading}>
            <Switch>
              <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </DataContextProvider>
      </HashRouter>
    );
  }
}

export default App;
