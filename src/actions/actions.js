import { database } from "../config/firebase";
import { storage } from "../config/firebase";
import { firestore } from "../config/firebase";
import { auth } from "../config/firebase";

//ErrorHandler
export const seterrordisplay = (message, color, duration) => {
  return dispatch => {
    var error;
    if (message !== null) {
      error = {
        message: message,
        color: color || null,
        duration: duration || null
      };
    } else {
      error = null;
    }

    dispatch({
      type: "seterrordisplay",
      payload: error
    });
  };
};

//Auth
export const signinuser = e => {
  return dispatch => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(e.target[0].value, e.target[1].value)
      .catch(function(error) {
        dispatch({
          type: "seterrordisplay",
          payload: { message: "Incorrect Email or Password", color: "red" }
        });
      });
  };
};

export const signupuser = e => {
  return dispatch => {
    e.preventDefault();
    if (e.target[0].value === "supersecret") {
      auth
        .createUserWithEmailAndPassword(e.target[1].value, e.target[2].value)
        .catch(function(error) {
          dispatch({
            type: "seterrordisplay",
            payload: { message: "Cannot Signup", color: "red" }
          });
        });
    } else {
      dispatch({
        type: "seterrordisplay",
        payload: { message: "Wrong project key", color: "red" }
      });
    }
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
  };
};
export const signoutuser = () => {
  return dispatch => {
    auth.signOut();
  };
};
export const updateusername = e => {
  return dispatch => {
    auth.currentUser.updateProfile({
      displayName: e.target.value
    });
  };
};
export const sendresetpasswordemail = () => {
  return dispatch => {
    auth.sendPasswordResetEmail(auth.currentUser.email);
  };
};

//sync
export const syncusers = () => {
  return dispatch => {
    auth.onAuthStateChanged(function(user) {
      console.log(user);
      if (user) {
        let usersmall = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        };
        dispatch({ type: "syncusers", payload: usersmall });
      } else {
        console.log("null");
        dispatch({ type: "syncusers", payload: null });
      }
    });
  };
};
export const syncforms = () => {
  return dispatch => {
    database.child("Forms").on(
      "value",
      snap => {
        dispatch({ type: "syncforms", payload: snap.val() });
      },
      e => {
        if (e) {
          console.log(e);
        }
      }
    );
  };
};
export const syncformscache = form => {
  return dispatch => {
    dispatch({ type: "syncforms", payload: form.Forms });
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
    //firestore

    firestore
      .collection("Submissions")
      .where("time", ">", Date.now() - 172800000)
      .orderBy("time", "desc")
      .onSnapshot(
        snap => {
          var submeta = [];
          snap.forEach(doc => {
            var data = doc.data();
            submeta.push([
              data.f,
              doc._key.path.segments[doc._key.path.segments.length - 1],
              data.time,
              data.v
            ]);
          });

          dispatch({ type: "syncsubmissionmeta", payload: submeta });
        },
        e => {
          if (e) {
            console.log(e);
          }
        }
      );
  };
};
export const synccurrentsubids = () => {
  return dispatch => {
    firestore.collection("Current").onSnapshot(
      snap => {
        var submeta = {};
        snap.forEach(doc => {
          submeta[
            doc._key.path.segments[doc._key.path.segments.length - 1]
          ] = doc.data().id;
        });
        console.log(submeta);
        dispatch({ type: "synccurrentsubids", payload: submeta });
      },
      e => {
        if (e) {
          console.log(e);
        }
      }
    );
  };
};
export const startsubmitvaluetodb = (formid, version) => {
  return async dispatch => {
    var docref = await firestore.collection("Submissions").add({
      time: Date.now(),
      f: formid,
      v: version
    });
    firestore
      .collection("Current")
      .doc(formid)
      .set({ id: docref.id });
    var updates = {};
    // updates["Forms/" + formid + "/submissionid"] = docref.id;
    updates["Data/" + docref.id + "/latestupdate"] = Date.now();
    updates["Data/" + docref.id + "/version"] = version.toString();
    database.update(updates);
  };
};

//selection
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

// create new form
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
export const deleteform = id => {
  return dispatch => {
    database.child("Forms/" + id).set(null);
  };
};

//add element to form
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

      if (type === "table") {
        updates[
          "Forms/" + formid + "/" + version + "/" + newpushkey + "/axis"
        ] = "row";
      }

      database.update(updates);
      e.target.value = "";
    }
  };
};

//delete element from formi
export const deletesinglefield = (formid, version, id) => {
  return dispatch => {
    database.child("Forms/" + formid + "/" + version + "/" + id).set(null);
    var updates = {};
    updates["Forms/" + formid + "/unpublishedchanges"] = true;
    database.update(updates);
  };
};
export const deletesinglefieldtable = (formid, version, tableid, id) => {
  return dispatch => {
    database
      .child(
        "Forms/" + formid + "/" + version + "/" + tableid + "/axispoints/" + id
      )
      .set(null);
    var updates = {};
    updates["Forms/" + formid + "/unpublishedchanges"] = true;
    database.update(updates);
  };
};

