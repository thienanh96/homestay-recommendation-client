import {
  GET_HOMESTAY_REQUEST,
  CREATE_HOMESTAY_REQUEST,
  CREATE_HOMESTAY_SIMILARITY_REQUEST,
  ADMIN_APPROVE_HOMESTAY_REQUEST,
  ADMIN_DELETE_HOMESTAY_REQUEST,
  UPDATE_HOMESTAY_SIMILARITY_REQUEST,
  DELETE_HOMESTAY_SIMILARITY_REQUEST,
  ADMIN_LOCK_HOMESTAY_REQUEST
} from "../constants/homestay";



export const getHomestayRequest = (params, notAllowed,adminMode=null) => {
  return {
    type: GET_HOMESTAY_REQUEST,
    params,
    notAllowed,
    adminMode
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

export const updateHomestaySimilarityRequest = (homestayId) => {
  return {
    type: UPDATE_HOMESTAY_SIMILARITY_REQUEST,
    homestayId,
  }
}

export const deleteHomestaySimilarityRequest = (homestayId) => {
  return {
    type: DELETE_HOMESTAY_SIMILARITY_REQUEST,
    homestayId,
  }
}

export const approveHomestayRequest = (homestayId, resolve, reject) => {
  return {
    type: ADMIN_APPROVE_HOMESTAY_REQUEST,
    homestayId,
    resolve,
    reject
  }
}

export const lockHomestayRequest = (homestayId, resolve, reject) => {
  return {
    type: ADMIN_LOCK_HOMESTAY_REQUEST,
    homestayId,
    resolve,
    reject
  }
}


export const deleteHomestayRequest = (homestayId, resolve, reject) => {
  return {
    type: ADMIN_DELETE_HOMESTAY_REQUEST,
    homestayId,
    resolve,
    reject
  }
}



