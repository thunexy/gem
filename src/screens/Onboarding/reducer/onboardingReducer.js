// import {USER_SIGN_UP_SUCCESS} from '../actions/types';
// const initialState = {
//   access_token: '',
//   isLoggedIn: false,
// };

// /**
//  * authentication reducer
//  */
// export default (state = initialState, action) => {
//   switch (action.type) {
//     case USER_SIGN_UP_SUCCESS:
//       const {token, status, status_code, message, ...others} = action.payload;
//       return {
//         ...others,
//         token: token?.access_token,
//         isLoggedIn: true,
//       };
//     default:
//       return state;
//   }
// };
