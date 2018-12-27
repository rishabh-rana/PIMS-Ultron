import React, { Component } from "react";

import SingleField from "./rendersinglefield";
import Table from "./rendertable";

class RenderForm extends Component {
  componentDidMount() {
    if (this.props.json.submissionid && this.props.submissionid === null) {
      this.props.getformdata(this.props.json.submissionid);
    } else if (this.props.submissionid) {
      this.props.getformdata(this.props.submissionid);
    } else {
      this.props.getformdata(null);
    }

    if (
      this.props.submissionid === null &&
      !this.props.json.hasOwnProperty("submissionid")
    ) {
      console.log("check");

      var pub = (parseInt(this.props.json.version) - 1).toString();
      this.props.startsubmitvaluetodb(this.props.formid, pub);
    }
  }

  render() {
    var {
      json,
      startsubmitvaluetodb,
      writedatatosubmissionid,
      writetabledatatosubmissionid,
      formid,
      formvalues,
      publishsubmission,
      disabled
    } = this.props;
    var publishedversion;

    if (this.props.disabled) {
      startsubmitvaluetodb = () => console.log("disabled");
      writedatatosubmissionid = () => console.log("disabled");
      publishsubmission = () => console.log("disabled");
      publishedversion = this.props.formversion;
    } else {
      publishedversion = (parseInt(json.version) - 1).toString();
    }

    json = json[publishedversion];

    return (
      <div>
        {json &&
          Object.keys(json).map(id => {
            let functionhandler = e =>
              writedatatosubmissionid(
                this.props.json.submissionid,
                id,
                json[id].valuetype,
                e
              );

            if (json[id].type === "singlefield") {
              return (
                <SingleField
                  key={id}
                  json={json}
                  purejson={this.props.json}
                  disabled={disabled}
                  id={id}
                  formvalues={formvalues}
                  functionhandler={functionhandler}
                  blureventhandler={e =>
                    writedatatosubmissionid(
                      this.props.json.submissionid,
                      id,
                      "blurevent",
                      e
                    )
                  }
                />
              );
            } else if (json[id].type === "table") {
              return (
                <Table
                  key={id}
                  tableid={id}
                  json={json[id]}
                  purejson={this.props.json}
                  formvalues={formvalues}
                  disabled={disabled}
                  writetabledatatosubmissionid={writetabledatatosubmissionid}
                  submissionid={this.props.json.submissionid}
                  formid={formid}
                  version={publishedversion}
                  addoffsetaxis={this.props.addoffsetaxis}
                />
              );
            }
          })}
        {!disabled && (
          <button
            className="btn btn-success"
            onClick={() => publishsubmission(formid)}
          >
            Publish
          </button>
        )}
      </div>
    );
  }
}

export default RenderForm;
