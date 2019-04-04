import {
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS
} from "../constants/profile";
// reducer with initial state
const initialState = {
    startUpdateProfileRequest: false,
    profile: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return { ...state, startUpdateProfileRequest: true }
        case UPDATE_PROFILE_SUCCESS:
            return { ...state, startUpdateProfileRequest: false }
        case UPDATE_PROFILE_FAILURE:
            return { ...state, startUpdateProfileRequest: false }
        case GET_PROFILE_REQUEST:
            return { ...state}
        case GET_PROFILE_SUCCESS:
            return { ...state, profile: action.profile }
        case GET_PROFILE_FAILURE:
            return { ...state, profile: null }
        default:
            return state;
    }
}

