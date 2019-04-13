import {
  GET_HOMESTAY_REQUEST,
  CREATE_HOMESTAY_REQUEST,
  CREATE_HOMESTAY_SIMILARITY_REQUEST,
  ADMIN_APPROVE_HOMESTAY_REQUEST
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

export const approveHomestayRequest = (homestayId,resolve,reject) => {
  return {
    type: ADMIN_APPROVE_HOMESTAY_REQUEST,
    homestayId,
    resolve,
    reject
  }
}



