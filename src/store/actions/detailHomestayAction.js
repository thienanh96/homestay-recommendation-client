import {
  GET_DETAIL_HOMESTAY_REQUEST,
  RATE_DETAIL_HOMESTAY_REQUEST,
  GET_SIMILAR_HOMESTAY_REQUEST,
  UPDATE_HOMESTAY_REQUEST
} from "../constants/detailHomestay";



export const getDetailHomestayRequest = (homestayId,typeGet) => {
  return {
    type: GET_DETAIL_HOMESTAY_REQUEST,
    homestayId,
    typeGet
  }
}

export const rateDetailHomestay = (homestayId, userId, typeRate) => {
  return {
    type: RATE_DETAIL_HOMESTAY_REQUEST,
    homestayId,
    userId,
    typeRate
  }
}

export const getSimilarHomestayRequest = (homestayId) => {
  return {
    type: GET_SIMILAR_HOMESTAY_REQUEST,
    homestayId
  }
}

export const updateHomestayRequest = (homestayId,body, resolve, reject) => {
  return {
    type: UPDATE_HOMESTAY_REQUEST,
    body,
    homestayId,
    resolve,
    reject
  }
}


