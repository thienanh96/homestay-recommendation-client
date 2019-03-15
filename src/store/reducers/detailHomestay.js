import {
    GET_DETAIL_HOMESTAY_REQUEST,
    GET_DETAIL_HOMESTAY_SUCCESS,
    GET_DETAIL_HOMESTAY_FAILURE
} from "../constants/detailHomestay";

// reducer with initial state
const initialState = {
    startGetDetailHomestayRequest: false,
    detailHomestay: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_HOMESTAY_REQUEST:
            return { ...state, startGetDetailHomestayRequest: true }
        case GET_DETAIL_HOMESTAY_SUCCESS:
            return { ...state, detailHomestay: action.detailHomestay, startGetDetailHomestayRequest: false }
        case GET_DETAIL_HOMESTAY_FAILURE:
            return { ...state, detailHomestay: [], startGetDetailHomestayRequest: false }
        default:
            return state;
    }
}

