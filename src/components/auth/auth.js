import React, { Component } from "react";

import ErrorHandler from "../UI/errorhandler";
import loader from "../UI/loader/loader";

class Auth extends Component {
  state = {
    open: false,
    loading: false
  };

  render() {
    let functionhandler;
    if (this.state.open) {
      functionhandler = e => {
        this.props.signupuser(e);
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1500);
      };
    } else {
      functionhandler = e => {
        this.props.signinuser(e);
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1500);
      };
    }

    return (
      <div className="container text-center mt-5">
        <ErrorHandler />
        <form onSubmit={functionhandler}>
          {this.state.open && (
            <div className="form-group">
              <label for="exampleInput">Key for project</label>
              <input
                type="text"
                className="form-control"
                id="exampleInput"
                aria-describedby="secret"
                placeholder="Enter key"
                name="key"
              />
            </div>
          )}
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {this.state.open ? "Sign-Up" : "Sign-In"}
          </button>
        </form>
        {this.state.loading && loader}
        <button
          onClick={() => this.setState({ open: !this.state.open })}
          className="btn btn-warning mt-5"
        >
          {this.state.open ? "Sign-In Instead" : "Sign-Up Instead"}
        </button>
      </div>
    );
  }
}

export default Auth;
