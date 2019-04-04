import {
    GET_DETAIL_HOMESTAY_REQUEST,
    GET_DETAIL_HOMESTAY_SUCCESS,
    GET_DETAIL_HOMESTAY_FAILURE,
    RATE_DETAIL_HOMESTAY_REQUEST,
    RATE_DETAIL_HOMESTAY_SUCCESS,
    RATE_DETAIL_HOMESTAY_FAILURE,
    GET_SIMIALR_HOMESTAY_FAILURE,
    GET_SIMILAR_HOMESTAY_REQUEST,
    GET_SIMILAR_HOMESTAY_SUCCESS,
    UPDATE_COUNT_SHARES
} from "../constants/detailHomestay";

// reducer with initial state
const initialState = {
    startGetDetailHomestayRequest: false,
    startRateDetailHomestayRequest: false,
    detailHomestay: {
        me_rate: null,
        homestay_info: {},
        host_info: {}
    },
    startSimilarHomestayRequest: false,
    similarHomestays: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_HOMESTAY_REQUEST:
            return { ...state, startGetDetailHomestayRequest: true }
        case GET_DETAIL_HOMESTAY_SUCCESS:
            return { ...state, detailHomestay: action.detailHomestay, startGetDetailHomestayRequest: false }
        case GET_DETAIL_HOMESTAY_FAILURE:
            return { ...state, detailHomestay: [], startGetDetailHomestayRequest: false }
        case RATE_DETAIL_HOMESTAY_REQUEST:
            return { ...state, startRateDetailHomestayRequest: true }
        case RATE_DETAIL_HOMESTAY_SUCCESS:
            let stateCopy = {
                startGetDetailHomestayRequest: false,
                startRateDetailHomestayRequest: false,
                detailHomestay: {
                    homestay_info: {
                        ...state.detailHomestay.homestay_info
                    },
                    host_info: {
                        ...state.detailHomestay.host_info
                    },
                    me_rate: state.detailHomestay.me_rate
                },
                startSimilarHomestayRequest: state.startSimilarHomestayRequest,
                similarHomestays: [...state.similarHomestays]
            }
            if (action.type_rate === 1) {
                if (action.action_type === 'add') {
                    stateCopy.detailHomestay.homestay_info.likes += 1
                    if (stateCopy.detailHomestay.me_rate === 'dislike') {
                        stateCopy.detailHomestay.homestay_info.dislikes = stateCopy.detailHomestay.homestay_info.dislikes - 1 < 0 ? 0 : stateCopy.detailHomestay.homestay_info.dislikes - 1
                    }
                    stateCopy.detailHomestay.me_rate = 'like'
                } else if (action.action_type === 'remove') {
                    stateCopy.detailHomestay.homestay_info.likes = stateCopy.detailHomestay.homestay_info.likes - 1 < 0 ? 0 : stateCopy.detailHomestay.homestay_info.likes - 1
                    stateCopy.detailHomestay.me_rate = null
                }

            }
            if (action.type_rate === 2) {
                if (action.action_type === 'add') {
                    stateCopy.detailHomestay.homestay_info.dislikes += 1
                    if (stateCopy.detailHomestay.me_rate === 'like') {
                        stateCopy.detailHomestay.homestay_info.likes = stateCopy.detailHomestay.homestay_info.likes - 1 < 0 ? 0 : stateCopy.detailHomestay.homestay_info.likes - 1
                    }
                    stateCopy.detailHomestay.me_rate = 'dislike'
                } else if (action.action_type === 'remove') {
                    stateCopy.detailHomestay.homestay_info.dislikes = stateCopy.detailHomestay.homestay_info.dislikes - 1 < 0 ? 0 : stateCopy.detailHomestay.homestay_info.dislikes - 1
                    stateCopy.detailHomestay.me_rate = null
                }

            }
            const newState = { ...stateCopy }
            return { ...newState, startRateDetailHomestayRequest: false }
        case UPDATE_COUNT_SHARES:
            if (action.typeShare === 'add') {
                const newDetailHomestay = {
                    detailHomestay: {
                        me_rate: state.detailHomestay.me_rate,
                        homestay_info: { ...state.detailHomestay.homestay_info, shares: state.detailHomestay.homestay_info.shares + 1 },
                        host_info: { ...state.detailHomestay.host_info }
                    },
                }
                return { ...state, ...newDetailHomestay }
            }
            if (action.typeShare === 'add') {
                const newDetailHomestay = {
                    detailHomestay: {
                        me_rate: state.detailHomestay.me_rate,
                        homestay_info: { ...state.detailHomestay.homestay_info, shares: state.detailHomestay.homestay_info.shares - 1 },
                        host_info: { ...state.detailHomestay.host_info }
                    },
                }
                return { ...state, ...newDetailHomestay }
            }
            break
        case RATE_DETAIL_HOMESTAY_FAILURE:
            return { ...state, detailHomestay: [], startRateDetailHomestayRequest: false }
        case GET_SIMILAR_HOMESTAY_REQUEST:
            return { ...state, startSimilarHomestayRequest: true }
        case GET_SIMILAR_HOMESTAY_SUCCESS:
            return { ...state, similarHomestays: action.homestays, startSimilarHomestayRequest: false }
        case GET_SIMIALR_HOMESTAY_FAILURE:
            return { ...state, similarHomestays: [], startSimilarHomestayRequest: false }
        default:
            return state;
    }
}

