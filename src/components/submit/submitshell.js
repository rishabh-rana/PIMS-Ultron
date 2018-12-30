import React, { Component } from "react";

import RenderForm from "../render/rendersubmitform";
import Currentforms from "../create/currentforms";

import { connect } from "react-redux";
import * as actions from "../../actions/actions";

class SubmitShell extends Component {
  render() {
    let forms = (
      <Currentforms
        forms={this.props.create.forms}
        selectform={this.props.selectformsubmitmode}
        filter={true}
        backbutton={() => this.props.selectformsubmitmode(null)}
      />
    );
    let content = <span />;
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
          key={this.props.submit.selectedform}
          json={this.props.create.forms[this.props.submit.selectedform]}
          formid={this.props.submit.selectedform}
          submissionid={null}
          startsubmitvaluetodb={this.props.startsubmitvaluetodb}
          writedatatosubmissionid={this.props.writedatatosubmissionid}
          getformdata={this.props.getformdata}
          formvalues={this.props.submit.renderformvalues}
          publishsubmission={this.props.publishsubmission}
          disabled={false}
          writetabledatatosubmissionid={this.props.writetabledatatosubmissionid}
          addoffsetaxis={this.props.addoffsetaxis}
        />
      );
    }

    return (
      <div>
        {forms}
        <div
          className="mt-3"
          style={{ paddingLeft: "20px", paddingRight: "20px" }}
        >
          {content}
        </div>
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
