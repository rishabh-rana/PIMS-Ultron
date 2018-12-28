import React from "react";

import loader from "../UI/loader/loader";

const Choosesubmisson = props => {
  if (props.submissionmeta === null) {
    return { loader };
  }

  var { submissionmeta, selectsubmissionviewmode } = props;
  // submissioneta = [formid, subid, timestamp, version]
  let submeta = [];
  for (var sub in submissionmeta) {
    if (submissionmeta[sub][0] === props.formid) {
      submeta.push(submissionmeta[sub]);
    }
  }

  return (
    <div>
      <h1>Choose a Submission to view</h1>
      {submeta.map(item => {
        return (
          <div className="card-body bg-dark mt-2" key={item[1]}>
            <div className="card-title">
              <button
                className="btn btn-dark"
                onClick={() => selectsubmissionviewmode(item[1], item[3])}
              >
                SubmissionId {item[1]}
              </button>
            </div>
            <div className="badge badge-primary">
              created:{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              }).format(item[2])}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Choosesubmisson;
