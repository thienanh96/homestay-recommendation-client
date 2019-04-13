import {
  CLIENT_SET,
  CLIENT_UNSET,
  LOGIN_REQUESTING,
  LOGOUT_REQUEST,
  REGISTER_REQUEST
} from "../constants/auth";


//   import { createFormAction } from "redux-form-saga";

//   export const login = createFormAction("Login");
export const loginRequest = function loginRequest(
  { username, password },
  resolve,
  reject
) {
  return {
    type: LOGIN_REQUESTING,
    username,
    password,
    resolve,
    reject
  };
};
export const logoutRequest = function logoutRequest() {
  console.log('loggg: ')
  return {
    type: CLIENT_UNSET
  };
};
export function setClient(token) {
  console.log("TCL: setClient -> token", token)
  return {
    type: CLIENT_SET,
    token
  };
}

export function unsetClient() {
  return {
    type: CLIENT_UNSET
  };
}

export function registerRequest(body, resolve, reject) {
  return {
    type: REGISTER_REQUEST,
    body,
    resolve,
    reject
  };
};
