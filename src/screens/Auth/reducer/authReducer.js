import {
  USER_SIGN_UP_SUCCESS,
  PARTIAL_SIGN_IN,
  LOGOUT,
  SAVE_PIN,
  CAN_USE_FACE_ID,
  CAN_USE_FINGER_PRINT,
  UPDATE_STEP,
  UPDATE_PERCENT,
  UPDATE_PROFILE,
  CAN_USE_BIOMETRICS,
  RESET_PIN,
} from '../actions/types';
const initialState = {
  access_token: '',
  isLoggedIn: false,
  canUseFingerprint: null,
  canUseFaceId: null,
  pin: null,
};

/**
 * authentication reducer
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_UP_SUCCESS:
      const {token, status, status_code, message, ...others} = action.payload;
      return {
        ...state,
        ...others,
        token: token?.access_token,
      };
    case PARTIAL_SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...others,
      };
    case SAVE_PIN:
      return {
        ...state,
        pin: action.pin,
      };
    case UPDATE_STEP:
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          steps: {
            ...state.onboarding.steps,
            ...action.data,
          },
        },
      };
    case UPDATE_PERCENT: {
      return {
        ...state,
        onboarding: {
          ...state.onboarding,
          percent_completed: 100,
          steps: {
            ...state.onboarding.steps,
            ...action.data,
          },
        },
      };
    }
    case CAN_USE_FACE_ID:
      return {
        ...state,
        canUseFaceId: action.status,
      };
    case CAN_USE_FINGER_PRINT:
      return {
        ...state,
        canUseFingerprint: action.status,
      };
    case RESET_PIN:
      return {
        ...state,
        pin: null,
      }
    case CAN_USE_BIOMETRICS:
      return {
        ...state,
        canUseFaceId: action.faceId,
        canUseFingerprint: action.fingerprint,
        pin: action.pin,
        isLoggedIn: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        canUseFaceId: state.canUseFaceId,
        canUseFingerprint: state.canUseFingerprint,
        pin: state.pin,
        email_address: state.customer?.email_address,
      };
    default:
      return state;
  }
};
