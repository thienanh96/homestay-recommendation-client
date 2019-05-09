import React, { Component } from "react";
import logo from "./logo.svg";
import {
  // BrowserRouter as Router,
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
import Community from './ui/pages/Community'
import Profile from './ui/pages/Profile'
import "./App.css";

var store = getStore();

export default class App extends Component {

  componentWillMount() {
    // if (!isServer) {
    //   this.props.establishCurrentUser();
    // }
  }
  render() {
    return (
      <LayoutWeb>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/homestays" component={Homestays} />
          <Route exact path="/homestays/:id" component={DetailHomestay} />
          <Route exact path="/community" component={Community} />
          <Route exact path="/profile/:id" component={Profile} />}
      </Switch>
      </LayoutWeb>
    );
  }
}

