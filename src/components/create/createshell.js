import React from "react";

import { connect } from "react-redux";
import * as actions from "../../actions/actions";

import CreateForm from "./createform";
import Currentforms from "./currentforms";
import FormBuilder from "./formbuilder";

const Mainshell = props => {
  let content = (
    <div>
      <CreateForm createnewform={props.createnewform} />

      <Currentforms
        syncforms={props.syncforms}
        forms={props.create.forms}
        selectform={props.selectformcreatemode}
        filter={false}
      />
    </div>
  );

  if (props.create.selectedform !== null) {
    content = (
      <FormBuilder
        json={props.create.forms[props.create.selectedform]}
        selectform={props.selectformcreatemode}
        formid={props.create.selectedform}
        addnewelement={props.addnewelement}
        publishchangestoform={props.publishchangestoform}
        selectaxisoftable={props.selectaxisoftable}
        addnewtableelement={props.addnewtableelement}
        addnewoptiontodropdown={props.addnewoptiontodropdown}
        deletesinglefield={props.deletesinglefield}
        deletesinglefieldtable={props.deletesinglefieldtable}
        addoffsetaxis={props.addoffsetaxis}
      />
    );
  }

  return (
    <div className="container">
      <h1>Create Mode</h1>
      <hr />
      {content}
    </div>
  );
};

const mapstate = state => {
  return {
    auth: state.auth,
    create: state.create
  };
};

export default connect(
  mapstate,
  actions
)(Mainshell);
