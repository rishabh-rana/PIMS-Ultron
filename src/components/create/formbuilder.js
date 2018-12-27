import React from "react";

import Addnew from "./addnew";
import RenderForm from "../render/rendercreateform";

const FormBuilder = props => {
  var {
    json,
    selectform,
    publishchangestoform,
    selectaxisoftable,
    addnewtableelement,
    addnewoptiontodropdown,
    deletesinglefield,
    deletesinglefieldtable
  } = props;

  //for addnew
  var { formid, addnewelement } = props;

  let backbutton = (
    <button className="btn btn-warning" onClick={() => selectform(null)}>
      back
    </button>
  );

  return (
    <div>
      <h1>
        {json.title} {backbutton}
      </h1>
      <Addnew
        addnewelement={addnewelement}
        formid={formid}
        version={json.version}
      />
      <div className="container mt-2 bg-light">
        <RenderForm
          json={json[json.version]}
          version={json.version}
          formid={formid}
          selectaxisoftable={selectaxisoftable}
          addnewtableelement={addnewtableelement}
          addnewoptiontodropdown={addnewoptiontodropdown}
          deletesinglefield={deletesinglefield}
          deletesinglefieldtable={deletesinglefieldtable}
        />
      </div>
      <button
        className="btn btn-warning mt-3 mb-3 abs-center-x"
        onClick={() => publishchangestoform(formid, json)}
        disabled={!json.unpublishedchanges}
      >
        Publish {json.submissionid && "(Form submission in progress)"}
      </button>
    </div>
  );
};

export default FormBuilder;
