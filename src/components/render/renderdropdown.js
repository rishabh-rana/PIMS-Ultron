import React from "react";
import Select from "react-select";

const Dropdown = props => {
  var { label, selectedoption, options, functionhandler, disabled } = props;

  var selectoptions = options.split("$").map(op => {
    return { label: op, value: op };
  });

  return (
    <div className="mt-2 form-group pl-2">
      <label style={{ display: "inline" }}>{label}</label>
      <Select
        defaultValue={selectedoption}
        key={selectedoption}
        onChange={functionhandler}
        isDisabled={disabled}
        isSearchable
        options={selectoptions}
      />
    </div>
  );
};

export default Dropdown;
