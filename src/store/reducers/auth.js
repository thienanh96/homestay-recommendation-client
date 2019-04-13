import { CLIENT_SET, CLIENT_UNSET } from "../constants/auth";
import jwtDecode from "jwt-decode";
let data = localStorage.getItem("token")
  ? jwtDecode(localStorage.getItem("token"))
  : {};
const initialSate = {
  user: data,
  token: localStorage.getItem("token")
};
console.log("dataaa=====", data);
const reducer = function clientReducer(state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      console.log('sagaaaaL ',action)
      return {
        user: jwtDecode(action.token),
        token: action.token
      };

    case CLIENT_UNSET:
      localStorage.clear()
      return {
        user: null,
        token: null
      };

    default:
      return state;
  }
};

export default reducer;
