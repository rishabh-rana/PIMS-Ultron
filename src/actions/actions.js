import { database } from "../config/firebase";
import { storage } from "../config/firebase";

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

export const startsubmitvaluetodb = (formid, version) => {
  return dispatch => {
    console.log("fired");
    var newpushkey = database
      .child("Submissions/" + formid + "/" + version + "/")
      .push().key;
    var updates = {};
    updates[
      "Submissions/" + formid + "/" + version + "/" + newpushkey + "/starttime"
    ] = Date.now();
    updates["Forms/" + formid + "/submissionid"] = newpushkey;
    updates["Data/" + newpushkey + "/latestupdate"] = Date.now();
    updates["Data/" + newpushkey + "/version"] = version;

    // updates ["Submissions/"+formid+"/"+version+"/"+newpushkey+"/worker"] = Date.now();
    database.update(updates);
  };
};

export const writedatatosubmissionid = (submitid, id, type, e) => {
  return dispatch => {
    if (type === "string" || type === "number") {
      if (e.key === "Enter") {
        var update = {};
        update["Data/" + submitid + "/data/" + id] = e.target.value;

        database.update(update);
      }
    } else if (type === "file") {
      var file = e.target.files[0];

      // var updates = {};
      // updates["Data/"+ submitid+ "/data/" + id] = file.name;
      // database.update(updates);

      storage
        .child("Data/" + submitid + "/data/" + id)
        .put(file)
        .then(function() {
          storage
            .child("Data/" + submitid + "/data/" + id)
            .getDownloadURL()
            .then(function(url) {
              var urlupdate = {};
              urlupdate["Data/" + submitid + "/data/" + id] = url;
              database.update(urlupdate);
            });
        });
    } else if (type === "checkbox") {
      var update = {};
      update["Data/" + submitid + "/data/" + id] = e.target.checked;
      database.update(update);
    } else if (type === "blurevent") {
      var update = {};
      update["Data/" + submitid + "/data/" + id] = e.target.value;

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

export const selectaxisoftable = (formid, id, version, e) => {
  return dispatch => {
    var update = {};
    update["Forms/" + formid + "/" + version + "/" + id + "/axis"] =
      e.target.value;
    database.update(update);
  };
};

export const addnewtableelement = (formid, version, id, type, valuetype, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      var newpushkey = database
        .child("Forms/" + formid + "/" + version + "/" + id + "/axispoints/")
        .push().key;
      var updates = {};
      updates[
        "Forms/" +
          formid +
          "/" +
          version +
          "/" +
          id +
          "/axispoints/" +
          newpushkey +
          "/label"
      ] = e.target.value;
      updates[
        "Forms/" +
          formid +
          "/" +
          version +
          "/" +
          id +
          "/axispoints/" +
          newpushkey +
          "/type"
      ] = type;

      updates[
        "Forms/" +
          formid +
          "/" +
          version +
          "/" +
          id +
          "/axispoints/" +
          newpushkey +
          "/valuetype"
      ] = valuetype;
      updates["Forms/" + formid + "/unpublishedchanges"] = true;
      database.update(updates);
      e.target.value = "";
    }
  };
};

export const writetabledatatosubmissionid = (
  submitid,
  tableid,
  id,
  type,
  e
) => {
  return dispatch => {
    if (type === "string" || type === "number") {
      if (e.key === "Enter") {
        var update = {};
        update["Data/" + submitid + "/data/" + tableid + "/data/" + id] =
          e.target.value;

        database.update(update);
      }
    } else if (type === "file") {
      var file = e.target.files[0];

      // var updates = {};
      // updates["Data/"+ submitid+ "/data/" + id] = file.name;
      // database.update(updates);

      storage
        .child("Data/" + submitid + "/data/" + tableid + "/data/" + id)
        .put(file)
        .then(function() {
          storage
            .child("Data/" + submitid + "/data/" + tableid + "/data/" + id)
            .getDownloadURL()
            .then(function(url) {
              var urlupdate = {};
              urlupdate[
                "Data/" + submitid + "/data/" + tableid + "/data/" + id
              ] = url;
              database.update(urlupdate);
            });
        });
    } else if (type === "checkbox") {
      var update = {};
      update["Data/" + submitid + "/data/" + tableid + "/data/" + id] =
        e.target.checked;
      database.update(update);
    } else if (type === "blurevent") {
      var update = {};
      update["Data/" + submitid + "/data/" + tableid + "/data/" + id] =
        e.target.value;

      database.update(update);
    }
  };
};

export const addoffsetaxis = (formid, version, tableid, valuetypes) => {
  return dispatch => {
    var update = {};
    var onepushkey = database
      .child(
        "Forms/" + formid + "/" + version + "/" + tableid + "/offsetaxispoints"
      )
      .push().key;
    var newpushkey;
    for (var valtype in valuetypes) {
      newpushkey = database
        .child(
          "Forms/" +
            formid +
            "/" +
            version +
            "/" +
            tableid +
            "/offsetaxispoints/" +
            onepushkey
        )
        .push().key;
      update[
        "Forms/" +
          formid +
          "/" +
          version +
          "/" +
          tableid +
          "/offsetaxispoints/" +
          onepushkey +
          "/" +
          newpushkey +
          "/type"
      ] = "singlefield";
      update[
        "Forms/" +
          formid +
          "/" +
          version +
          "/" +
          tableid +
          "/offsetaxispoints/" +
          onepushkey +
          "/" +
          newpushkey +
          "/valuetype"
      ] = valuetypes[valtype];
    }

    database.update(update);
  };
};
