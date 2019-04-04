import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS
} from "../constants/profile";


import { post, get, puts } from "../../client/index";


// watcher saga: watches for actions dispatched to the store, starts worker saga

export function* updateProfileSaga() {
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfile);
}

export function* getProfileSaga() {
    yield takeEvery(GET_PROFILE_REQUEST, getProfile);
}


// function* getPosts(action) {
//     try {
//         const { filter, limit, offset } = action
//         let response = yield call(getPostsAPI, filter, limit, offset);
//         console.log("TCL: function*getPosts -> response", response)
//         if (response && response.status === 200) {
//             yield put({ type: UPDATE_PROFILE_REQUEST, posts: response.data.data, total: response.data.total })
//         } else {
//             yield put({ type: UPDATE_PROFILE_FAILURE })
//         }

//     } catch (error) {
//         console.log('TCL: }catch -> error', error)
//         yield put({ type: GET_POST_FAILURE })
//     }
// }

function* updateProfile(action) {
    try {
        const { body, resolve, reject } = action
        let response = yield call(updateProfileAPI, body);
        console.log("TCL: function*updateProfile -> response", response)
        if (response && response.status === 200) {
            yield put({ type: UPDATE_PROFILE_SUCCESS })
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





// function getPostsAPI(filter, limit, offset) {
//     let api = '/api/posts/get'
//     if (filter) {
//         api += '?filter=' + filter
//     }
//     if (limit) {
//         api += '&limit=' + limit
//     }
//     if (offset) {
//         api += '&offset=' + offset
//     }
//     return get(api)
// }

function updateProfileAPI(body) {
    return puts('/api/profile/update', body)
}


function getProfileAPI(queryString) {
    return get('/api/profile/get' + queryString)
}



