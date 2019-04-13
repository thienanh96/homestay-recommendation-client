import {
    take,
    fork,
    cancel,
    call,
    put,
    all,
    cancelled,
    takeEvery,
    takeLatest
    // stopSubmit,
    // startSubmit
} from "redux-saga/effects";
import { SubmissionError } from "redux-form";
// We'll use this function to redirect to different routes based on cases
// import { browserHistory } from 'react-router'
import createHistory from "history/createBrowserHistory";
// Helper for api errors
// import { handleApiErrors } from "../../lib/api-errors";
// import { login } from "../actions/authAction";
// Our login constants
import {
    LOGIN_REQUESTING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    CLIENT_UNSET,
    LOGOUT_REQUEST,
    REGISTER_REQUEST,
    REGISTER_FAILURE,
    REGISTER_SUCCESS
} from "../constants/auth";
import { setClient, unsetClient } from "../actions/authAction";
import { post } from "../../client/index";
// So that we can modify our Client piece of state
const browserHistory = createHistory();

// const loginUrl = `${process.env.REACT_APP_API_URL}/api/Clients/login`

function loginApi(username, password) {
    return post("/api/auth/login", { email: username, password });
}

export function* registerSaga() {
    yield takeEvery(REGISTER_REQUEST, registerFlow);
}

function logoutApi() {
    return post("/api/auth/logout");
}
function registerApi(body){
    return post('/api/auth/register',body)
}

function* logout() {
    // dispatches the CLIENT_UNSET action
    yield put(unsetClient());

    // remove our token
    localStorage.removeItem("token");

    // redirect to the /login screen
    browserHistory.push("/");
}
function* logoutFlow() {
    try {
        let data = yield call(logoutApi);
        console.log("dataaaaa", data);
        if (data.data.code == 0) {
            yield call(logout);
        } else {
        }
    } catch (error) { }
}
function* loginFlow(username, password, resolve, reject) {
    let token;
    try {
        console.log('call here')
        let data = yield call(loginApi, username, password);
        console.log("data====", data);
        token = data.data.token
        console.log("TCL: function*loginFlow -> token", token)
        // inform Redux to set our client token, this is non blocking so...
        yield put(setClient(token));

        // .. also inform redux that our login was successful
        yield put({ type: LOGIN_SUCCESS });

        // set a stringified version of our token to localstorage on our domain
        localStorage.setItem("token", token);

        // redirect them to WIDGETS!
        resolve(token);
        browserHistory.push("/");
    } catch (error) {
        // error? send it to redux
        // yield put(stopSubmit("Login", { _error: "Connection error" }));

        yield put({ type: LOGIN_ERROR, error });
        if (typeof reject === "function") {
            console.log("vao reject: ", error);
            reject(error);
        }
        // yield put(login.failure(formError));
    } finally {
        // No matter what, if our `forked` `task` was cancelled
        // we will then just redirect them to login

        if (yield cancelled()) {
            browserHistory.push("/login");
        }
    }

    // return the token for health and wealth
    return token;
}

// Our watcher (saga).  It will watch for many things.
function* loginWatcher() {
    // Generators halt execution until their next step is ready/occurring
    // So it's not like this loop is firing in the background 1000/sec
    // Instead, it says, "okay, true === true", and hits the first step...
    while (true) {
        //
        // ... and in this first it sees a yield statement with `take` which
        // pauses the loop.  It will sit here and WAIT for this action.
        //
        // yield take(ACTION) just says, when our generator sees the ACTION
        // it will pull from that ACTION's payload that we send up, its
        // email and password.  ONLY when this happens will the loop move
        // forward...
        const { username, password, resolve, reject } = yield take(LOGIN_REQUESTING);
        const task = yield fork(loginFlow, username, password, resolve, reject);
        const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
        if (action.type === CLIENT_UNSET) yield cancel(task);
        yield call(logout);
    }
}


function* registerFlow(action) {
    const { body, resolve, reject } = action;
    try {
        let response = yield call(registerApi, body);
        if (response.status === 201) {

            // .. also inform redux that our login was successful
            yield put({ type: REGISTER_SUCCESS });

            // set a stringified version of our token to localstorage on our domain

            // redirect them to WIDGETS!
            resolve(response.data);
        } else {
            reject(response.data)
        }
    } catch (error) {
		console.log("TCL: function*registerFlow -> error", error)
        yield put({ type: REGISTER_FAILURE, error });
        if (typeof reject === "function") {
            reject(error);
        }
    }
}

export function* logoutSaga() {
    console.log("logout=====>");
    yield takeEvery(LOGOUT_REQUEST, logoutFlow);
}
export default loginWatcher;
