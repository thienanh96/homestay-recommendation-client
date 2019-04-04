import {
    CLIENT_SET,
    CLIENT_UNSET,
    LOGIN_REQUESTING,
    LOGOUT_REQUEST
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
    return {
      type: LOGOUT_REQUEST
    };
  };
  export function setClient(token) {
    
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
  