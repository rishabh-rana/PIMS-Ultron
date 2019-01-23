import React, { Component } from "react";

import Header from "./components/UI/header";
import Auth from "./components/auth/auth";
import Profile from "./components/auth/profile";
import CreateShell from "./components/create/createshell";
import SubmitShell from "./components/submit/submitshell";
import ViewShell from "./components/view/viewshell";

import * as actions from "./actions/actions";
import { connect } from "react-redux";

import { BrowserRouter, Route } from "react-router-dom";

import Forms from "./config/forms.json";

class App extends Component {
  componentDidMount() {
    this.props.syncforms();
    //uncomment below to go production mode
    // this.props.syncformscache(Forms);
    this.props.syncsubmissionmeta();
    this.props.syncusers();
    this.props.synccurrentsubids();
  }

  render() {
    let content;
    if (this.props.user !== null) {
      content = (
        <BrowserRouter>
          <div>
            <Route
              path="/"
              component={() => (
                <Header
                  clearselections={() => {
                    this.props.selectformviewmode(null);
                    this.props.selectformsubmitmode(null);
                    this.props.selectformcreatemode(null);
                  }}
                  signoutuser={this.props.signoutuser}
                  username={
                    this.props.user.displayName ||
                    this.props.user.email.slice(0, 10) + ".."
                  }
                />
              )}
            />
            <Route
              path="/profile"
              component={() => (
                <Profile
                  updateusername={this.props.updateusername}
                  sendresetpasswordemail={this.props.sendresetpasswordemail}
                  username={this.props.user.displayName}
                  userid={this.props.user.uid}
                />
              )}
            />
            <Route path="/create" component={CreateShell} />
            <Route path="/submit" component={SubmitShell} />
            <Route path="/view" component={ViewShell} />
          </div>
        </BrowserRouter>
      );
    } else {
      content = (
        <Auth
          signoutuser={this.props.signoutuser}
          signinuser={this.props.signinuser}
          signupuser={this.props.signupuser}
        />
      );
    }
    return content;
  }
}

const mapstate = state => {
  return {
    user: state.auth.user
  };
};

export default connect(
  mapstate,
  actions
)(App);
