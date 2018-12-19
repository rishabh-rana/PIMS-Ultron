import React from "react";

const RenderForm = props => {
  var { json } = props;

  return (
    <div>
      {json &&
        Object.keys(json).map(id => {
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
        })}
    </div>
  );
};

export default RenderForm;
