import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_HOMESTAY_REQUEST,
    GET_HOMESTAY_FAILURE,
    GET_HOMESTAY_SUCCESS,
    CREATE_HOMESTAY_FAILURE,
    CREATE_HOMESTAY_REQUEST,
    CREATE_HOMESTAY_SUCCESS,
    CREATE_HOMESTAY_SIMILARITY_REQUEST,
    ADMIN_APPROVE_HOMESTAY_FAILURE,
    ADMIN_APPROVE_HOMESTAY_REQUEST,
    ADMIN_APPROVE_HOMESTAY_SUCCESS
} from "../constants/homestay";
import { post, get, puts } from "../../client/index";
import { createQueryString } from '../../lib/utils'


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getHomestaySaga() {
    yield takeEvery(GET_HOMESTAY_REQUEST, getHomestays);
}

export function* createHomestaySaga() {
    yield takeEvery(CREATE_HOMESTAY_REQUEST, createHomestay);
}

export function* createHomestaySimilaritySaga() {
    yield takeEvery(CREATE_HOMESTAY_SIMILARITY_REQUEST, createHomestaySimilarity);
}

export function* approveHomestaySaga() {
    yield takeEvery(ADMIN_APPROVE_HOMESTAY_REQUEST, approveHomestay);
}




function* getHomestays(action) {
    try {
        const { params, notAllowed } = action
        const queryString = createQueryString(params)
        let response = yield call(getHomestaysAPI, queryString, notAllowed);
        console.log('TCL: function*searchHomestay -> response', response)
        if (response && response.status === 200) {
            yield put({ type: GET_HOMESTAY_SUCCESS, homestays: response.data.data, total: response.data.total })
        } else {
            yield put({ type: GET_HOMESTAY_FAILURE })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: GET_HOMESTAY_FAILURE })
        // yield put({ type: COMPLETE_LOAD_TAGS, tags: [], success: false });
    }
}

function* createHomestay(action) {
    const { reject, resolve, body } = action
    try {
        let response = yield call(createHomestayAPI, body);
        console.log("TCL: function*createHomestay -> response", response)
        if (response && response.status === 200) {
            yield put({ type: CREATE_HOMESTAY_SUCCESS })
            resolve(response.data)
        } else {
            yield put({ type: CREATE_HOMESTAY_FAILURE })
            reject()
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: CREATE_HOMESTAY_FAILURE })
        reject()
    }
}

function* createHomestaySimilarity(action) {
    const { homestayId } = action
    yield call(createHomestaySimilarityAPI, homestayId);
}

function* approveHomestay(action) {
    const { homestayId,resolve,reject } = action
    let response = yield call(approveHomestayAPI, homestayId);
    if (response && response.status === 200) {
        yield put({ type: ADMIN_APPROVE_HOMESTAY_SUCCESS, homestayId: homestayId})
        resolve();
    } else {
        yield put({ type: ADMIN_APPROVE_HOMESTAY_FAILURE })
        reject();
    }
}





function getHomestaysAPI(searchLocation, notAllowed) {
	console.log("TCL: getHomestaysAPI -> searchLocation, notAllowed", searchLocation, notAllowed)
    if (notAllowed) {
        return get('/api/admin/homestays/get_not_allowed')
    } else {
        return get(`/api/homestays${searchLocation}`);
    }
}

function createHomestayAPI(body) {
    return post(`/api/homestay/create`, body);
}

function createHomestaySimilarityAPI(homestayId) {
    return post(`/api/homestay-similarity/create`, {
        homestay_id: homestayId
    });
}

function approveHomestayAPI(homestayId) {
    return puts('/api/admin/homestay/approve/' + homestayId)
}


