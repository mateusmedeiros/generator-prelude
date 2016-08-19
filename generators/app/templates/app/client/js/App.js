import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import { Route } from 'react-router';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/app'
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" />
        </Router>
      </Provider>
    );
  }
}
