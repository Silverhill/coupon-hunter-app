import {
  SHOW_ALERT, HIDE_ALERT,
} from '../actions/actionTypes';
import { combineReducers } from 'redux';

const initialState = {
  alert: {
    isDisplaying: false,
    content: {
      message: '',
      actions: [],
      alertContent: [],
    }
  }
}

export const alert = (state = initialState.alert, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        isDisplaying: true,
        content: {
          ...state.content,
          ...action.payload,
        },
      };
    case HIDE_ALERT:
      return initialState.alert;
    default:
      return initialState.alert;
  }
}

export default combineReducers({
  alert,
})
