import React from 'react';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';
import Root from './Root';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/app'
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={Root}/>
        </Router>
      </Provider>
    );
  }
}
