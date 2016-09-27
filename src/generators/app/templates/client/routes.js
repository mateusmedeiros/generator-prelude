import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from 'containers/app';
import HomePage from 'containers/home-page';
import NotFoundPage from 'components/not-found-page';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="*" component={NotFoundPage}/>
  </Route>
);
