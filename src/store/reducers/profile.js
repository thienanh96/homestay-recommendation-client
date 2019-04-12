import {
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_LIST_PROFILE_REQUEST,
    GET_LIST_PROFILE_FAILURE,
    GET_LIST_PROFILE_SUCCESS,
    DELETE_PROFILE_FAILURE,
    DELETE_PROFILE_REQUEST,
    DELETE_PROFILE_SUCCESS
} from "../constants/profile";
// reducer with initial state
const initialState = {
    startUpdateProfileRequest: false,
    startGetListProfileRequest: false,
    profile: null,
    listProfiles: {}
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
            return { ...state }
        case GET_PROFILE_SUCCESS:
            return { ...state, profile: action.profile }
        case GET_PROFILE_FAILURE:
            return { ...state, profile: null }
        case GET_LIST_PROFILE_REQUEST:
            return { ...state, startGetListProfileRequest: true }
        case GET_LIST_PROFILE_SUCCESS:
            return { ...state, listProfiles: action.profiles, startGetListProfileRequest: false }
        case GET_LIST_PROFILE_FAILURE:
            return { ...state, startGetListProfileRequest: false }
        case DELETE_PROFILE_REQUEST:
            return { ...state }
        case DELETE_PROFILE_SUCCESS:
            let newLists = state.listProfiles.dt.filter(el => el.id !== action.profileId)
            return {
                ...state, listProfiles: {
                    dt: newLists,
                    total: state.listProfiles.total - 1
                }
            }
        case DELETE_PROFILE_FAILURE:
            return { ...state }
        default:
            return state;
    }
}

