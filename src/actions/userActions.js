import { AsyncStorage } from 'react-native';
import * as actionTypes from './actionTypes';
import { HEADER_AUTHENTICATION_KEY } from '../constants';
import queries from './graphql/queries';
import axios from 'axios';

const authValid = (token) => ({
  type: actionTypes.AUTH_VALID,
  payload: token,
});

const authNotValid = () => ({
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

export const getAuthenticationAsync = () => async (dispatch, getState) => {
  let authentication;
  try {
    authentication = await AsyncStorage.getItem(HEADER_AUTHENTICATION_KEY);
  } catch (error) {
    // console.log(error);
  }

  return authentication;
}