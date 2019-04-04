import { takeLatest, takeEvery, call, put, select } from "redux-saga/effects";
import { apiBase } from "../../client/config";
import {
    GET_COMMENTS_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS,
    CREATE_COMMENT_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS
} from "../constants/comments";
import { post, get, puts } from "../../client/index";
import { createQueryString } from '../../lib/utils'


// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* getCommentsSaga() {
    yield takeEvery(GET_COMMENTS_REQUEST, getComments);
}

export function* createCommentSaga() {
    yield takeEvery(CREATE_COMMENT_REQUEST, createComment);
}



function* getComments(action) {
    try {
        const { homestayId, limit, offset } = action
        let response = yield call(getCommentsAPI, homestayId, limit, offset);

        if (response && response.status === 200) {
            yield put({ type: GET_COMMENTS_SUCCESS, comments: response.data, total: response.data.total })
        } else {
            yield put({ type: GET_COMMENTS_FAILURE });
        }

    } catch (error) {
        yield put({ type: GET_COMMENTS_FAILURE });
    }
}

function* createComment(action) {
    const { homestayId, content, resolve, reject } = action
    try {
        let response = yield call(createCommentAPI, homestayId, content);
		console.log('TCL: function*createComment -> response', response)

        if (response && response.status === 200) {
            yield put({ type: CREATE_COMMENT_SUCCESS, comment: response.data})
            resolve(response.data)
        } else {
            yield put({ type: CREATE_COMMENT_FAILURE });
            reject('error')
        }

    } catch (error) {
        yield put({ type: CREATE_COMMENT_FAILURE });
        reject('error')
    }
}




function getCommentsAPI(homestayId, limit, offset) {
    return get(`/api/comments`, {
        params: {
            homestay_id: homestayId ? homestayId : undefined,
            limit: limit ? limit : undefined,
            offset: offset ? offset : undefined,
        }
    });
}

function createCommentAPI(homestayId, content) {
    return post(`/api/comment`, {
        homestay_id: homestayId ? homestayId : undefined,
        content: content ? content : undefined
    });
}

