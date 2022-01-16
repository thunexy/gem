import {
  PARTIAL_SIGN_IN,
  USER_SIGN_UP_SUCCESS,
  LOGOUT,
  SAVE_PIN,
  CAN_USE_FINGER_PRINT,
  CAN_USE_FACE_ID,
  UPDATE_STEP,
  UPDATE_PERCENT,
  UPDATE_PROFILE,
  CAN_USE_BIOMETRICS,
  RESET_PIN,
} from './types';

export const signUpUserSuccess = data => {
  return dispatch => {
    dispatch({
      type: USER_SIGN_UP_SUCCESS,
      payload: data,
    });
  };
};

export const updateProfile = data => {
  return dispatch => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: data,
    });
  };
};

export const partialSignin = () => {
  return dispactch => dispactch({type: PARTIAL_SIGN_IN});
};

export const savePin = pin => {
  return dispatch => dispatch({type: SAVE_PIN, pin});
};

export const resetCache = () => {
  return dispatch => dispatch({type: LOGOUT});
};

export const saveFingerprintStatus = status => {
  return dispatch => dispatch({type: CAN_USE_FINGER_PRINT, status});
};

export const saveFaceIdStatus = status => {
  return dispatch => dispatch({type: CAN_USE_FACE_ID, status});
};

export const saveBiometrics = (faceId, fingerprint, pin) => {
  return dispatch =>
    dispatch({type: CAN_USE_BIOMETRICS, faceId, fingerprint, pin});
};

export const resetPin = () => {
  return dispatch => dispatch({type: RESET_PIN});
};

export const updateStep = data => dispatch =>
  dispatch({
    type: UPDATE_STEP,
    data,
  });

export const updatePercent = data => dispatch =>
  dispatch({
    type: UPDATE_PERCENT,
    data,
  });
