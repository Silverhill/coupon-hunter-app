import { AsyncStorage } from 'react-native';
import * as actionTypes from './actionTypes';

export const setCampaigns = (campaigns) => ({
  type: actionTypes.SET_CAMPAIGNS,
  payload: campaigns,
});