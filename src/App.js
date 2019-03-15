import React, { Component } from "react";
import logo from "./logo.svg";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Ridirect,
  hashHistory,
  Redirect,
  NavLink,
  Link
} from "react-router-dom";
import "antd/dist/antd.css";
import LayoutWeb from "./ui/Layout";
import getStore from "./store";
import { Provider } from "react-redux";
import Homepage from './ui/pages/homepage';
import Homestays from './ui/pages/homestays'
import DetailHomestay from './ui/pages/DetailHomestay'
import "./App.css";

var store = getStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            {/* <Link to="/user/register">Đăng nhập</Link>  */}
            <Switch>
              {/* <Route path="/register" component={Login} /> */}
              <React.Fragment>
                <LayoutWeb>
                  <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/homestays" component={Homestays} />
                    <Route exact path="/homestays/:id" component={DetailHomestay} />
                  </Switch>
                </LayoutWeb>
              </React.Fragment>
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

