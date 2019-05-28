import { CLIENT_SET, CLIENT_UNSET } from "../constants/auth";
import jwtDecode from "jwt-decode";
let data = typeof window !== 'undefined' && localStorage.getItem("token")
  ? jwtDecode(localStorage.getItem("token"))
  : {};
const initialSate = {
  user: data,
  token:  typeof window !== 'undefined' ? localStorage.getItem("token"): null
};
console.log("dataaa=====", data);
const reducer = function clientReducer(state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      localStorage.setItem('token',action.token)
      return {
        user: jwtDecode(action.token),
        token: action.token
      };

    case CLIENT_UNSET:
      if (typeof window !== 'undefined') {
        localStorage.clear()
      }
      return {
        user: null,
        token: null
      };

    default:
      return state;
  }
};

export default reducer;
