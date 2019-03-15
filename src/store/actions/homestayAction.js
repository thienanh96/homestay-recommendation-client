import {
    GET_HOMESTAY_REQUEST,
    GET_HOMESTAY_SUCCESS,
    GET_HOMESTAY_FAILURE
  } from "../constants/homestay";
  


  export const getHomestayRequest = (params) => {
    return {
        type: GET_HOMESTAY_REQUEST,
        params
    }
  }


  