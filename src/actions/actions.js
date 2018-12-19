import { database } from "../config/firebase";

export const createnewform = e => {
  return dispatch => {
    if (e.key === "Enter") {
      var newpushkey = database.child("Forms").push().key;
      var updates = {};
      updates["Forms/" + newpushkey + "/title"] = e.target.value;
      updates["Forms/" + newpushkey + "/created"] = Date.now();
      updates["Forms/" + newpushkey + "/version"] = 1.0;
      updates["Forms/" + newpushkey + "/published"] = false;
      updates["Forms/" + newpushkey + "/unpublishedchanges"] = false;
      database.update(updates);
      e.target.value = "";
    }
  };
};

export const syncforms = () => {
  return dispatch => {
    database.child("Forms").on("value", snap => {
      dispatch({ type: "syncforms", payload: snap.val() });
    });
  };
};

export const selectformcreatemode = id => {
  return dispatch => {
    dispatch({ type: "selectformcreatemode", payload: id });
  };
};
export const selectformsubmitmode = id => {
  return dispatch => {
    dispatch({ type: "selectformsubmitmode", payload: id });
  };
};
export const selectformviewmode = id => {
  return dispatch => {
    dispatch({ type: "selectformviewmode", payload: id });
  };
};
export const selectsubmissionviewmode = (id, version) => {
  return dispatch => {
    dispatch({
      type: "selectsubmissionviewmode",
      payload: { id: id, version: version }
    });
  };
};

export const addnewelement = (formid, version, type, valuetype, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      var newpushkey = database
        .child("Forms/" + formid + "/" + version + "/")
        .push().key;
      var updates = {};
      updates["Forms/" + formid + "/" + version + "/" + newpushkey + "/label"] =
        e.target.value;
      updates[
        "Forms/" + formid + "/" + version + "/" + newpushkey + "/type"
      ] = type;
      updates["Forms/" + formid + "/unpublishedchanges"] = true;
      updates[
        "Forms/" + formid + "/" + version + "/" + newpushkey + "/valuetype"
      ] = valuetype;
      database.update(updates);
      e.target.value = "";
    }
  };
};

export const startsubmitvaluetodb = (formid, version, id, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      var newpushkey = database
        .child("Submissions/" + formid + "/" + version + "/")
        .push().key;
      var updates = {};
      updates[
        "Submissions/" +
          formid +
          "/" +
          version +
          "/" +
          newpushkey +
          "/starttime"
      ] = Date.now();
      updates["Forms/" + formid + "/submissionid"] = newpushkey;
      updates["Data/" + newpushkey + "/latestupdate"] = Date.now();
      updates["Data/" + newpushkey + "/version"] = version;
      updates["Data/" + newpushkey + "/data/" + id] = e.target.value;
      // updates ["Submissions/"+formid+"/"+version+"/"+newpushkey+"/worker"] = Date.now();
      database.update(updates);
    }
  };
};

export const writedatatosubmissionid = (submitid, fieldid, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      var update = {};
      update["Data/" + submitid + "/data/" + fieldid] = e.target.value;

      database.update(update);
    }
  };
};

export const getformdata = submitid => {
  return dispatch => {
    if (submitid !== null) {
      database.child("Data/" + submitid).off();
      database.child("Data/" + submitid).on("value", snap => {
        dispatch({ type: "submitformdatavaluesupdate", payload: snap.val() });
      });
    } else {
      database.child("Data").off();
      dispatch({ type: "submitformdatavaluesupdate", payload: null });
    }
  };
};

export const syncsubmissionmeta = () => {
  return dispatch => {
    database.child("Submissions").off();
    database.child("Submissions").on("value", snap => {
      dispatch({ type: "syncsubmissionmeta", payload: snap.val() });
    });
  };
};

export const publishchangestoform = (id, json) => {
  return dispatch => {
    var updates = {};
    var newversion = parseInt(json.version) + 1;

    updates["Forms/" + id + "/version"] = newversion;
    updates["Forms/" + id + "/published"] = true;
    updates["Forms/" + id + "/unpublishedchanges"] = false;
    updates["Forms/" + id + "/submissionid"] = null;
    updates["Forms/" + id + "/" + newversion] = json[json.version];
    database.update(updates);
  };
};

export const publishsubmission = formid => {
  return dispatch => {
    var updates = {};
    updates["Forms/" + formid + "/submissionid"] = null;
    database.update(updates);
    dispatch({ type: "selectformsubmitmode", payload: null });
  };
};
