import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from 'reducers';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      applyMiddleware(sagaMiddleware)
    )
  );

  if (module.hot) {
    module.hot.accept('reducers', () => {
      const nextReducer = equire('reducers').default
      store.replaceReducer(nextReducer);
    });
  }

  store.close = () => store.dispatch(END);
  sagaMiddleware.run(rootSaga);

  return store;
}
