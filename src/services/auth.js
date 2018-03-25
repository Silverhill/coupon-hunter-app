import { AsyncStorage } from 'react-native';
import { HEADER_AUTHENTICATION_KEY } from '../constants';


export const getAuthenticationAsync = async () => {
  let authentication;
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
  } catch (err) {
    return false;
  }

  return true;
}