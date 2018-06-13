import * as actionType from './actionTypes';

export const showAlert = ({ message = '', actions = [], alertContent = [] }) => {
  return {
    type: actionType.SHOW_ALERT,
    payload: {
      message,
      actions,
      alertContent,
    }
  }
}

export const hideAlert = () => ({
  type: actionType.HIDE_ALERT,
})