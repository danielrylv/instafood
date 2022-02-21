import { createStore, applyMiddleware, combineReducers } from 'redux';
import user from './reducers/user';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  user,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
