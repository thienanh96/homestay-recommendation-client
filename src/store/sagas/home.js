import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_BEST_HOMESTAY_FAILURE,
    GET_BEST_HOMESTAY_REQUEST,
    GET_BEST_HOMESTAY_SUCCESS,
    GET_BEST_TRAVELLER_FAILURE,
    GET_BEST_TRAVELLER_REQUEST,
    GET_BEST_TRAVELLER_SUCCESS
} from "../constants/home";
import { post, get, puts } from "../../client/index";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getBestHomestaySaga() {
    yield takeEvery(GET_BEST_HOMESTAY_REQUEST, getBestHomestays);
}



function* getBestHomestays(action) {
    try {
        const { params } = action
        const queryString = createQueryString(params)
        let response = yield call(getBestHomestaysAPI, queryString);
        if (response && response.status === 200) {
            yield put({ type: GET_BEST_HOMESTAY_SUCCESS, homestays: response.data.data, total: response.data.total })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: GET_BEST_HOMESTAY_FAILURE })
    }
}

function createQueryString(params) {
    const { limitParams, offsetParams, orderByParams, cityParams, nameParams, priceRangeParams } = params
    console.log('TCL: createQueryString -> params', params)
    let api = ''
    if (limitParams) {
        api += '?limit=' + limitParams
    }
    if (offsetParams) {
        api += '&offset=' + offsetParams
    }
    if (orderByParams) {
        api += '&order_by=' + orderByParams
    }
    if (cityParams) {
        api += '&city=' + cityParams
    }
    if (nameParams) {
        api += '&city=' + cityParams
    }
    if (priceRangeParams) {
        api += '&price_range=' + priceRangeParams
    }
    return api
}




function getBestHomestaysAPI(searchLocation) {
    return get(`/api/homestays${searchLocation}`);
}

