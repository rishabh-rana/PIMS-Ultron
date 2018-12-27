import React from "react";

const Addnew = props => {
  var { formid, fieldid, addnewelement, version, axis } = props;

  return (
    <div className="jumbotron">
      <h3>Add new {axis} </h3>
      <h5>Add String field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "singlefield", "string", e)
        }
      />
      <h5>Add Number field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "singlefield", "number", e)
        }
      />
      <h5>Add Boolean field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "singlefield", "checkbox", e)
        }
      />
      <h5>Add Image field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "singlefield", "file", e)
        }
      />
    </div>
  );
};

export default Addnew;
