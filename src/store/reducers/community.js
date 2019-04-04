import {
    GET_POST_FAILURE,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    CREATE_POST_FAILURE,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS
} from "../constants/communtity";
// reducer with initial state
const initialState = {
    startGetPostsRequest: false,
    startCreatePostsRequest: false,
    successCreatePost: false,
    posts: [],
    totalPosts: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_POST_REQUEST:
            return { ...state, startGetPostsRequest: true }
        case GET_POST_SUCCESS:
            return { ...state, posts: action.posts, startGetPostsRequest: false, totalPosts: action.total }
        case GET_POST_FAILURE:
            return { ...state, posts: [], startGetPostsRequest: false }
        case CREATE_POST_REQUEST:
            return { ...state, startCreatePostsRequest: true }
        case CREATE_POST_SUCCESS:
            return { ...state, startCreatePostsRequest: false, successCreatePost: true }
        case CREATE_POST_FAILURE:
            return { ...state, startCreatePostsRequest: false, successCreatePost: false }
        default:
            return state;
    }
}

