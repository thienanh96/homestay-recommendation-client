import {
    GET_DETAIL_HOMESTAY_REQUEST,
    GET_DETAIL_HOMESTAY_SUCCESS,
    GET_DETAIL_HOMESTAY_FAILURE
  } from "../constants/detailHomestay";
  


  export const getDetailHomestayRequest = (homestayId) => {
    return {
        type: GET_DETAIL_HOMESTAY_REQUEST,
        homestayId
    }
  }


  