import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './userReducer';
import campaigns from './campaignReducer';

export default combineReducers({
  form,
  user,
  campaigns,
});
