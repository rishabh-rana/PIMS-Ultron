import React from "react";

import SingleField from "./rendersinglefield";

const Table = props => {
  var {
    json,
    purejson,
    tableid,
    formvalues,
    writetabledatatosubmissionid,
    disabled,
    submissionid,
    formid,
    version,
    addoffsetaxis
  } = props;
  var valtypes = [];

  if (json.axis === "row") {
    return (
      <div className="row">
        <div className="col-12">
          <strong>{json.label}</strong>
        </div>
        <hr />
        <div className="col-3">
          {json.hasOwnProperty("axispoints") &&
            Object.keys(json.axispoints)
              .reverse()
              .map(id => {
                valtypes.push(json.axispoints[id].valuetype);
                return (
                  <div
                    key={id}
                    className="d-block"
                    style={{ lineHeight: "38px" }}
                  >
                    {json.axispoints[id].label}
                  </div>
                );
              })}
        </div>
        <div className="col-9">
          <div
            style={{ overflowX: "scroll", width: "100%", whiteSpace: "nowrap" }}
          >
            {json.hasOwnProperty("offsetaxispoints") &&
              Object.keys(json.offsetaxispoints).map(axisnumber => {
                return (
                  <div key={axisnumber} className="d-inline-block">
                    {Object.keys(json.offsetaxispoints[axisnumber]).map(id => {
                      let formvalhandler = null;
                      if (formvalues && formvalues.data) {
                        console.log("check");
                        formvalhandler = formvalues.data[tableid];
                      }
                      console.log(formvalues);
                      return (
                        <div className="d-block" key={id}>
                          <div
                            key={id}
                            className="d-inline-block"
                            style={{ width: "200px" }}
                          >
                            <SingleField
                              key={id}
                              json={json.offsetaxispoints[axisnumber]}
                              id={id}
                              purejson={purejson}
                              formvalues={formvalhandler}
                              disabled={disabled}
                              functionhandler={e =>
                                writetabledatatosubmissionid(
                                  submissionid,
                                  tableid,
                                  id,
                                  json.offsetaxispoints[axisnumber][id]
                                    .valuetype,
                                  e
                                )
                              }
                              blureventhandler={e =>
                                writetabledatatosubmissionid(
                                  submissionid,
                                  tableid,
                                  id,
                                  "blurevent",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>

          <div style={{ display: "inline-block", width: "100px" }}>
            {!disabled && (
              <button
                onClick={() =>
                  addoffsetaxis(formid, version, tableid, valtypes)
                }
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else if (json.axis === "column") {
    return (
      <div
        style={{
          width: "100%",
          display: "block",
          whiteSpace: "nowrap",
          overflowX: "scroll"
        }}
      >
        <div>
          <strong>{json.label}</strong>
        </div>
        <hr />
        <div>
          {json.hasOwnProperty("axispoints") &&
            Object.keys(json.axispoints)
              .reverse()
              .map(id => {
                valtypes.push(json.axispoints[id].valuetype);
                return (
                  <div
                    key={id}
                    className="d-inline-block"
                    style={{ width: "200px" }}
                  >
                    {json.axispoints[id].label}
                  </div>
                );
              })}
        </div>
        <div style={{ width: "100%" }}>
          <div style={{ width: "100%" }}>
            {json.hasOwnProperty("offsetaxispoints") &&
              Object.keys(json.offsetaxispoints).map(axisnumber => {
                return (
                  <div key={axisnumber} className="d-block">
                    {Object.keys(json.offsetaxispoints[axisnumber]).map(id => {
                      let formvalhandler = null;
                      if (formvalues && formvalues.data) {
                        formvalhandler = formvalues.data[tableid];
                      }

                      return (
                        <div className="d-inline-block" key={id}>
                          <div
                            key={id}
                            className="d-inline-block"
                            style={{ width: "200px" }}
                          >
                            <SingleField
                              key={id}
                              json={json.offsetaxispoints[axisnumber]}
                              id={id}
                              purejson={purejson}
                              formvalues={formvalhandler}
                              disabled={disabled}
                              functionhandler={e =>
                                writetabledatatosubmissionid(
                                  submissionid,
                                  tableid,
                                  id,
                                  json.offsetaxispoints[axisnumber][id]
                                    .valuetype,
                                  e
                                )
                              }
                              blureventhandler={e =>
                                writetabledatatosubmissionid(
                                  submissionid,
                                  tableid,
                                  id,
                                  "blurevent",
                                  e
                                )
                              }
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
          </div>

          <div style={{ display: "inline-block", width: "100px" }}>
            {!disabled && (
              <button
                onClick={() =>
                  addoffsetaxis(formid, version, tableid, valtypes)
                }
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <span>Table</span>;
};

export default Table;
