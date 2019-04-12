// import 'regenerator-runtime/runtime';
import { put, fork, takeLatest, all } from "redux-saga/effects";

import { getHomestaySaga, createHomestaySaga, createHomestaySimilaritySaga } from './homestay'
import { getBestHomestaySaga, getConformHomestaysSaga } from './home'
import { getDetailHomestaySaga, rateDetailHomestaySaga, getSimilarHomestaySaga, updateHomestaySaga } from './detailHomestay'
import { getCommentsSaga, createCommentSaga } from './comments'
import authSaga, { logoutSaga } from "./auth";
import { getPostsSaga, createPostSaga, deletePostSaga } from './community'
import { getRateHomestaySaga } from './rateHomestay'
import { updateProfileSaga, getProfileSaga, getListProfileSaga, deleteProfileSaga } from './profile'

// Root sagas
// Single entry point to start all sagas at once
export default function* rootSaga() {
  yield all([
    authSaga(),
    getHomestaySaga(),
    getBestHomestaySaga(),
    getDetailHomestaySaga(),
    rateDetailHomestaySaga(),
    getCommentsSaga(),
    createCommentSaga(),
    getSimilarHomestaySaga(),
    getPostsSaga(),
    getRateHomestaySaga(),
    createPostSaga(),
    getConformHomestaysSaga(),
    createHomestaySaga(),
    createHomestaySimilaritySaga(),
    updateProfileSaga(),
    getProfileSaga(),
    updateHomestaySaga(),
    deletePostSaga(),
    getListProfileSaga(),
    deleteProfileSaga()
  ]);
}
