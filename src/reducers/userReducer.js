import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  profile: {},
  auth: {
    token: '',
    logged: false,
  }
};

const auth = (state = initialState.auth, action = {}) => {
  switch (action.type) {
    case actionTypes.AUTH_VALID:
      return {
        ...state,
        token: action.payload,
        logged: true,
      };
    case actionTypes.AUTH_NOTVALID:
      return {
        ...state,
        token: '',
        logged: false,
      };
    default:
      return state;
  }
};

const profile = (state = initialState.profile, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return action.payload;
    default:
      return state;
  }
}

const user = combineReducers({
  auth,
  profile,
});

export default user;