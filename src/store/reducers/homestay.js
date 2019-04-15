import {
    GET_HOMESTAY_REQUEST,
    GET_HOMESTAY_FAILURE,
    GET_HOMESTAY_SUCCESS,
    CREATE_HOMESTAY_REQUEST,
    CREATE_HOMESTAY_FAILURE,
    CREATE_HOMESTAY_SUCCESS,
    ADMIN_APPROVE_HOMESTAY_REQUEST,
    ADMIN_APPROVE_HOMESTAY_FAILURE,
    ADMIN_APPROVE_HOMESTAY_SUCCESS,
    ADMIN_DELETE_HOMESTAY_REQUEST,
    ADMIN_DELETE_HOMESTAY_FAILURE,
    ADMIN_DELETE_HOMESTAY_SUCCESS
} from "../constants/homestay";
// reducer with initial state
const initialState = {
    startHomestayRequest: false,
    startCreateHomestayRequest: false,
    homestays: [],
    similarHomestays: [],
    total: 0
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_HOMESTAY_REQUEST:
            return { ...state, startHomestayRequest: true, homestays: [] }
        case GET_HOMESTAY_SUCCESS:
            return { ...state, homestays: action.homestays, startHomestayRequest: false, total: action.total }
        case GET_HOMESTAY_FAILURE:
            return { ...state, homestays: [], startHomestayRequest: false }
        case CREATE_HOMESTAY_REQUEST:
            return { ...state, startCreateHomestayRequest: true }
        case CREATE_HOMESTAY_SUCCESS:
            return { ...state, startCreateHomestayRequest: false }
        case CREATE_HOMESTAY_FAILURE:
            return { ...state, startCreateHomestayRequest: false }
        case ADMIN_APPROVE_HOMESTAY_REQUEST:
            return { ...state }
        case ADMIN_APPROVE_HOMESTAY_SUCCESS:
            let homestayId = action.homestayId;
            let newHomestays = state.homestays.filter(hs => hs.homestay_id + '' !== homestayId + '')
            return { ...state, homestays: newHomestays }
        case ADMIN_APPROVE_HOMESTAY_FAILURE:
            return { ...state }
        case ADMIN_DELETE_HOMESTAY_REQUEST:
            return { ...state }
        case ADMIN_DELETE_HOMESTAY_SUCCESS:
            homestayId = action.homestayId;
            newHomestays = state.homestays.filter(hs => hs.homestay_id + '' !== homestayId + '')
            return { ...state, homestays: newHomestays }
        case ADMIN_DELETE_HOMESTAY_FAILURE:
            return { ...state }
        default:
            return state;
    }
}

