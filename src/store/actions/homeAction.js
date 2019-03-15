import {
    GET_BEST_HOMESTAY_FAILURE,
    GET_BEST_HOMESTAY_REQUEST,
    GET_BEST_HOMESTAY_SUCCESS,
    GET_BEST_TRAVELLER_FAILURE,
    GET_BEST_TRAVELLER_REQUEST,
    GET_BEST_TRAVELLER_SUCCESS
} from "../constants/home";



export const getBestHomestayRequest = (params) => {
    return {
        type: GET_BEST_HOMESTAY_REQUEST,
        params
    }
}

export const getBestTravellerRequest = (params) => {
    return {
        type: GET_BEST_TRAVELLER_REQUEST,
        params
    }
}


