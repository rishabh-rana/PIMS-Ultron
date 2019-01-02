import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../actions/actions";

const ErrorHandler = props => {
  let content;
  if (props.error !== null) {
    content = (
      <Error
        seterrordisplay={props.seterrordisplay}
        message={props.error.message}
        color={props.error.color}
        duration={props.error.duration}
      />
    );
  } else {
    content = <span />;
  }
  return content;
};

class Error extends Component {
  componentDidMount() {
    if (this.props.duration) {
      setTimeout(() => {
        this.props.seterrordisplay(null);
      }, this.props.duration);
    } else {
      setTimeout(() => {
        this.props.seterrordisplay(null);
      }, 3000);
    }
  }

  render() {
    let classn = "mx-auto alert alert-";
    switch (this.props.color) {
      case "red":
        classn += "danger";
        break;
      case "yellow":
        classn += "warning";
        break;
      case "light":
        classn += "info";
        break;
      default:
        classn += "warning";
        break;
    }

    let message =
      this.props.message || "Oops something went wrong, Please try again";
    return (
      <div
        className={classn}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)"
        }}
      >
        {message}
      </div>
    );
  }
}

const mapstate = state => {
  return {
    error: state.error.error
  };
};

export default connect(
  mapstate,
  actions
)(ErrorHandler);
