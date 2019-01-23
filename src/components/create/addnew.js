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
      <h5>Add Empty Row field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "rowchange", "empty", e)
        }
      />
      <h5>Add Section</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "rowchange", "section", e)
        }
      />
      <h5>Add Text</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "justtext", e)
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
          addnewelement(formid, version, "singlefield", "checkbox", e)
        }
      />
      <h5>Add Date field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "date", e)
        }
      />
      <h5>Add Time field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "time", e)
        }
      />
      <h5>Add Datetime field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "datetime-local", e)
        }
      />
      <h5>Add Image field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "singlefield", "file", e)
        }
      />
      <h5>Add Dropdown field</h5>
      <input
        onKeyPress={e =>
          addnewelement(formid, version, "dropdown", "select", e)
        }
      />

      <h5>Add Table</h5>
      <input
        onKeyPress={e => addnewelement(formid, version, "table", "string", e)}
      />
    </div>
  );
};

export default Addnew;
