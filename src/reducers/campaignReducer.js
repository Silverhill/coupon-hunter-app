import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
  allCampaigns: [],
};

const allCampaigns = (state = initialState.allCampaigns, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_CAMPAIGNS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  allCampaigns,
});
