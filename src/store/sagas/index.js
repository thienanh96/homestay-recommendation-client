// import 'regenerator-runtime/runtime';
import { put, fork, takeLatest, all } from "redux-saga/effects";

import { getHomestaySaga, createHomestaySaga, createHomestaySimilaritySaga } from './homestay'
import { getBestHomestaySaga, getConformHomestaysSaga } from './home'
import { getDetailHomestaySaga, rateDetailHomestaySaga, getSimilarHomestaySaga } from './detailHomestay'
import { getCommentsSaga, createCommentSaga } from './comments'
import authSaga, { logoutSaga } from "./auth";
import { getPostsSaga, createPostSaga } from './community'
import { getRateHomestaySaga } from './rateHomestay'
import { updateProfileSaga,getProfileSaga} from './profile'

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
    getProfileSaga()
  ]);
}
