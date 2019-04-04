import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_DETAIL_HOMESTAY_REQUEST,
    GET_DETAIL_HOMESTAY_FAILURE,
    GET_DETAIL_HOMESTAY_SUCCESS,
    RATE_DETAIL_HOMESTAY_REQUEST,
    RATE_DETAIL_HOMESTAY_FAILURE,
    RATE_DETAIL_HOMESTAY_SUCCESS,
    GET_SIMIALR_HOMESTAY_FAILURE,
    GET_SIMILAR_HOMESTAY_SUCCESS,
    GET_SIMILAR_HOMESTAY_REQUEST
} from "../constants/detailHomestay";
import { post, get, puts } from "../../client/index";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getDetailHomestaySaga() {
    yield takeEvery(GET_DETAIL_HOMESTAY_REQUEST, getDetailHomestay);
}

export function* rateDetailHomestaySaga() {
    yield takeEvery(RATE_DETAIL_HOMESTAY_REQUEST, rateDetailHomestay);
}

export function* getSimilarHomestaySaga() {
    yield takeEvery(GET_SIMILAR_HOMESTAY_REQUEST, getSimilarHomestays);
}




function* getDetailHomestay(action) {
    try {
        const { homestayId } = action
        let response = yield call(getDetailHomestayAPI, homestayId);
        if (response && response.status === 200) {
			console.log("TCL: function*getDetailHomestay -> response", response)
            
            yield put({ type: GET_DETAIL_HOMESTAY_SUCCESS, detailHomestay: response.data })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: GET_DETAIL_HOMESTAY_FAILURE })
    }
}

function* rateDetailHomestay(action) {
    try {
        const { typeRate, userId, homestayId } = action
        let response = yield call(rateDetailHomestayAPI, {
            user_id: userId,
            homestay_id: homestayId,
            type_rate: typeRate
        });
        if (response && response.status === 200) {
            yield put({ type: RATE_DETAIL_HOMESTAY_SUCCESS, ...response.data })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: RATE_DETAIL_HOMESTAY_FAILURE })
    }
}

function* getSimilarHomestays(action) {
    try {
        const { homestayId } = action
        const response = yield call(getSimilarHomestaysAPI, homestayId)
        if (response && response.status === 200) {
            yield put({ type: GET_SIMILAR_HOMESTAY_SUCCESS, homestays: response.data })
        } else {
            yield put({ type: GET_SIMIALR_HOMESTAY_FAILURE })
        }
    } catch (error) {
        console.log("TCL: function*getSimilarHomestays -> error", error)
        yield put({ type: GET_SIMIALR_HOMESTAY_FAILURE })
    }
}




function getDetailHomestayAPI(homestayId) {
    return get(`/api/homestays/${homestayId}`);
}

function rateDetailHomestayAPI(body) {
    return post(`/api/homestay/rate`, body);
}

function getSimilarHomestaysAPI(homestayId) {
    return get(`/api/homestay-similarity/get?homestay_id=${homestayId}`);
}


