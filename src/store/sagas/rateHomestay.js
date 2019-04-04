import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_MYRATE_FAILURE,
    GET_MYRATE_REQUEST,
    GET_MYRATE_SUCCESS,
} from "../constants/rateHomestay";
import { post, get, puts } from "../../client/index";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getRateHomestaySaga() {
    yield takeEvery(GET_MYRATE_REQUEST, getRateHomestays);
}



function* getRateHomestays(action) {
    try {
        const { homestayId } = action
        let response = yield call(getRateHomestaysAPI, homestayId);
        console.log("TCL: function*getRateHomestays -> response", response)
        if (response && response.status === 200) {
            yield put({ type: GET_MYRATE_SUCCESS, meRate: response.data.me_rate })
        } else {
            yield put({ type: GET_MYRATE_FAILURE })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: GET_MYRATE_FAILURE })
    }
}





function getRateHomestaysAPI(homestayId) {
    return get('api/homestay/get/myrate?homestay_id=' + homestayId);
}


