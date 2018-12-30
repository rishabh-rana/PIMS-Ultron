import React from "react";

import SingleField from "./rendersinglefield";

const getaxispoints = json => {
  if (json.hasOwnProperty("axispoints")) {
    var el = ["S.No."];
    Object.keys(json.axispoints).map(id => {
      el.push(json.axispoints[id].label);
    });
    return el;
  }

  return null;
};

function transpose(matrix) {
  const rows = matrix.length,
    cols = matrix[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  return grid;
}

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

  // get the labels of independant fields
  var axispoints = getaxispoints(json);

  if (json.axis === "column") {
    var serialnumber = 0;
    return (
      <div className="row">
        <div className="col-12">
          <strong>{json.label}</strong>
        </div>
        <hr />

        <div className="col-12">
          <div style={{ display: "table", width: "100%" }}>
            <div style={{ display: "table-row" }}>
              {axispoints.map(label => {
                return (
                  <div style={{ display: "table-cell", textAlign: "center" }}>
                    <strong>{label}</strong>
                  </div>
                );
              })}
            </div>

            {json.hasOwnProperty("offsetaxispoints") &&
              Object.keys(json.offsetaxispoints).map(axisnumber => {
                serialnumber++;
                return (
                  <div key={axisnumber} style={{ display: "table-row" }}>
                    <div style={{ display: "table-cell", textAlign: "center" }}>
                      <strong>{serialnumber}</strong>
                    </div>

                    {Object.keys(json.offsetaxispoints[axisnumber]).map(id => {
                      let formvalhandler = null;
                      if (formvalues && formvalues.data) {
                        formvalhandler = formvalues.data[tableid];
                      }

                      return (
                        <div style={{ display: "table-cell" }} key={id}>
                          <div key={id} className="text-center">
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
        </div>
      </div>
    );
  } else if (json.axis === "row") {
    //we have axispoints array
    axispoints = axispoints.slice(1);
    var fields = [];
    var serialnumber = [];
    var serial = 0;
    var axiscounter = -1;
    if (json.hasOwnProperty("offsetaxispoints")) {
      Object.keys(json.offsetaxispoints).map(axisnumber => {
        serial++;
        serialnumber.push(serial);
        var helper = [];
        Object.keys(json.offsetaxispoints[axisnumber]).map(id => {
          helper.push(
            <div
              key={id}
              style={{ display: "table-cell", textAlign: "center" }}
            >
              <SingleField
                key={id}
                json={json.offsetaxispoints[axisnumber]}
                id={id}
                purejson={purejson}
                formvalues={
                  formvalues && formvalues.data && formvalues.data[tableid]
                }
                disabled={disabled}
                functionhandler={e =>
                  writetabledatatosubmissionid(
                    submissionid,
                    tableid,
                    id,
                    json.offsetaxispoints[axisnumber][id].valuetype,
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
          );
          return null;
        });
        fields.push(helper);
        return null;
        //nested map ends
      });
      //main map ends

      fields = transpose(fields);
    }

    //we have fields and serial number
    return (
      <div style={{ width: "100%" }}>
        <div style={{ display: "table", width: "100%", tableLayout: "fixed" }}>
          <div style={{ display: "table-row" }}>
            <div style={{ display: "table-cell", textAlign: "center" }}>
              <strong>S.No.</strong>
            </div>

            {serialnumber.map(num => {
              return (
                <div
                  key={num}
                  style={{ display: "table-cell", textAlign: "center" }}
                >
                  <strong>{num}</strong>
                </div>
              );
            })}
          </div>

          {fields.map(row => {
            axiscounter++;
            return (
              <div key={axiscounter} style={{ display: "table-row" }}>
                <div
                  style={{
                    display: "table-cell",
                    textAlign: "center",
                    fontSize: "10px"
                  }}
                >
                  <strong>{axispoints[axiscounter]}</strong>
                </div>

                {fields[axiscounter].map(f => {
                  return f;
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <span>Table</span>;
};

export default Table;
