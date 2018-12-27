import React from "react";

import Addnew from "../create/addnewtableelement";

const RenderForm = props => {
  var {
    json,
    formid,
    version,
    selectaxisoftable,
    addnewtableelement,
    addnewoptiontodropdown,
    deletesinglefield,
    deletesinglefieldtable
  } = props;

  return (
    <div>
      {json &&
        Object.keys(json).map(id => {
          if (
            json[id].type === "singlefield" &&
            json[id].valuetype !== "select"
          ) {
            return (
              <div key={id} className="mt-2">
                <h5>{json[id].label}</h5>
                <button
                  onClick={() => deletesinglefield(formid, version, id)}
                  className="btn btn-danger d-block"
                >
                  Delete
                </button>
                <input
                  type={json[id].valuetype}
                  disabled
                  placeholder={json[id].valuetype + " accepted"}
                />
              </div>
            );
          } else if (json[id].type === "dropdown") {
            return (
              <div key={id} className="mt-2">
                <h5>{json[id].label}</h5>
                <button
                  onClick={() => deletesinglefield(formid, version, id)}
                  className="btn btn-danger d-block"
                >
                  Delete
                </button>
                <h5>
                  <strong>Options:</strong>
                </h5>
                {json[id].hasOwnProperty("options") &&
                  json[id].options.split("$").map(option => {
                    return <h5 key={option}>{option}</h5>;
                  })}
                <input
                  type="text"
                  placeholder="Add another option"
                  onBlur={e =>
                    addnewoptiontodropdown(
                      formid,
                      version,
                      null,
                      id,
                      json[id].options,
                      "blureventtrue",
                      e
                    )
                  }
                  onKeyPress={e =>
                    addnewoptiontodropdown(
                      formid,
                      version,
                      null,
                      id,
                      json[id].options,
                      null,
                      e
                    )
                  }
                />
              </div>
            );
          } else if (json[id].type === "table") {
            let select = (
              <select
                onChange={e => selectaxisoftable(formid, id, version, e)}
                defaultValue={json[id].axis}
              >
                <option value="row">Row</option>
                <option value="column">Column</option>
              </select>
            );
            let content;

            if (!json[id].hasOwnProperty("axis")) {
              //do something
            } else {
              content = (
                <div>
                  <div>{json[id].axis}</div>
                  <button
                    onClick={() => deletesinglefield(formid, version, id)}
                    className="btn btn-danger d-block"
                  >
                    Delete
                  </button>
                  <Addnew
                    formid={formid}
                    fieldid={id}
                    version={version}
                    axis={json[id].axis}
                    addnewelement={addnewtableelement}
                  />
                  {json[id].hasOwnProperty("axispoints") &&
                    Object.keys(json[id].axispoints).map(subid => {
                      if (json[id].axispoints[subid].type === "dropdown") {
                        return (
                          <div key={subid} className="mt-2">
                            <h5>{json[id].axispoints[subid].label}</h5>
                            <button
                              onClick={() =>
                                deletesinglefieldtable(
                                  formid,
                                  version,
                                  id,
                                  subid
                                )
                              }
                              className="btn btn-danger d-block"
                            >
                              Delete
                            </button>
                            <h5>
                              <strong>Options:</strong>
                            </h5>
                            {json[id].axispoints[subid].hasOwnProperty(
                              "options"
                            ) &&
                              json[id].axispoints[subid].options
                                .split("$")
                                .map(option => {
                                  return <h5 key={option}>{option}</h5>;
                                })}
                            <input
                              type="text"
                              placeholder="Add another option"
                              onBlur={e =>
                                addnewoptiontodropdown(
                                  formid,
                                  version,
                                  id,
                                  subid,
                                  json[id].axispoints[subid].options,
                                  "blureventtrue",
                                  e
                                )
                              }
                              onKeyPress={e =>
                                addnewoptiontodropdown(
                                  formid,
                                  version,
                                  id,
                                  subid,
                                  json[id].axispoints[subid].options,
                                  null,
                                  e
                                )
                              }
                            />
                          </div>
                        );
                      } else {
                        return (
                          <h5 key={subid}>
                            {json[id].axispoints[subid].label}
                            <button
                              onClick={() =>
                                deletesinglefieldtable(
                                  formid,
                                  version,
                                  id,
                                  subid
                                )
                              }
                              className="btn btn-danger d-block"
                            >
                              Delete
                            </button>
                          </h5>
                        );
                      }
                    })}
                </div>
              );
            }

            return (
              <div key={id} className="mt-2">
                <hr />
                <h5>{json[id].label}</h5>
                {select}
                {content}
                <hr />
              </div>
            );
          }
          return <span />;
        })}
    </div>
  );
};

export default RenderForm;
