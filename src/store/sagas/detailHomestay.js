import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_DETAIL_HOMESTAY_REQUEST,
    GET_DETAIL_HOMESTAY_FAILURE,
    GET_DETAIL_HOMESTAY_SUCCESS
} from "../constants/detailHomestay";
import { post, get, puts } from "../../client/index";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getDetailHomestaySaga() {
    yield takeEvery(GET_DETAIL_HOMESTAY_REQUEST, getDetailHomestay);
}



function* getDetailHomestay(action) {
    try {
        const { homestayId } = action
        let response = yield call(getDetailHomestayAPI, homestayId);
		console.log('TCL: function*getDetailHomestay -> response', response)
        
        if (response && response.status === 200) {
            yield put({ type: GET_DETAIL_HOMESTAY_SUCCESS, detailHomestay: response.data })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        // yield put({ type: COMPLETE_LOAD_TAGS, tags: [], success: false });
    }
}




function getDetailHomestayAPI(homestayId) {
    return get(`/api/homestays/${homestayId}`);
}

