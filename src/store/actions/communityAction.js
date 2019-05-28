import {
  GET_POST_REQUEST,
  CREATE_POST_REQUEST,
  DELETE_POST_REQUEST,
  RATE_POST_REQUEST
} from "../constants/communtity";



export const getPostsRequest = (filter, limit, offset) => {
  return {
    type: GET_POST_REQUEST,
    filter,
    limit,
    offset
  }
}

export const createPostsRequest = (homestayId, content, resolve, reject) => {
  return {
    type: CREATE_POST_REQUEST,
    homestayId,
    content,
    resolve, reject
  }
}

export const deletePostsRequest = (postId, resolve, reject) => {
  return {
    type: DELETE_POST_REQUEST,
    postId,
    resolve, 
    reject
  }
}

export const ratePostRequest = (postId, resolve, reject,currentLike) => {
  return {
    type: RATE_POST_REQUEST,
    postId,
    resolve, 
    reject,
    currentLike
  }
}