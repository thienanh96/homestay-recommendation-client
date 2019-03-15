// import 'regenerator-runtime/runtime';
import { put, fork, takeLatest, all } from "redux-saga/effects";

import formActionSaga from "redux-form-saga";
import { getHomestaySaga } from './homestay'
import { getBestHomestaySaga } from './home'
import { getDetailHomestaySaga } from './detailHomestay'

import authSaga, { logoutSaga } from "./auth";

// Root sagas
// Single entry point to start all sagas at once
export default function* rootSaga() {
  yield all([
    authSaga(),
    getHomestaySaga(),
    getBestHomestaySaga(),
    getDetailHomestaySaga()
  ]);
}
