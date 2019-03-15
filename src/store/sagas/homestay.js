import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_HOMESTAY_REQUEST,
    GET_HOMESTAY_FAILURE,
    GET_HOMESTAY_SUCCESS
} from "../constants/homestay";
import { post, get, puts } from "../../client/index";
import { createQueryString } from '../../lib/utils'


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getHomestaySaga() {
    yield takeEvery(GET_HOMESTAY_REQUEST, getHomestays);
}



function* getHomestays(action) {
    try {
        const { params } = action
        const queryString = createQueryString(params)
        let response = yield call(getHomestaysAPI, queryString);
        console.log('TCL: function*searchHomestay -> response', response)
        if (response && response.status === 200) {
            yield put({ type: GET_HOMESTAY_SUCCESS, homestays: response.data.data, total: response.data.total })
        }
        // if (response && response.code !== 0) {
        //     yield put({ type: COMPLETE_LOAD_TAGS, tags: response.data.data.dt, success: true });
        // } else {
        //     yield put({ type: COMPLETE_LOAD_TAGS, tags: [], success: false });
        // }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        // yield put({ type: COMPLETE_LOAD_TAGS, tags: [], success: false });
    }
}




function getHomestaysAPI(searchLocation) {
    return get(`/api/homestays${searchLocation}`);
}

