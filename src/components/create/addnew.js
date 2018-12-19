import React from "react";

const Addnew = props => {
  var { formid, addnewelement, version } = props;

  return (
    <div className="jumbotron">
      <h3>Add new component </h3>
      <h5>Add String field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "string", e)
        }
      />
      <h5>Add Number field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "number", e)
        }
      />
      <h5>Add Boolean field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "bool", e)
        }
      />
    </div>
  );
};

export default Addnew;