//write to db
export const writedatatosubmissionid = (submitid, id, type, e) => {
  return dispatch => {
    if (type === "string" || type === "number") {
      if (e.key === "Enter") {
        var update = {};
        update["Data/" + submitid + "/data/" + id] = e.target.value;
        database.update(update);
      }
    } else if (type === "dropdown") {
      var update9 = {};
      update9["Data/" + submitid + "/data/" + id] = e;
      database.update(update9);
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
      var update2 = {};
      update2["Data/" + submitid + "/data/" + id] = e.target.checked;
      database.update(update2);
    } else if (type === "blurevent") {
      var update3 = {};
      update3["Data/" + submitid + "/data/" + id] = e.target.value;

      database.update(update3);
    }
  };
};

//publish changes
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
    firestore
      .collection("Current")
      .doc(formid)
      .set({ id: null });
    // var updates = {};
    // updates["Forms/" + formid + "/submissionid"] = null;
    // database.update(updates);
    dispatch({ type: "selectformsubmitmode", payload: null });
  };
};

//table ops
export const selectaxisoftable = (formid, id, version, e) => {
  return dispatch => {
    var update = {};
    update["Forms/" + formid + "/" + version + "/" + id + "/axis"] =
      e.target.value;
    update["Forms/" + formid + "/unpublishedchanges"] = true;
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
    } else if (type === "dropdown") {
      var update9 = {};
      update9["Data/" + submitid + "/data/" + tableid + "/data/" + id] = e;

      database.update(update9);
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
      var update2 = {};
      update2["Data/" + submitid + "/data/" + tableid + "/data/" + id] =
        e.target.checked;
      database.update(update2);
    } else if (type === "blurevent") {
      var update3 = {};
      update3["Data/" + submitid + "/data/" + tableid + "/data/" + id] =
        e.target.value;

      database.update(update3);
    }
  };
};
export const addoffsetaxis = (formid, version, tableid, valuetypes, e) => {
  return dispatch => {
    if (e.key === "Enter") {
      var update = {};
      var onepushkey = database
        .child(
          "Forms/" +
            formid +
            "/" +
            version +
            "/" +
            tableid +
            "/offsetaxispoints"
        )
        .push().key;
      var newpushkey;
      update[
        "Forms/" +
          formid +
          "/" +
          version +
          "/" +
          tableid +
          "/offsetaxispoints/" +
          onepushkey +
          "/label"
      ] = e.target.value;
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
        ] = valuetypes[valtype].val;

        if (valuetypes[valtype].hasOwnProperty("options")) {
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
              "/options"
          ] = valuetypes[valtype].options;
        }
      }

      database.update(update);
    }
  };
};

//dropdown ops
export const addnewoptiontodropdown = (
  formid,
  version,
  tableid,
  id,
  options,
  blurevent,
  e
) => {
  return dispatch => {
    if (e.key === "Enter") {
      var update = {};
      if (options) {
        options += "$";
        options += e.target.value.trim();
      } else {
        options = "";
        options += e.target.value.trim();
      }

      e.target.value = "";

      update["Forms/" + formid + "/unpublishedchanges"] = true;
      if (tableid === null) {
        update[
          "Forms/" + formid + "/" + version + "/" + id + "/options"
        ] = options;
      } else {
        update[
          "Forms/" +
            formid +
            "/" +
            version +
            "/" +
            tableid +
            "/axispoints/" +
            id +
            "/options"
        ] = options;
      }
      database.update(update);
    }
  };
};

//searchbox
export const syncsubmetasearch = (e, clear) => {
  return dispatch => {
    var query = new Date(e.target.value).valueOf();
    console.log(query);
    if (query && !clear) {
      var submeta = [];
      firestore.collection("Submissions").onSnapshot(function() {});
      firestore
        .collection("Submissions")
        .where("time", ">", query - 3600000)
        .where("time", "<", query + 3600000)
        .orderBy("time", "desc")
        .onSnapshot(snap => {
          snap.forEach(doc => {
            var data = doc.data();
            submeta.push([
              data.f,
              doc._key.path.segments[doc._key.path.segments.length - 1],
              data.time,
              data.v
            ]);
          });
          console.log(submeta);
          dispatch({ type: "syncsubmissionmeta", payload: submeta });
        });
    } else if (clear) {
      var submeta2 = [];
      firestore.collection("Submissions").onSnapshot(function() {});
      firestore
        .collection("Submissions")
        .where("time", ">", Date.now() - 172800000)
        .orderBy("time", "desc")
        .onSnapshot(snap => {
          snap.forEach(doc => {
            var data = doc.data();
            submeta2.push([
              data.f,
              doc._key.path.segments[doc._key.path.segments.length - 1],
              data.time,
              data.v
            ]);
          });
          console.log(submeta2);
          dispatch({ type: "syncsubmissionmeta", payload: submeta2 });
        });
    }
  };
};
