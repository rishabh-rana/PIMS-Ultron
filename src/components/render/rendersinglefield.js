import React from "react";

import Dropdown from "./renderdropdown";

const SingleField = props => {
  var { id, formvalues } = props;

  switch (props.json[id].valuetype) {
    case "file":
      if (!props.disabled && !props.purejson.hasOwnProperty("submissionid")) {
        return (
          <div key={id} className="subtext mt-2">
            Fill out another entry to enter an image
          </div>
        );
      } else if (props.disabled) {
        return (
          <div className="mt-2" key={id}>
            <h5>{props.json[id].label}</h5>
            <img
              src={formvalues && formvalues.data && formvalues.data[id]}
              key={formvalues && formvalues.data && formvalues.data[id] + id}
              alt="no selection"
              className="d-block mt-2"
              style={{ width: "100px" }}
            />
          </div>
        );
      } else if (
        !props.disabled &&
        props.purejson.hasOwnProperty("submissionid")
      ) {
        return (
          <div key={id} className="mt-2">
            <h5>{props.json[id].label}</h5>
            <input
              type={props.json[id].valuetype}
              disabled={props.disabled}
              onChange={props.functionhandler}
            />
            <img
              src={formvalues && formvalues.data && formvalues.data[id]}
              key={formvalues && formvalues.data && formvalues.data[id]}
              alt="no selection"
              className="d-block"
              style={{ width: "100px" }}
            />
          </div>
        );
      }
      break;

    case "checkbox":
      return (
        <div key={id} className="mt-2">
          <h5>{props.json[id].label}</h5>
          <input
            type={props.json[id].valuetype}
            checked={formvalues && formvalues.data && formvalues.data[id]}
            disabled={props.disabled}
            onChange={props.functionhandler}
            placeholder={props.json[id].valuetype}
          />
        </div>
      );
      break;

    case "select":
      var ops;

      if (props.dropintableoptions) {
        ops = props.dropintableoptions;
      } else {
        ops = props.json[id].options;
      }
      return (
        <Dropdown
          key={id}
          label={props.json[id].label}
          selectedoption={formvalues && formvalues.data && formvalues.data[id]}
          options={ops}
          functionhandler={props.blureventhandler}
          disabled={props.disabled}
        />
      );
      break;

    default:
      return (
        <div key={id} className="mt-2">
          <h5>{props.json[id].label}</h5>
          <input
            type={props.json[id].valuetype}
            defaultValue={formvalues && formvalues.data && formvalues.data[id]}
            disabled={props.disabled}
            onKeyPress={props.functionhandler}
            onBlur={props.blureventhandler}
            placeholder={props.json[id].valuetype}
          />
        </div>
      );
      break;
  }

  return <span />;
};

export default SingleField;
