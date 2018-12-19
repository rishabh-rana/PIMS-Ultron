import React, { Component } from "react";

import Currentforms from "../create/currentforms";
import Renderform from "../render/rendersubmitform";
import Choosesubmission from "./choosesubmission";

import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class ViewShell extends Component {
  componentDidMount() {
    this.props.syncsubmissionmeta();
  }
  render() {
    let content = (
      <Currentforms
        forms={this.props.create.forms}
        selectform={this.props.selectformviewmode}
        filter={true}
      />
    );

    let backbutton = <span />;
    if (
      this.props.view.selectedform !== null &&
      this.props.view.selectedsubmission === null
    ) {
      backbutton = (
        <button
          className="btn btn-warning"
          onClick={() => this.props.selectformviewmode(null)}
        >
          back
        </button>
      );

      content = (
        <Choosesubmission
          formid={this.props.view.selectedform}
          submissionmeta={this.props.view.submissionmeta}
          selectsubmissionviewmode={this.props.selectsubmissionviewmode}
        />
      );
    } else if (
      this.props.view.selectedform !== null &&
      this.props.view.selectedsubmission !== null
    ) {
      backbutton = (
        <button
          className="btn btn-warning"
          onClick={() => {
            this.props.selectsubmissionviewmode(null);
            this.props.getformdata(null);
          }}
        >
          back
        </button>
      );

      content = (
        <Renderform
          json={this.props.create.forms[this.props.view.selectedform]}
          formid={this.props.view.selectedform}
          getformdata={this.props.getformdata}
          formvalues={this.props.formvalues}
          disabled={true}
          formversion={this.props.view.selectedsubmissionversion}
          submissionid={this.props.view.selectedsubmission}
        />
      );
    }

    return (
      <div className="container">
        <h1>View Data {backbutton}</h1>
        {content}
      </div>
    );
  }
}

const mapstate = state => {
  return {
    create: state.create,
    view: state.view,
    formvalues: state.submit.renderformvalues
  };
};
export default connect(
  mapstate,
  actions
)(ViewShell);
