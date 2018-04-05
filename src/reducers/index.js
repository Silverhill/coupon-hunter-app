import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './userReducer';

export default combineReducers({
  form,
  user,
});
