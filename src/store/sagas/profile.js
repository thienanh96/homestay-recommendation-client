import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,
    GET_LIST_PROFILE_REQUEST,
    GET_LIST_PROFILE_FAILURE,
    GET_LIST_PROFILE_SUCCESS,
    DELETE_PROFILE_FAILURE,
    DELETE_PROFILE_REQUEST,
    DELETE_PROFILE_SUCCESS
} from "../constants/profile";


import { post, get, puts, deletes } from "../../client/index";
import { CLIENT_SET } from "../constants/auth";


// watcher saga: watches for actions dispatched to the store, starts worker saga

export function* updateProfileSaga() {
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfile);
}

export function* getProfileSaga() {
    yield takeEvery(GET_PROFILE_REQUEST, getProfile);
}

export function* getListProfileSaga() {
    yield takeEvery(GET_LIST_PROFILE_REQUEST, getListProfile);
}

export function* deleteProfileSaga() {
    yield takeEvery(DELETE_PROFILE_REQUEST, deleteProfile);
}



function* updateProfile(action) {
    try {
        const { body, resolve, reject } = action
        let response = yield call(updateProfileAPI, body);
        console.log("TCL: function*updateProfile -> response", response)
        if (response && response.status === 200) {
            yield put({ type: UPDATE_PROFILE_SUCCESS })
            yield put({ type: CLIENT_SET, token: response.data.new_token })
            resolve()
        } else {
            yield put({ type: UPDATE_PROFILE_FAILURE })
            reject()
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: UPDATE_PROFILE_FAILURE })
        action.reject()
    }
}



function* getProfile(action) {
    try {
        const { params } = action
        let queryString = ''
        if (params.me) {
            queryString = '?me=1'
        } else if (params.user_id) {
            queryString = '?user_id=' + params.user_id
        }
        let response = yield call(getProfileAPI, queryString);
        console.log("TCL: function*getProfile -> response", response)
        if (response && response.status === 200) {
            yield put({ type: GET_PROFILE_SUCCESS, profile: response.data })
        } else {
            yield put({ type: GET_PROFILE_FAILURE })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: GET_PROFILE_FAILURE })
    }
}

function* getListProfile(action) {
    try {
        const { limit, offset, userId } = action
        let response = yield call(getListProfileAPI, limit, offset, userId);
        console.log("TCL: function*getListProfile -> response", response)
        if (response && response.status === 200) {
            yield put({ type: GET_LIST_PROFILE_SUCCESS, profiles: response.data })
        } else {
            yield put({ type: GET_LIST_PROFILE_FAILURE })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: GET_LIST_PROFILE_FAILURE })
    }
}

function* deleteProfile(action) {
    try {
        const { profileId, resolve, reject } = action
        let response = yield call(deleteProfileAPI, profileId);
        if (response && response.status === 200) {
            yield put({ type: DELETE_PROFILE_SUCCESS, profileId: profileId })
            resolve(profileId);
        } else {
            yield put({ type: DELETE_PROFILE_FAILURE })
            reject(reject)
        }

    } catch (error) {
        yield put({ type: DELETE_PROFILE_FAILURE })
    }
}






function updateProfileAPI(body) {
    return puts('/api/profile/update', body)
}


function getProfileAPI(queryString) {
    return get('/api/profile/get' + queryString)
}

function getListProfileAPI(limit, offset, user_id) {
    let api = '/api/profile/getlist?limit=' + limit + '&offset=' + offset
    if (user_id) {
        api += '&user_id=' + user_id
    }
    return get(api)
}

function deleteProfileAPI(profileId) {
    return deletes('/api/profile/delete/' + profileId)
}



