import {
  GET_HOMESTAY_REQUEST,
  CREATE_HOMESTAY_REQUEST,
  CREATE_HOMESTAY_SIMILARITY_REQUEST,
} from "../constants/homestay";



export const getHomestayRequest = (params,notAllowed) => {
  return {
    type: GET_HOMESTAY_REQUEST,
    params,
    notAllowed
  }
}

export const createHomestayRequest = (body, resolve, reject) => {
  return {
    type: CREATE_HOMESTAY_REQUEST,
    body,
    resolve,
    reject
  }
}


export const createHomestaySimilarityRequest = (homestayId) => {
  return {
    type: CREATE_HOMESTAY_SIMILARITY_REQUEST,
    homestayId,
  }
}



