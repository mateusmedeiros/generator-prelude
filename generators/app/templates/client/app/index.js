import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { configureStore } from 'store';
import App from 'app';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render((
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('app', () => {
    const NextApp = require('app').default;
    render((
      <AppContainer>
        <NextApp  store={store} history={history} />
      </AppContainer>
    ), document.getElementById('root'));
  });
}
