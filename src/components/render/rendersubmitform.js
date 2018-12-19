import React, { Component } from "react";

class RenderForm extends Component {
  componentDidMount() {
    if (this.props.json.submissionid && this.props.submissionid === null) {
      this.props.getformdata(this.props.json.submissionid);
    } else if (this.props.submissionid) {
      this.props.getformdata(this.props.submissionid);
    } else {
      this.props.getformdata(null);
    }
  }

  render() {
    var {
      json,
      startsubmitvaluetodb,
      writedatatosubmissionid,
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
            let functionhandler = e => {
              startsubmitvaluetodb(formid, publishedversion, id, e);
            };

            if (
              this.props.json.submissionid &&
              this.props.json.submissionid.length === 20
            ) {
              functionhandler = e =>
                writedatatosubmissionid(this.props.json.submissionid, id, e);
            }
            return (
              <div key={id} className="mt-2">
                <h5>{json[id].label}</h5>
                <input
                  type={json[id].valuetype}
                  defaultValue={formvalues && formvalues.data[id]}
                  disabled={disabled}
                  onKeyPress={functionhandler}
                  placeholder={json[id].valuetype}
                />
              </div>
            );
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
