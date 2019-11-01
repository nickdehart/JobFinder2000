import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const logger = createLogger({ collapsed: true });

let composeEnhancers;

composeEnhancers = composeWithDevTools(applyMiddleware(thunk, logger));

const store = createStore(rootReducer, composeEnhancers);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;