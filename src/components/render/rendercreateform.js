import React from "react";

import Addnew from "../create/addnewtableelement";

const RenderForm = props => {
  var { json, formid, version, selectaxisoftable, addnewtableelement } = props;

  return (
    <div>
      {json &&
        Object.keys(json).map(id => {
          if (json[id].type === "singlefield") {
            return (
              <div key={id} className="mt-2">
                <h5>{json[id].label}</h5>
                <input
                  type={json[id].valuetype}
                  disabled
                  placeholder={json[id].valuetype + " accepted"}
                />
              </div>
            );
          } else if (json[id].type === "table") {
            let select = (
              <select onChange={e => selectaxisoftable(formid, id, version, e)}>
                <option value="row">Row</option>
                <option
                  value="column"
                  selected={json[id].axis === "column" && "selected"}
                >
                  Column
                </option>
              </select>
            );
            let content;

            if (!json[id].hasOwnProperty("axis")) {
              //do something
            } else {
              content = (
                <div>
                  <div>{json[id].axis}</div>
                  <Addnew
                    formid={formid}
                    fieldid={id}
                    version={version}
                    axis={json[id].axis}
                    addnewelement={addnewtableelement}
                  />
                  {json[id].hasOwnProperty("axispoints") &&
                    Object.keys(json[id].axispoints).map(subid => {
                      return (
                        <h5 key={subid}>{json[id].axispoints[subid].label}</h5>
                      );
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
        })}
    </div>
  );
};

export default RenderForm;
