import {
    UPDATE_PROFILE_REQUEST,
    GET_PROFILE_REQUEST,
    GET_LIST_PROFILE_REQUEST
} from "../constants/profile";



export const updateProfileRequest = (body, resolve, reject) => {
    return {
        type: UPDATE_PROFILE_REQUEST,
        body,
        resolve,
        reject
    }
}

export const getProfileRequest = (params) => {
    return {
        type: GET_PROFILE_REQUEST,
        params
    }
}

export const getListProfileRequest = (limit, offset) => {
    return {
        type: GET_LIST_PROFILE_REQUEST,
        limit,
        offset
    }
}




