import {
    GET_MYRATE_REQUEST,
    UPDATE_COUNT_RATE
} from "../constants/rateHomestay";



export const getMyRateHomestayRequest = (homestayId) => {
    return {
        type: GET_MYRATE_REQUEST,
        homestayId
    }
}

export const updateCountRate = (typeRate,meRate) => {
    return {
        type: UPDATE_COUNT_RATE,
        typeRate,
        meRate
    }
}





