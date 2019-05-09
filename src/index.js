import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { render, hydrate } from "react-dom";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { Frontload } from "react-frontload";
import {
    Route,
    Switch,
    Ridirect,
    hashHistory,
    Redirect,
    NavLink,
    Link
} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import getStore from "./store";
var store = getStore();


const Application = (
    <Provider store={store}>
        <BrowserRouter>
            <Frontload noServerRender={true}>
                <Switch>
                    <App />
                </Switch>
            </Frontload>

        </BrowserRouter>
    </Provider>
)
const root = document.querySelector("#root");

if (root.hasChildNodes() === true) {
    // If it's an SSR, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    Loadable.preloadReady().then(() => {
        hydrate(Application, root);
    });
} else {
    // If we're not running on the server, just render like normal
    render(Application, root);
}
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
