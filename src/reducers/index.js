import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './userReducer';
import campaigns from './campaignReducer';
import notifications from './notificationReducer';

export default combineReducers({
  form,
  user,
  campaigns,
  notifications,
});
