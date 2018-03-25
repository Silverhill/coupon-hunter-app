import { AsyncStorage } from 'react-native';
import * as actionTypes from './actionTypes';
import { HEADER_AUTHENTICATION_KEY } from '../constants';

export const authValid = (token) => ({
  type: actionTypes.AUTH_VALID,
  payload: token,
});

export const authNotValid = () => ({
  type: actionTypes.AUTH_NOTVALID,
});

export const loginAsync = (token = '') => async (dispatch) => {
  if(token) {
    await AsyncStorage.setItem(HEADER_AUTHENTICATION_KEY, token);
    dispatch(authValid(token));
  }else {
    dispatch(authNotValid());
  }

  return { logged: !!token, token };
}