import { createStore, applyMiddleware, compose } from 'redux';

// other imports...
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];
// create store...
const enhancer = compose(
  applyMiddleware(...middleware),
);

// eslint-disable-next-line
const store = createStore(
  rootReducer,
  enhancer,
);

export default store;
