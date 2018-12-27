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
      <h5>Add Date field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "singlefield", "date", e)
        }
      />
      <h5>Add Time field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "singlefield", "time", e)
        }
      />
      <h5>Add Datetime field</h5>
      <input
        onKeyPress={e =>
          addnewelement(
            formid,
            version,
            fieldid,
            "singlefield",
            "datetime-local",
            e
          )
        }
      />
      <h5>Add Image field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "singlefield", "file", e)
        }
      />
      <h5>Add Dropdown field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, fieldid, "dropdown", "select", e)
        }
      />
    </div>
  );
};

export default Addnew;
