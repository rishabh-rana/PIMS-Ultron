import React from "react";

const Dropdown = props => {
  var { label, selectedoption, options, functionhandler, disabled } = props;

  return (
    <div className="mt-2">
      <h1>{label}</h1>
      <select
        defaultValue={selectedoption}
        key={selectedoption}
        onChange={functionhandler}
        disabled={disabled}
      >
        {options &&
          options.split("$").map(option => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
