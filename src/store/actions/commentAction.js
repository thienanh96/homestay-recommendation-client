import {
  GET_COMMENTS_REQUEST,
  CREATE_COMMENT_REQUEST
} from "../constants/comments";



export const getCommentsRequest = (homestayId, limit, offset) => {
  return {
    type: GET_COMMENTS_REQUEST,
    homestayId,
    limit,
    offset
  }
}

export const createCommentRequest = (homestayId, content,resolve,reject) => {
  return {
    type: CREATE_COMMENT_REQUEST,
    homestayId,
    content,
    resolve,
    reject
  }
}


