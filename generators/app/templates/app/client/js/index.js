import { en, pt_BR } from 'locales';

import React from 'react';
import { render } from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { Provider } from 'react-redux';

import store from 'redux/store';
import routes from 'config/routes';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/app'
});

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      { routes }
    </Router>
  </Provider>
), document.getElementById('react-router'));
