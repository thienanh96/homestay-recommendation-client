import {
    GET_COMMENTS_FAILURE,
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_REQUEST,
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_REQUEST
} from "../constants/comments";
// reducer with initial state
const initialState = {
    startGetCommentsRequest: false,
    startCreateCommentsRequest: false,
    comments: [],
    total: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS_REQUEST:
            return { ...state, startGetCommentsRequest: true }
        case GET_COMMENTS_SUCCESS:
            return { ...state, comments: action.comments, startGetCommentsRequest: false, total: action.total }
        case GET_COMMENTS_FAILURE:
            return { ...state, comments: [], startGetCommentsRequest: false }
        case CREATE_COMMENT_REQUEST:
            return { ...state, startCreateCommentsRequest: true }
        case CREATE_COMMENT_SUCCESS:
            let newComments = [action.comment,...state.comments]
            return { ...state, comments: newComments ,startCreateCommentsRequest: false}
        case CREATE_COMMENT_FAILURE:
            return { ...state, startCreateCommentsRequest: false }
        default:
            return state;
    }
}

