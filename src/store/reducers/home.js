import {
    GET_BEST_HOMESTAY_FAILURE,
    GET_BEST_HOMESTAY_REQUEST,
    GET_BEST_HOMESTAY_SUCCESS,
    GET_BEST_TRAVELLER_FAILURE,
    GET_BEST_TRAVELLER_REQUEST,
    GET_BEST_TRAVELLER_SUCCESS,
    GET_CONFORM_HOMESTAY_FAILURE,
    GET_CONFORM_HOMESTAY_REQUEST,
    GET_CONFORM_HOMESTAY_SUCCESS
} from "../constants/home";
// reducer with initial state
const initialState = {
    startBestHomestayRequest: false,
    startBestTravellerRequest: false,
    startGetConformHomestayRequest: false,
    bestHomestays: [],
    bestTravellers: [],
    conformHomestays: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_BEST_HOMESTAY_REQUEST:
            return { ...state, startBestHomestayRequest: true }
        case GET_BEST_HOMESTAY_SUCCESS:
            return { ...state, bestHomestays: action.homestays, startBestHomestayRequest: false }
        case GET_BEST_HOMESTAY_FAILURE:
            return { ...state, bestHomestays: [], startBestHomestayRequest: false }
        case GET_BEST_TRAVELLER_REQUEST:
            return { ...state, startBestTravellerRequest: true }
        case GET_BEST_TRAVELLER_SUCCESS:
            return { ...state, travellers: action.travellers, startBestTravellerRequest: false }
        case GET_BEST_TRAVELLER_FAILURE:
            return { ...state, travellers: [], startBestTravellerRequest: false }
        case GET_CONFORM_HOMESTAY_REQUEST:
            return { ...state, startGetConformHomestayRequest: true }
        case GET_CONFORM_HOMESTAY_SUCCESS:
            return { ...state, conformHomestays: action.homestays, startGetConformHomestayRequest: false }
        case GET_CONFORM_HOMESTAY_FAILURE:
            return { ...state, conformHomestays: [], startGetConformHomestayRequest: false }
        default:
            return state;
    }
}

