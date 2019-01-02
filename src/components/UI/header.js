import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import Clock from "./clock";
import ErrorHandler from "./errorhandler";

class Header extends Component {
  state = {
    active: this.props.location.pathname.slice(1)
  };

  render() {
    var bg1,
      bg2,
      bg3 = "none";
    var activecolor = "rgba(255,255,255,1)";

    switch (this.state.active) {
      case "submit":
        bg1 = activecolor;
        break;
      case "create":
        bg2 = activecolor;
        break;
      case "view":
        bg3 = activecolor;
        break;
    }

    return (
      <div>
        <nav className="navbar bg-light">
          <div className="container">
            <Link
              to="/profile"
              className="nav-item"
              style={{ color: "inherit", cursor: "pointer" }}
            >
              {this.props.username}
            </Link>
            <a
              onClick={this.props.signoutuser}
              className="nav-item ml-3"
              style={{ cursor: "pointer" }}
            >
              Signout
            </a>
            <a className="navbar-brand mx-auto">Ultron</a>
            <a className="nav-item">
              <Clock />
            </a>
          </div>
        </nav>
        <div
          style={{ width: "100%", background: "#e3f2fd" }}
          className="container"
        >
          <div>
            <div className="row">
              <div
                className="col-4"
                style={{ margin: "0", padding: "0", background: bg1 }}
              >
                <Link
                  to="/submit"
                  onClick={() => {
                    this.setState({ active: "submit" });
                    this.props.clearselections();
                  }}
                  className="btn btn-light"
                  style={{
                    width: "100%",
                    background: "none",
                    color: "inherit",
                    outline: "none"
                  }}
                >
                  Logbook
                </Link>
              </div>
              <div
                className="col-4"
                style={{
                  margin: "0",
                  padding: "0",
                  borderLeft: "1px solid rgba(0,0,0,0.1)",
                  borderRight: "1px solid rgba(0,0,0,0.1)",
                  background: bg2
                }}
              >
                <Link
                  to="/create"
                  onClick={() => {
                    this.setState({ active: "create" });
                    this.props.clearselections();
                  }}
                  className="btn btn-light"
                  style={{
                    width: "100%",
                    background: "none",
                    color: "inherit",
                    outline: "none"
                  }}
                >
                  Report(create)
                </Link>
              </div>
              <div
                className="col-4"
                style={{ margin: "0", padding: "0", background: bg3 }}
              >
                <Link
                  to="/view"
                  onClick={() => {
                    this.setState({ active: "view" });
                    this.props.clearselections();
                  }}
                  className="btn btn-light"
                  style={{
                    width: "100%",
                    background: "none",
                    color: "inherit",
                    outline: "none"
                  }}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
        <ErrorHandler />
      </div>
    );
  }
}

export default withRouter(Header);
