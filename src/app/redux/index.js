import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import loadingReducer from './reducers/loading';

export default () => {
  const store = createStore(
    combineReducers(
      {
        loading: loadingReducer,
      },
    ),
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    ),
  );

  return store;
};
