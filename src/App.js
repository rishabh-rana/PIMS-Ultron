import React, { Component } from "react";

import Header from "./components/UI/header";
import CreateShell from "./components/create/createshell";
import SubmitShell from "./components/submit/submitshell";
import ViewShell from "./components/view/viewshell";

import * as actions from "./actions/actions";
import { connect } from "react-redux";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.syncforms();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Header} />
          <Route path="/create" component={CreateShell} />
          <Route path="/submit" component={SubmitShell} />
          <Route path="/view" component={ViewShell} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(
  null,
  actions
)(App);
