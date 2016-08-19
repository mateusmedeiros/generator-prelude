// This needs to go before everything else
import 'react-hot-loader/patch';

import { en, pt_BR } from 'locales';

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import App from './App';

import getStore from 'store';

const store = getStore();

render((
  <AppContainer>
    <App store={store} />
  </AppContainer>
), document.getElementById('react-router'));

if (module.hot) {
  module.hot.accept('./App', () => {
    let NextApp = require('./App').default;
    render((
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>
    ), document.getElementById('react-router'));
  });
}
