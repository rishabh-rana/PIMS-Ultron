import React from "react";

import Dropdown from "./renderdropdown";

const SingleField = props => {
  var { id, formvalues } = props;

  switch (props.json[id].valuetype) {
    case "file":
      if (props.disabled) {
        return (
          <div className="mt-2" key={id}>
            <h5>{props.json[id].label}</h5>
            <img
              src={formvalues && formvalues.data && formvalues.data[id]}
              key={formvalues && formvalues.data && formvalues.data[id] + id}
              alt="no selection"
              className="d-block mt-2"
              style={{ width: "100%" }}
            />
          </div>
        );
      } else if (!props.disabled) {
        return (
          <div key={id} className="mt-2 form-group pl-2 mb-0">
            <label htmlFor={id} style={{ display: "inline" }}>
              {props.json[id].label}
            </label>
            <input
              id={id}
              type={props.json[id].valuetype}
              disabled={props.disabled}
              onChange={props.functionhandler}
              className="form-control"
            />
            <img
              src={formvalues && formvalues.data && formvalues.data[id]}
              key={formvalues && formvalues.data && formvalues.data[id]}
              alt="no selection"
              className="d-block"
              style={{ width: "100%" }}
            />
          </div>
        );
      }
      break;

    case "checkbox":
      let bg =
        formvalues && formvalues.data && formvalues.data[id] ? "green" : "red";
      return (
        <div key={id} className="mt-2 form-group pl-2 mb-0">
          <label style={{ display: "inline" }}>{props.json[id].label}</label>
          <div
            style={{
              background: bg,
              width: "100%",
              margin: "0 auto",
              borderRadius: "0.25rem",
              border: "1px solid #ced4da",
              cursor: "pointer",
              opacity: "0.4"
            }}
          >
            <input
              type={props.json[id].valuetype}
              checked={formvalues && formvalues.data && formvalues.data[id]}
              disabled={props.disabled}
              onChange={props.functionhandler}
              style={{ width: "100%", minWidth: "30px", opacity: "0" }}
              placeholder={props.json[id].valuetype}
              className="form-control"
            />
          </div>
        </div>
      );

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
          functionhandler={props.reactselecthandler}
          disabled={props.disabled}
          style={{ width: "100%" }}
        />
      );

    case "empty":
      return <span key={id} className="mt-2" />;
      break;

    case "justtext":
      return (
        <h6 key={id} className="mt-2 align-bottom">
          {props.json[id].label}
        </h6>
      );

    default:
      return (
        <div key={id} className="mt-2 form-group pl-2 mb-0">
          <label style={{ display: "inline" }}>{props.json[id].label}</label>
          <input
            type={props.json[id].valuetype}
            defaultValue={formvalues && formvalues.data && formvalues.data[id]}
            disabled={props.disabled}
            onKeyPress={props.functionhandler}
            onBlur={props.blureventhandler}
            placeholder={props.json[id].valuetype}
            style={{ width: "100%" }}
            className="form-control"
          />
        </div>
      );
  }

  return <span />;
};

export default SingleField;
