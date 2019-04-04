import {
    GET_MYRATE_FAILURE,
    GET_MYRATE_REQUEST,
    GET_MYRATE_SUCCESS,
    UPDATE_COUNT_RATE
  } from "../constants/rateHomestay";
// reducer with initial state
const initialState = {
    startGetMyRateRequest: false,
    posts: [],
    meRate: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_MYRATE_REQUEST:
            return { ...state, startGetMyRateRequest: true }
        case GET_MYRATE_SUCCESS:
            return { ...state, meRate: action.meRate, startGetMyRateRequest: false}
        case GET_MYRATE_FAILURE:
            return { ...state, meRate: [], startGetMyRateRequest: false }
        default:
            return state;
    }
}

