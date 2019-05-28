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
    DELETE_HOMESTAY_SIMILARITY_REQUEST,
    UPDATE_HOMESTAY_SIMILARITY_REQUEST,
    ADMIN_APPROVE_HOMESTAY_FAILURE,
    ADMIN_APPROVE_HOMESTAY_REQUEST,
    ADMIN_APPROVE_HOMESTAY_SUCCESS,
    ADMIN_DELETE_HOMESTAY_FAILURE,
    ADMIN_DELETE_HOMESTAY_REQUEST,
    ADMIN_DELETE_HOMESTAY_SUCCESS,
    ADMIN_LOCK_HOMESTAY_FAILURE,
    ADMIN_LOCK_HOMESTAY_REQUEST,
    ADMIN_LOCK_HOMESTAY_SUCCESS
} from "../constants/homestay";
import { post, get, puts, deletes } from "../../client/index";
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

export function* deleteHomestaySimilaritySaga() {
    yield takeEvery(DELETE_HOMESTAY_SIMILARITY_REQUEST, deleteHomestaySimilarity);
}

export function* updateHomestaySimilaritySaga() {
    yield takeEvery(UPDATE_HOMESTAY_SIMILARITY_REQUEST, updateHomestaySimilarity);
}

export function* approveHomestaySaga() {
    yield takeEvery(ADMIN_APPROVE_HOMESTAY_REQUEST, approveHomestay);
}

export function* deleteHomestaySaga() {
    yield takeEvery(ADMIN_DELETE_HOMESTAY_REQUEST, deleteHomestay);
}

export function* lockHomestaySaga() {
    yield takeEvery(ADMIN_LOCK_HOMESTAY_REQUEST, lockHomestay);
}





function* getHomestays(action) {
    try {
        const { params, notAllowed, adminMode } = action
        const queryString = createQueryString(params)
        let response = yield call(getHomestaysAPI, queryString, notAllowed,adminMode);
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
    try {
        yield call(createHomestaySimilarityAPI, homestayId);
    } catch (error) {
        console.log("TCL: function*createHomestaySimilarity -> error", error)
    }

}

function* updateHomestaySimilarity(action) {
    const { homestayId } = action
    try {
        yield call(updateHomestaySimilarityAPI, homestayId);
    } catch (error) {
        console.log("TCL: function*updateHomestaySimilarity -> error", error)
    }

}

function* deleteHomestaySimilarity(action) {
    const { homestayId } = action
    try {
        yield call(deleteHomestaySimilarityAPI, homestayId);
    } catch (error) {
        console.log("TCL: function*deleteHomestaySimilarity -> error", error)
    }

}


function* lockHomestay(action) {
    const { homestayId, resolve, reject } = action
    try {
        let response = yield call(lockHomestayAPI, homestayId);
        if (response && response.status === 200) {
            yield put({ type: ADMIN_LOCK_HOMESTAY_SUCCESS, homestayId: homestayId, newStatus: response.data.new_status })
            resolve(response.data.new_status);
        } else {
            yield put({ type: ADMIN_LOCK_HOMESTAY_FAILURE })
            reject();
        }
    } catch (error) {
        yield put({ type: ADMIN_LOCK_HOMESTAY_FAILURE })
        reject();
    }

}

function* approveHomestay(action) {
    const { homestayId, resolve, reject } = action
    try {
        let response = yield call(approveHomestayAPI, homestayId);
        if (response && response.status === 200) {
            yield put({ type: ADMIN_APPROVE_HOMESTAY_SUCCESS, homestayId: homestayId })
            resolve();
        } else {
            yield put({ type: ADMIN_APPROVE_HOMESTAY_FAILURE })
            reject();
        }
    } catch (error) {
        yield put({ type: ADMIN_APPROVE_HOMESTAY_FAILURE })
        reject();
    }

}

function* deleteHomestay(action) {
    const { homestayId, resolve, reject } = action
    try {
        let response = yield call(deleteHomestayAPI, homestayId);
        if (response && response.status === 200) {
            yield put({ type: ADMIN_DELETE_HOMESTAY_SUCCESS, homestayId: homestayId })
            resolve();
        } else {
            yield put({ type: ADMIN_DELETE_HOMESTAY_FAILURE })
            reject();
        }
    } catch (error) {
        yield put({ type: ADMIN_DELETE_HOMESTAY_FAILURE })
        reject();
    }

}



function getHomestaysAPI(searchLocation, notAllowed,adminMode) {
    console.log("TCL: getHomestaysAPI -> searchLocation, notAllowed", searchLocation, notAllowed)
    if (adminMode) {
        return get(`/api/admin/homestays/get${searchLocation}&is_allowed=` + notAllowed)
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

function deleteHomestaySimilarityAPI(homestayId) {
    return deletes(`/api/homestay-similarity/delete/${homestayId}`);
}

function updateHomestaySimilarityAPI(homestayId) {
    return puts(`/api/homestay-similarity/update`, {
        homestay_id: homestayId
    });
}

function approveHomestayAPI(homestayId) {
    return puts('/api/admin/homestay/approve/' + homestayId)
}

function deleteHomestayAPI(homestayId) {
    return deletes('/api/admin/homestay/delete/' + homestayId)
}

function lockHomestayAPI(homestayId){
    return puts('/api/admin/homestay/lock/' + homestayId)
}


