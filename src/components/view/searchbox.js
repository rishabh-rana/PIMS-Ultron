import React from "react";

const Searchbox = props => {
  return (
    <div className="jumbotron">
      <input
        onBlur={e => props.syncsubmetasearch(e, false)}
        type="datetime-local"
      />
      <button
        className="btn btn-warning ml-3"
        onClick={e => props.syncsubmetasearch(e, true)}
      >
        Clear Filter{" "}
      </button>
    </div>
  );
};

export default Searchbox;
