import React, { Component } from "react";

import RenderForm from "../render/rendersubmitform";
import Currentforms from "../create/currentforms";

import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class SubmitShell extends Component {
  render() {
    let content = (
      <Currentforms
        forms={this.props.create.forms}
        selectform={this.props.selectformsubmitmode}
        filter={true}
      />
    );

    let backbutton = <span />;
    if (this.props.submit.selectedform !== null) {
      backbutton = (
        <button
          className="btn btn-warning"
          onClick={() => this.props.selectformsubmitmode(null)}
        >
          back
        </button>
      );
      content = (
        <RenderForm
          json={this.props.create.forms[this.props.submit.selectedform]}
          formid={this.props.submit.selectedform}
          submissionid={null}
          startsubmitvaluetodb={this.props.startsubmitvaluetodb}
          writedatatosubmissionid={this.props.writedatatosubmissionid}
          getformdata={this.props.getformdata}
          formvalues={this.props.submit.renderformvalues}
          publishsubmission={this.props.publishsubmission}
          disabled={false}
        />
      );
    }

    return (
      <div className="container">
        <h1>Submit Forms {backbutton}</h1>
        {content}
      </div>
    );
  }
}

const mapstate = state => {
  return {
    submit: state.submit,
    create: state.create
  };
};

export default connect(
  mapstate,
  actions
)(SubmitShell);
