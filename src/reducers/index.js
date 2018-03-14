import { combineReducers } from 'redux';
import routes from './routes';
import { reducer as form } from 'redux-form';
import user from './userReducer';

export default combineReducers({
  routes,
  form,
  user,
});
