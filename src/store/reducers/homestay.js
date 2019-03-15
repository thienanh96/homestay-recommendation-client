import {
    GET_HOMESTAY_REQUEST,
    GET_HOMESTAY_FAILURE,
    GET_HOMESTAY_SUCCESS
} from "../constants/homestay";
// reducer with initial state
const initialState = {
    startHomestayRequest: false,
    homestays: [],
    total: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOMESTAY_REQUEST:
            return { ...state, startHomestayRequest: true }
        case GET_HOMESTAY_SUCCESS:
            return { ...state, homestays: action.homestays, startHomestayRequest: false,total: action.total }
        case GET_HOMESTAY_FAILURE:
            return { ...state, homestays: [], startHomestayRequest: false }
        default:
            return state;
    }
}

