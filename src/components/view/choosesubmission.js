import React from "react";

import loader from "../UI/loader/loader";

const Choosesubmisson = props => {
  if (props.submissionmeta === null) {
    return { loader };
  }

  var { submissionmeta, selectsubmissionviewmode } = props;
  submissionmeta = submissionmeta[props.formid];

  return (
    <div>
      <h1>Choose a Submission to view</h1>
      {submissionmeta &&
        Object.keys(submissionmeta)
          .reverse()
          .map(version => {
            return (
              <div key={version} className="jumbotron mt-2">
                <h3>Version: {version}</h3>
                {Object.keys(submissionmeta[version])
                  .reverse()
                  .map(id => {
                    return (
                      <div className="card-body" key={id}>
                        <div className="card-title">
                          <button
                            className="btn btn-dark"
                            onClick={() =>
                              selectsubmissionviewmode(id, version)
                            }
                          >
                            SubmissionId {id}
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
                          }).format(submissionmeta[version][id].starttime)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
    </div>
  );
};

export default Choosesubmisson;
