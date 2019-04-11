import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_POST_FAILURE,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    CREATE_POST_FAILURE,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS
} from "../constants/communtity";

import { UPDATE_COUNT_SHARES } from '../constants/detailHomestay'

import { post, get, puts, deletes } from "../../client/index";


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getPostsSaga() {
    yield takeEvery(GET_POST_REQUEST, getPosts);
}

export function* createPostSaga() {
    yield takeEvery(CREATE_POST_REQUEST, createPost);
}

export function* deletePostSaga() {
    yield takeEvery(DELETE_POST_REQUEST, deletePost);
}



function* getPosts(action) {
    try {
        const { filter, limit, offset } = action
        let response = yield call(getPostsAPI, filter, limit, offset);
        console.log("TCL: function*getPosts -> response", response)
        if (response && response.status === 200) {
            yield put({ type: GET_POST_SUCCESS, posts: response.data.data, total: response.data.total })
        } else {
            yield put({ type: GET_POST_FAILURE })
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: GET_POST_FAILURE })
    }
}

function* createPost(action) {
    try {
        const { homestayId, content } = action
        let response = yield call(createPostAPI, homestayId, content);
        console.log("TCL: function*createPost -> response", response)
        if (response && response.status === 200) {
            yield put({ type: CREATE_POST_SUCCESS })
            yield put({ type: UPDATE_COUNT_SHARES, typeShare: 'add' })
            action.resolve()
        } else {
            yield put({ type: CREATE_POST_FAILURE })
            action.reject()
        }

    } catch (error) {
        console.log('TCL: }catch -> error', error)
        yield put({ type: CREATE_POST_FAILURE })
        action.reject()
    }
}

function* deletePost(action) {
    const { postId, reject, resolve } = action
    try {
        let response = yield call(deletePostAPU,postId);
		console.log("TCL: function*deletePost -> response", response)
        if (response && response.status === 200) {
            yield put({ type: DELETE_POST_SUCCESS, postId: postId })
            resolve(postId)
        } else {
            yield put({ type: DELETE_POST_FAILURE })
            reject()
        }

    } catch (error) {
        yield put({ type: DELETE_POST_FAILURE })
        reject()
    }
}





function getPostsAPI(filter, limit, offset) {
    let api = '/api/posts/get'
    if (filter) {
        api += '?filter=' + filter
    }
    if (limit) {
        api += '&limit=' + limit
    }
    if (offset) {
        api += '&offset=' + offset
    }
    return get(api)
}

function createPostAPI(homestayId, content) {
    return post('/api/post/create', {
        homestay_id: homestayId,
        content
    })
}

function deletePostAPU(postId) {
    return deletes('/api/post/delete/' + postId)
}


