import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import store from '../../redux/store';
import {resetCache} from '../../screens/Auth/actions/authActions';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const baseApiCall = async contentType => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': contentType || 'application/json',
  };
  // some comment
  const {token} = store.getState().authentication;
  try {
    headers.Authorization = `Bearer ${token}`;

    const axiosInstance = axios.create({
      headers,
      cancelToken: source.token,
    });

    return axiosInstance;
  } catch (error) {
    dispatchLogoutActions();
  }
};

export const cancelRequest = () => {
  source.cancel('Operation canceled due to new request.');
};

const apiCall = async (
  url,
  httpMethod,
  body,
  additionalParams,
  contentType,
) => {
  const axiosInstance = await baseApiCall(contentType);
  switch (httpMethod) {
    case 'post':
    case 'put':
      return axiosInstance[httpMethod](url, body, additionalParams);
    case 'get':
      return axiosInstance[httpMethod](url, body);
    case 'delete':
      return axiosInstance[httpMethod](url);
    default:
      return axiosInstance[httpMethod](url);
  }
};

const dispatchLogoutActions = () => {
  store.dispatch(resetCache());
};

const apiRequest = async (
  url,
  httpMethod,
  body = {},
  additionalParams = {},
  contentType,
) => {
  return new Promise(function (resolve, reject) {
    NetInfo.fetch().then(function (networkState) {
      // Let user make request if their device can reach the internet
      if (networkState.isInternetReachable) {
        apiCall(url, httpMethod, body, additionalParams, contentType)
          .then(response => {
            if (response.status < 400) {
              if (response.data.status >= 400) {
                // not really success so we reject
                reject(response.data);
              } else {
                // not an error so respond
                resolve(response.data);
              }
            } else {
              // we reject for now
              reject(response.data);
            }
          })
          .catch(err => {
            if (axios.isCancel(err)) {
            }
            if (err?.message) {
              // store.dispatch(showToast(err.message, 'error'))
            }
            if (err?.response) {
              if (err.response.status === 401) {
                dispatchLogoutActions();
              }
              reject(err);
            }
            reject(err);
          });
      } else {
        reject(new Error('Your network is unstable')); // If their device can't reach the internet, throw a network error
      }
    });
  });
};

export {apiRequest};
