import { AsyncStorage } from 'react-native';
import decode from 'jwt-decode';
import moment from 'moment';
import { HEADER_AUTHENTICATION_KEY } from '../constants';
import store from '../store';

const notAuthorized = false;
const authorized = true;

export const getAuthenticationAsync = async () => {
  try {
    authentication = await AsyncStorage.getItem(HEADER_AUTHENTICATION_KEY);
  } catch (error) {
    return false;
  }

  return authentication;
}

export const removeAuthenticationAsync = async () => {
  try {
    await AsyncStorage.removeItem(HEADER_AUTHENTICATION_KEY);
  } catch (error) {
    return false;
  }

  return true;
}

export const isAuthorized = async () => {
  const token = await getAuthenticationAsync();

  if(!token) {
    await removeAuthenticationAsync();
    return { authorized: notAuthorized, token };
  }

  try {
    const { exp } = await decode(token);

    if((exp * 1000) < moment().valueOf()) {
      await removeAuthenticationAsync();
      return { authorized: notAuthorized, token };
    }

  } catch (error) {
    await removeAuthenticationAsync();
    return { authorized: notAuthorized, token };
  }

  return { token, authorized };
}